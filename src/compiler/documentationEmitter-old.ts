//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='typescript.ts' />

module TypeScript {
    export class DocFileWriter {
        public onNewLine = true;
        constructor(private docFile: ITextWriter) {
        }

        public Write(s: string) {
            this.docFile.Write(s);
            this.onNewLine = false;
        }

        public WriteLine(s: string) {
            this.docFile.WriteLine(s);
            this.onNewLine = true;
        }

        public Close() {
            this.docFile.Close();
        }
    }

    export class DocumentationEmitter implements AstWalkerWithDetailCallback.AstWalkerDetailCallback {
        public docFile: DocFileWriter = null;
        private indenter = new Indenter();
        private documentationContainerStack: AST[] = [];
        private isDottedModuleName: bool[] = [];
        private dottedModuleEmit: string;
        private ignoreCallbackAst: AST = null;
        private singleDocFile: DocFileWriter = null;
        private varListCount: number = 0;
        private aContext = [];
        private oDocumentation = {
            modules: {},
            classes: {},
            variables: {},
            functions: {}
        };

        private getCurrentContext() {
            var oCurrent = this.oDocumentation;

            for(var i = 0; i < this.aContext.length; i++) {
                var oContext = this.aContext[i];

                oCurrent = oCurrent[oContext.type][oContext.name];
            }

            return oCurrent;
        }

        public getAstDocumentationContainer() {
            return this.documentationContainerStack[this.documentationContainerStack.length - 1];
        }

        private emitDottedModuleName() {
            return (this.isDottedModuleName.length === 0) ? false : this.isDottedModuleName[this.isDottedModuleName.length - 1];
        }

        constructor (public checker: TypeChecker, public emitOptions: EmitOptions, public errorReporter: ErrorReporter) {
        }

        public setDocumentationFile(file: ITextWriter) {
            this.docFile = new DocFileWriter(file);
        }

        public Close() {
            try {
                // Closing files could result in exceptions, report them if they occur
                this.docFile.Write(JSON.stringify(this.oDocumentation, null, 4));
                this.docFile.Close();
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        }

        public emitDocumentation(script: TypeScript.Script): void {
            AstWalkerWithDetailCallback.walk(script, this);
        }

        private getIndentString(docIndent? = false) {
            if (this.emitOptions.compilationSettings.minWhitespace) {
                return "";
            }
            else {
                return this.indenter.getIndent();
            }
        }

        private emitIndent() {
            this.docFile.Write(this.getIndentString());
        }

        private canEmitSignature(docFlags: DocFlags, canEmitGlobalAmbientDoc?: bool = true, useDocumentationContainerTop?: bool = true) {
            var container: AST;
            if (useDocumentationContainerTop) {
                container = this.getAstDocumentationContainer();
            } else {
                container = this.documentationContainerStack[this.documentationContainerStack.length - 2];
            }

            if (container.nodeType === NodeType.ModuleDeclaration && !hasFlag(docFlags, DocFlags.Exported)) {
                return false;
            }

            if (!canEmitGlobalAmbientDoc && container.nodeType === NodeType.Script && hasFlag(docFlags, DocFlags.Ambient)) {
                return false;
            }

            return true;
        }

        private canEmitPrePostAstSignature(docFlags: DocFlags, astWithPrePostCallback: AST, preCallback: bool) {
            if (this.ignoreCallbackAst) {
                CompilerDiagnostics.assert(this.ignoreCallbackAst != astWithPrePostCallback, "Ignore Callback AST mismatch");
                this.ignoreCallbackAst = null;
                return false;
            } else if (preCallback &&
                !this.canEmitSignature(docFlags, true, preCallback)) {
                this.ignoreCallbackAst = astWithPrePostCallback;
                return false;
            }

            return true;
        }

        private getDocFlagsString(docFlags: DocFlags, typeString: string) {
            var result = this.getIndentString();

            // Emit export only for global export statements. The container for this would be dynamic module which is whole file
            var container = this.getAstDocumentationContainer();
            if (container.nodeType === NodeType.ModuleDeclaration &&
                hasFlag((<ModuleDeclaration>container).modFlags, ModuleFlags.IsWholeFile) &&
                hasFlag(docFlags, DocFlags.Exported)) {
                result += "export ";
            }

            // Static/public/private/global docare
            if (hasFlag(docFlags, DocFlags.LocalStatic) || hasFlag(docFlags, DocFlags.Static)) {
                if (hasFlag(docFlags, DocFlags.Private)) {
                    result += "private ";
                }
                result += "static ";
            }
            else {
                if (hasFlag(docFlags, DocFlags.Private)) {
                    result += "private ";
                }
                else if (hasFlag(docFlags, DocFlags.Public)) {
                    result += "public ";
                }
                else {
                    result += typeString + " ";
                }
            }

            return result;
        }

        private emitDocFlags(docFlags: DocFlags, typeString: string) {
            this.docFile.Write(this.getDocFlagsString(docFlags, typeString));
        }

        private canEmitTypeAnnotationSignature(docFlag: DocFlags = DocFlags.None) {
            // Private Declaration, shouldnt emit type any time.
            return !hasFlag(docFlag, DocFlags.Private);
        }

        private pushDocumentationContainer(ast: AST) {
            this.documentationContainerStack.push(ast);
        }

        private popDocumentationContainer(ast: AST) {
            CompilerDiagnostics.assert(ast != this.getAstDocumentationContainer(), 'Documentation container mismatch');
            this.documentationContainerStack.pop();
        }

        public emitTypeNamesMember(memberName: MemberName, emitIndent? : bool = false) {
            if (memberName.prefix === "{ ") {
                if (emitIndent) {
                    this.emitIndent();
                }
                this.docFile.WriteLine("{");
                this.indenter.increaseIndent();
                emitIndent = true;
            } else if (memberName.prefix != "") {
                if (emitIndent) {
                    this.emitIndent();
                }
                this.docFile.Write(memberName.prefix);
                emitIndent = false;
            }

            if (memberName.isString()) {
                if (emitIndent) {
                    this.emitIndent();
                }
                this.docFile.Write((<MemberNameString>memberName).text);
            } else {
                var ar = <MemberNameArray>memberName;
                for (var index = 0; index < ar.entries.length; index++) {
                    this.emitTypeNamesMember(ar.entries[index], emitIndent);
                    if (ar.delim === "; ") {
                        this.docFile.WriteLine(";");
                    }
                }
            }

            if (memberName.suffix === "}") {
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.docFile.Write(memberName.suffix);
            } else {
                this.docFile.Write(memberName.suffix);
            }
        }

        private emitTypeSignature(type: Type) {
            var containingScope: SymbolScope = null;
            var documentationContainerAst = this.getAstDocumentationContainer();
            switch (documentationContainerAst.nodeType) {
                case NodeType.ModuleDeclaration:
                case NodeType.InterfaceDeclaration:
                case NodeType.FuncDecl:
                    if (documentationContainerAst.type) {
                        containingScope = documentationContainerAst.type.containedScope;
                    }
                    break;

                case NodeType.Script:
                    var script = <Script>documentationContainerAst;
                    if (script.bod) {
                        containingScope = script.bod.enclosingScope;
                    }
                    break;

                case NodeType.ClassDeclaration:
                    if (documentationContainerAst.type) {
                        containingScope = documentationContainerAst.type.instanceType.containedScope;
                    }
                    break;

                default:
                    CompilerDiagnostics.debugPrint("Unknown containing scope");
            }

            var typeNameMembers = type.getScopedTypeNameEx(containingScope);
            this.emitTypeNamesMember(typeNameMembers);
        }

        private emitComment(comment: Comment) {
            var text = comment.getText();
            if (this.docFile.onNewLine) {
                this.emitIndent();
            } else if (!comment.isBlockComment) {
                this.docFile.WriteLine("");
                this.emitIndent();
            }
            
            this.docFile.Write(text[0]);

            for (var i = 1; i < text.length; i++) {
                this.docFile.WriteLine("");
                this.emitIndent();
                this.docFile.Write(text[i]);
            }

            if (comment.endsLine || !comment.isBlockComment) {
                this.docFile.WriteLine("");
            } else {
                this.docFile.Write(" ");
            }
        }

        private emitDocumentationComments(ast: AST, endLine?: bool);
        private emitDocumentationComments(symbol: Symbol, endLine?: bool);
        private emitDocumentationComments(astOrSymbol, endLine = true) {
            if (!this.emitOptions.compilationSettings.emitComments) {
                return;
            }

            var docComments = <Comment[]>astOrSymbol.getDocComments();
            this.writeDocumentationComments(docComments, endLine);
        }

        public writeDocumentationComments(docComments: Comment[], endLine = true) {
            if (docComments.length > 0) {
                for (var i = 0; i < docComments.length; i++) {
                    this.emitComment(docComments[i]);
                }

                if (endLine) {
                    if (!this.docFile.onNewLine) {
                        this.docFile.WriteLine("");
                    }
                } else {
                    if (this.docFile.onNewLine) {
                        this.emitIndent();
                    }
                }
            }
        }

        public emitTypeOfBoundDecl(boundDecl: BoundDecl) {
            var type: Type = null;
            if (boundDecl.typeExpr && boundDecl.typeExpr.type) {
                type = boundDecl.typeExpr.type;
            }
            else if (boundDecl.sym) {
                type = (<FieldSymbol>boundDecl.sym).getType();
                // Dont emit inferred any
                if (type === this.checker.anyType) {
                    type = null;
                }
            }

            if (type) {
                this.docFile.Write(": ");
                this.emitTypeSignature(type);
            }
        }

        public VarDeclCallback(pre: bool, varDecl: VarDecl): bool {
            if (pre && this.canEmitSignature(ToDocFlags(varDecl.varFlags), false)) {
                var interfaceMember = (this.getAstDocumentationContainer().nodeType === NodeType.InterfaceDeclaration);
                this.emitDocumentationComments(varDecl);
                if (!interfaceMember) {
                    // If it is var list of form var a, b, c = emit it only if count > 0 - which will be when emitting first var
                    // If it is var list of form  var a = varList count will be 0
                    if (this.varListCount >= 0) {
                        this.emitDocFlags(ToDocFlags(varDecl.varFlags), "var");
                        this.varListCount = -this.varListCount;
                    }
                    this.docFile.Write(varDecl.id.text);
                } else {
                    this.emitIndent();
                    this.docFile.Write(varDecl.id.text);
                    if (hasFlag(varDecl.id.flags, ASTFlags.OptionalName)) {
                        this.docFile.Write("?");
                    }
                }

                if (this.canEmitTypeAnnotationSignature(ToDocFlags(varDecl.varFlags))) {
                    this.emitTypeOfBoundDecl(varDecl);
                }
               
                // emitted one var doc
                if (this.varListCount > 0) { this.varListCount--; } else if (this.varListCount < 0) { this.varListCount++; }

                // Write ; or ,
                if (this.varListCount < 0) {
                    this.docFile.Write(", ");
                } else {
                    this.docFile.WriteLine(";");
                }
                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.variables = oCurrentContext.variables || {};
                if(!oCurrentContext.variables[varDecl.id.text]) {
                    oCurrentContext.variables[varDecl.id.text] = {};
                }
            }
            return false;
        }

        public BlockCallback(pre: bool, block: Block): bool {
            if (!block.isStatementBlock) {
                if (pre) {
                    this.varListCount = block.statements.members.length;
                } else {
                    this.varListCount = 0;
                }
                return true;
            }
            return false;
        }

        private emitArgDecl(argDecl: ArgDecl, funcDecl: FuncDecl) {
            this.emitDocumentationComments(argDecl, false);
            this.docFile.Write(argDecl.id.text);
            if (argDecl.isOptionalArg()) {
                this.docFile.Write("?");
            }
            if (this.canEmitTypeAnnotationSignature(ToDocFlags(funcDecl.fncFlags))) {
                this.emitTypeOfBoundDecl(argDecl);
            }
        }

        public isOverloadedConstructorSignature(funcDecl: FuncDecl) {
            if (funcDecl.isConstructor && funcDecl.type.construct && funcDecl.type.construct.signatures.length > 1) {
                return true;
            }

            return false;
        }

        public isOverloadedCallSignature(funcDecl: FuncDecl) {
            if (!funcDecl.isConstructor && funcDecl.type.call && funcDecl.type.call.signatures.length > 1) {
                return true;
            }

            return false;
        }

        public getFirstCallOverloadFuncDecl(funcDecl: FuncDecl) {
            var signatures = funcDecl.type.call.signatures;
            var firstSignature = signatures[0].declAST;
            if (firstSignature.bod) {
                // Its a implementation, use next one
                firstSignature = signatures[1].declAST;
            }

            return firstSignature;
        }

        public emitReturnTypeOfFuncDecl(funcDecl: FuncDecl) {
            if (funcDecl.returnTypeAnnotation || funcDecl.signature.returnType.type != this.checker.anyType) {
                this.docFile.Write(": ");
                this.emitTypeSignature(funcDecl.signature.returnType.type);
            }
        }

        public FuncDeclCallback(pre: bool, funcDecl: FuncDecl): bool {
            if (!pre) {
                return false;
            }

            if (funcDecl.isAccessor()) {
                return this.emitPropertyAccessorSignature(funcDecl);
            }

            var isInterfaceMember = (this.getAstDocumentationContainer().nodeType === NodeType.InterfaceDeclaration);
            if (funcDecl.bod) {
                if (this.isOverloadedConstructorSignature(funcDecl)) {
                    return false;
                }
                else if (this.isOverloadedCallSignature(funcDecl)) {
                    // This means its implementation of overload signature. do not emit
                    return false;
                }
            } else if (!isInterfaceMember && hasFlag(funcDecl.fncFlags, FncFlags.Private) && this.isOverloadedCallSignature(funcDecl)) {
                // Print only first overload of private function
                var firstSignature = this.getFirstCallOverloadFuncDecl(funcDecl);
                if (firstSignature != funcDecl) {
                    return false;
                }
            }

            if (!this.canEmitSignature(ToDocFlags(funcDecl.fncFlags), false)) {
                return false;
            }

            this.emitDocumentationComments(funcDecl);
            if (funcDecl.isConstructor) {
                this.emitIndent();
                this.docFile.Write("constructor");
            }
            else {
                var id = funcDecl.getNameText();

                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.functions = oCurrentContext.functions || {};
                if(!oCurrentContext.functions[id]) {
                    oCurrentContext.functions[id] = {};
                }


                if (!isInterfaceMember) {
                    this.emitDocFlags(ToDocFlags(funcDecl.fncFlags), "function");
                    if (id != "__missing" || !funcDecl.name || !funcDecl.name.isMissing()) {
                        this.docFile.Write(id);
                    } else if (funcDecl.isConstructMember()) {
                        this.docFile.Write("new");
                    }
                } else {
                    this.emitIndent();
                    if (funcDecl.isConstructMember()) {
                        this.docFile.Write("new");
                    } else if (!funcDecl.isCallMember() && !funcDecl.isIndexerMember()) {
                        this.docFile.Write(id);
                        if (hasFlag(funcDecl.name.flags, ASTFlags.OptionalName)) {
                            this.docFile.Write("? ");
                        }
                    }
                }
            }

            if (!funcDecl.isIndexerMember()) {
                this.docFile.Write("(");
            } else {
                this.docFile.Write("[");
            }

            this.indenter.increaseIndent();

            if (funcDecl.arguments) {
                var argsLen = funcDecl.arguments.members.length;
                if (funcDecl.variableArgList) {
                    argsLen--;
                }
                for (var i = 0; i < argsLen; i++) {
                    var argDecl = <ArgDecl>funcDecl.arguments.members[i];
                    this.emitArgDecl(argDecl, funcDecl);
                    if (i < (argsLen - 1)) {
                        this.docFile.Write(", ");
                    }
                }
            }

            if (funcDecl.variableArgList) {
                var lastArg = <ArgDecl>funcDecl.arguments.members[funcDecl.arguments.members.length - 1];
                if (funcDecl.arguments.members.length > 1) {
                    this.docFile.Write(", ...");
                }
                else {
                    this.docFile.Write("...");
                }
                this.emitArgDecl(lastArg, funcDecl);
            }

            this.indenter.decreaseIndent();

            if (!funcDecl.isIndexerMember()) {
                this.docFile.Write(")");
            } else {
                this.docFile.Write("]");
            }

            if (!funcDecl.isConstructor &&
                this.canEmitTypeAnnotationSignature(ToDocFlags(funcDecl.fncFlags))) {
                this.emitReturnTypeOfFuncDecl(funcDecl); 
            }

            this.docFile.WriteLine(";");

            return false;
        }

        public emitBaseExpression(bases: ASTList, index: number, useExtendsList: bool) {
            var baseExpr = bases.members[index];
            var baseSymbol = baseExpr.type.symbol;
            var baseType = baseExpr.type;
            this.emitTypeSignature(baseType);
        }

        private emitBaseList(typeDecl: TypeDeclaration, useExtendsList: bool) {
            var bases = useExtendsList ? typeDecl.extendsList : typeDecl.implementsList;
            if (bases && (bases.members.length > 0)) {
                var qual = useExtendsList ? "extends" : "implements";
                this.docFile.Write(" " + qual + " ");
                var basesLen = bases.members.length;
                for (var i = 0; i < basesLen; i++) {
                    if (i > 0) {
                        this.docFile.Write(", ");
                    }
                    this.emitBaseExpression(bases, i, useExtendsList);
                }
            }
        }

        public hasGetterAndIsNotGetter(funcDecl: FuncDecl) {
            var accessorSymbol = <FieldSymbol>funcDecl.accessorSymbol;
            if (accessorSymbol.getter && accessorSymbol.getter.declAST != funcDecl) {
                return true;
            }

            return false;
        }

        public emitAccessorDocumentationComments(funcDecl: FuncDecl) {
            var accessorSymbol = <FieldSymbol>funcDecl.accessorSymbol;
            this.emitDocumentationComments(accessorSymbol);
        }

        public emitPropertyTypeOfProperty(funcDecl: FuncDecl) {
            var accessorSymbol = <FieldSymbol>funcDecl.accessorSymbol;
            var propertyType = accessorSymbol.getType();
            this.emitTypeSignature(propertyType);
        }
        
        public emitPropertyAccessorSignature(funcDecl: FuncDecl) {
            if (this.hasGetterAndIsNotGetter(funcDecl)) {
                // Setter is being used to emit the type info. 
                return false;
            }

            this.emitAccessorDocumentationComments(funcDecl);
            this.emitDocFlags(ToDocFlags(funcDecl.fncFlags), "var");
            this.docFile.Write(funcDecl.name.text);
            if (this.canEmitTypeAnnotationSignature(ToDocFlags(funcDecl.fncFlags))) {
                this.docFile.Write(" : ");
                this.emitPropertyTypeOfProperty(funcDecl);
            }
            this.docFile.WriteLine(";");

            return false;
        }

        private emitClassMembersFromConstructorDefinition(funcDecl: FuncDecl) {
            if (funcDecl.arguments) {
                var argsLen = funcDecl.arguments.members.length; if (funcDecl.variableArgList) { argsLen--; }

                for (var i = 0; i < argsLen; i++) {
                    var argDecl = <ArgDecl>funcDecl.arguments.members[i];
                    if (hasFlag(argDecl.varFlags, VarFlags.Property)) {
                        this.emitDocumentationComments(argDecl);
                        this.emitDocFlags(ToDocFlags(argDecl.varFlags), "var");
                        this.docFile.Write(argDecl.id.text);

                        if (this.canEmitTypeAnnotationSignature(ToDocFlags(argDecl.varFlags))) {
                            this.emitTypeOfBoundDecl(argDecl);
                        }
                        this.docFile.WriteLine(";");

                        
                    }
                }
            }
        }

        public ClassDeclarationCallback(pre: bool, classDecl: ClassDeclaration): bool {
            if (!this.canEmitPrePostAstSignature(ToDocFlags(classDecl.varFlags), classDecl, pre)) {
                return false;
            }

            if (pre) {
                var className = classDecl.name.text;

                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.classes = oCurrentContext.classes || {};
                if(!oCurrentContext.classes[className]) {
                    oCurrentContext.classes[className] = {};
                }

                this.aContext.push({
                    type: "classes",
                    name: className
                });

                this.emitDocumentationComments(classDecl);
                this.emitDocFlags(ToDocFlags(classDecl.varFlags), "class");
                this.docFile.Write(className);
                this.pushDocumentationContainer(classDecl);
                this.emitBaseList(classDecl, true);
                this.emitBaseList(classDecl, false);
                this.docFile.WriteLine(" {");

                this.indenter.increaseIndent();
                if (classDecl.constructorDecl) {
                    this.emitClassMembersFromConstructorDefinition(classDecl.constructorDecl);
                }
            } else {
                this.aContext.pop();
                this.indenter.decreaseIndent();
                this.popDocumentationContainer(classDecl);

                this.emitIndent();
                this.docFile.WriteLine("}");
            }

            return true;
        }

        public InterfaceDeclarationCallback(pre: bool, interfaceDecl: InterfaceDeclaration): bool {
            if (!this.canEmitPrePostAstSignature(ToDocFlags(interfaceDecl.varFlags), interfaceDecl, pre)) {
                return false;
            }

            if (pre) {
                var interfaceName = interfaceDecl.name.text;
                this.emitDocumentationComments(interfaceDecl);
                this.emitDocFlags(ToDocFlags(interfaceDecl.varFlags), "interface");
                this.docFile.Write(interfaceName);
                this.pushDocumentationContainer(interfaceDecl);
                this.emitBaseList(interfaceDecl, true);
                this.docFile.WriteLine(" {");

                this.indenter.increaseIndent();
            } else {
                this.indenter.decreaseIndent();
                this.popDocumentationContainer(interfaceDecl);

                this.emitIndent();
                this.docFile.WriteLine("}");
            }

            return true;
        }

        public ImportDeclarationCallback(pre: bool, importDecl: ImportDeclaration): bool {
            if (pre) {
                if ((<Script>this.documentationContainerStack[0]).isExternallyVisibleSymbol(importDecl.id.sym)) {
                    this.emitDocumentationComments(importDecl);
                    this.emitIndent();
                    this.docFile.Write("import ");

                    this.docFile.Write(importDecl.id.text + " = ");
                    if (importDecl.isDynamicImport) {
                        this.docFile.WriteLine("module (" + importDecl.getAliasName() + ");");
                    } else {
                        this.docFile.WriteLine(importDecl.getAliasName() + ";");
                    }
                }
            }

            return false;
        }

        private emitEnumSignature(moduleDecl: ModuleDeclaration) {
            if (!this.canEmitSignature(ToDocFlags(moduleDecl.modFlags))) {
                return false;
            }

            this.emitDocumentationComments(moduleDecl);
            this.emitDocFlags(ToDocFlags(moduleDecl.modFlags), "enum");
            this.docFile.WriteLine(moduleDecl.name.text + " {");

            this.indenter.increaseIndent();
            var membersLen = moduleDecl.members.members.length;
            for (var j = 1; j < membersLen; j++) {
                var memberDecl: AST = moduleDecl.members.members[j];
                if (memberDecl.nodeType === NodeType.VarDecl) {
                    this.emitDocumentationComments(memberDecl);
                    this.emitIndent();
                    this.docFile.WriteLine((<VarDecl>memberDecl).id.text + ",");
                } else {
                    CompilerDiagnostics.assert(memberDecl.nodeType != NodeType.Asg, "We want to catch this");
                }
            }
            this.indenter.decreaseIndent();

            this.emitIndent();
            this.docFile.WriteLine("}");

            return false;
        }

        public ModuleDeclarationCallback(pre: bool, moduleDecl: ModuleDeclaration): bool {
            if (hasFlag(moduleDecl.modFlags, ModuleFlags.IsWholeFile)) {
                // This is dynamic modules and we are going to outputing single file, 
                // we need to change the docFile because dynamic modules are always emitted to their corresponding .d.ts
                if (hasFlag(moduleDecl.modFlags, ModuleFlags.IsDynamic)) {
                    if (pre) {
                        if (!this.emitOptions.outputMany) {
                            this.singleDocFile = this.docFile;
                            CompilerDiagnostics.assert(this.indenter.indentAmt === 0, "Indent has to be 0 when outputing new file");
                            // Create new file
                            var tsFileName = (<Script>this.getAstDocumentationContainer()).locationInfo.fileName;
                            var docareFileName = this.emitOptions.mapOutputFileName(tsFileName, TypeScriptCompiler.mapToDTSFileName);
                            var useUTF8InOutputfile = moduleDecl.containsUnicodeChar || (this.emitOptions.compilationSettings.emitComments && moduleDecl.containsUnicodeCharInComment);
                            try {
                                // Creating files can cause exceptions, report them.   
                                this.docFile = new DocFileWriter(this.emitOptions.ioHost.createFile(docareFileName, useUTF8InOutputfile));
                            } catch (ex) {
                                this.errorReporter.emitterError(ex.message);
                            }
                        }
                        this.pushDocumentationContainer(moduleDecl);
                    } else {
                        if (!this.emitOptions.outputMany) {
                            CompilerDiagnostics.assert(this.singleDocFile != this.docFile, "singleDocFile cannot be null as we are going to revert back to it");
                            CompilerDiagnostics.assert(this.indenter.indentAmt === 0, "Indent has to be 0 when outputing new file");
                            try {
                                // Closing files could result in exceptions, report them if they occur
                                this.docFile.Close();
                            } catch (ex2) {
                                this.errorReporter.emitterError(ex2.message);
                            }
                            this.docFile = this.singleDocFile;
                        }
                        this.popDocumentationContainer(moduleDecl);
                    }
                }

                return true;
            }

            if (moduleDecl.isEnum()) {
                if (pre) {
                    this.emitEnumSignature(moduleDecl);
                }
                return false;
            }

            if (!this.canEmitPrePostAstSignature(ToDocFlags(moduleDecl.modFlags), moduleDecl, pre)) {
                return false;
            }

            if (pre) {
                if (this.emitDottedModuleName()) {
                    this.dottedModuleEmit += ".";
                } else {
                    this.dottedModuleEmit = this.getDocFlagsString(ToDocFlags(moduleDecl.modFlags), "module");
                }

                this.dottedModuleEmit += moduleDecl.name.text;

                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.modules = oCurrentContext.modules || {};
                if(!oCurrentContext.modules[moduleDecl.name.text]) {
                    oCurrentContext.modules[moduleDecl.name.text] = {};
                }

                this.aContext.push({
                    type: "modules",
                    name: moduleDecl.name.text
                });
                debugger;

                var isCurrentModuleDotted = (moduleDecl.members.members.length === 1 &&
                    moduleDecl.members.members[0].nodeType === NodeType.ModuleDeclaration &&
                    !(<ModuleDeclaration>moduleDecl.members.members[0]).isEnum() &&
                    hasFlag((<ModuleDeclaration>moduleDecl.members.members[0]).modFlags, ModuleFlags.Exported));

                // Module is dotted only if it does not have doc comments for it
                var moduleDeclComments = moduleDecl.getDocComments();
                isCurrentModuleDotted = isCurrentModuleDotted && (moduleDeclComments === null || moduleDeclComments.length === 0);

                this.isDottedModuleName.push(isCurrentModuleDotted);
                this.pushDocumentationContainer(moduleDecl);

                if (!isCurrentModuleDotted) {
                    this.emitDocumentationComments(moduleDecl);
                    this.docFile.Write(this.dottedModuleEmit);
                    this.docFile.WriteLine(" {");
                    this.indenter.increaseIndent();
                }
            } else {
                this.aContext.pop();
                if (!this.emitDottedModuleName()) {
                    this.indenter.decreaseIndent();
                    this.emitIndent();
                    this.docFile.WriteLine("}");
                }
                this.popDocumentationContainer(moduleDecl);
                this.isDottedModuleName.pop();
            }

            return true;
        }

        public ScriptCallback(pre: bool, script: Script): bool {
            if (pre) {
                if (this.emitOptions.outputMany) {
                    for (var i = 0; i < script.referencedFiles.length; i++) {
                        var referencePath = script.referencedFiles[i].path;
                        var docareFileName: string;
                        if (isRooted(referencePath)) {
                            docareFileName = this.emitOptions.mapOutputFileName(referencePath, TypeScriptCompiler.mapToDTSFileName)
                        } else {
                            docareFileName = getDeclareFilePath(script.referencedFiles[i].path);
                        }
                        this.docFile.WriteLine('/// <reference path="' + docareFileName + '" />');
                    }
                }
                this.pushDocumentationContainer(script);
            }
            else {
                this.popDocumentationContainer(script);
            }
            return true;
        }

        public DefaultCallback(pre: bool, ast: AST): bool {
            return !hasFlag(ast.flags, ASTFlags.IsStatement);
        }
    }
}