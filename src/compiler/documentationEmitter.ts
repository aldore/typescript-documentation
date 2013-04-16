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
        constructor(private declFile: ITextWriter) {
        }

        public Write(s: string) {
            this.declFile.Write(s);
            this.onNewLine = false;
        }

        public WriteLine(s: string) {
            this.declFile.WriteLine(s);
            this.onNewLine = true;
        }

        public Close() {
            this.declFile.Close();
        }
    }

    export class DocumentationEmitter implements AstWalkerWithDetailCallback.AstWalkerDetailCallback {
        private declFile: DocFileWriter = null;
        private indenter = new Indenter();
        private declarationContainerStack: AST[] = [];
        private isDottedModuleName: bool[] = [];
        private dottedModuleEmit: string;
        private ignoreCallbackAst: AST = null;
        private singleDeclFile: DocFileWriter = null;
        private varListCount: number = 0;
        private aContext = [];
        private oDocumentation = {
            modules: {},
            classes: {},
            functions: {},
            variables: {}
        };

        private getCurrentContext() {
            var oCurrent = this.oDocumentation;

            for(var i = 0; i < this.aContext.length; i++) {
                var oContext = this.aContext[i];

                oCurrent = oCurrent[oContext.type][oContext.name];
            }

            return oCurrent;
        }

        private getCurrentContextString() {
            var sCurrent = "";

            for(var i = 0; i < this.aContext.length; i++) {
                var oContext = this.aContext[i];

                sCurrent += oContext.name;
                if(i != this.aContext.length - 1) {
                    sCurrent += ".";
                }
            }

            return sCurrent;
        }

        private getAstDeclarationContainer() {
            return this.declarationContainerStack[this.declarationContainerStack.length - 1];
        }

        private emitDottedModuleName() {
            return (this.isDottedModuleName.length == 0) ? false : this.isDottedModuleName[this.isDottedModuleName.length - 1];
        }

        constructor (public checker: TypeChecker, public emitOptions: EmitOptions, public errorReporter: ErrorReporter) {
        }

        public setDeclarationFile(file: ITextWriter) {
            this.declFile = new DocFileWriter(file);
        }

        public Close() {
            try {
                // Closing files could result in exceptions, report them if they occur
                this.declFile.Write(JSON.stringify(this.oDocumentation, null, 4));
                this.declFile.Close();
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        }

        public emitDeclarations(script: TypeScript.Script): void {
            AstWalkerWithDetailCallback.walk(script, this);
        }

        private getIndentString(declIndent? = false) {
            if (this.emitOptions.minWhitespace) {
                return "";
            }
            else {
                return this.indenter.getIndent();
            }
        }

        private emitIndent() {
            //this.declFile.Write(this.getIndentString());
        }

        private canEmitSignature(declFlags: DeclFlags, canEmitGlobalAmbientDecl?: bool = true, useDeclarationContainerTop?: bool = true) {
            var container: AST;
            if (useDeclarationContainerTop) {
                container = this.getAstDeclarationContainer();
            } else {
                container = this.declarationContainerStack[this.declarationContainerStack.length - 2];
            }

            if (container.nodeType == NodeType.ModuleDeclaration && !hasFlag(declFlags, DeclFlags.Exported)) {
                return false;
            }

            if (!canEmitGlobalAmbientDecl && container.nodeType == NodeType.Script && hasFlag(declFlags, DeclFlags.Ambient)) {
                return false;
            }

            return true;
        }

        private canEmitPrePostAstSignature(declFlags: DeclFlags, astWithPrePostCallback: AST, preCallback: bool) {
            if (this.ignoreCallbackAst) {
                CompilerDiagnostics.assert(this.ignoreCallbackAst != astWithPrePostCallback, "Ignore Callback AST mismatch");
                this.ignoreCallbackAst = null;
                return false;
            } else if (preCallback &&
                !this.canEmitSignature(declFlags, true, preCallback)) {
                this.ignoreCallbackAst = astWithPrePostCallback;
                return false;
            }

            return true;
        }

        private getDeclFlagsString(declFlags: DeclFlags, typeString: string) {
            var result = this.getIndentString();

            // Accessor strings
            var accessorString = "";
            if (hasFlag(declFlags, DeclFlags.GetAccessor)) {
                accessorString = "get ";
            }
            else if (hasFlag(declFlags, DeclFlags.SetAccessor)) {
                accessorString = "set ";
            }

            // Emit export only for global export statements. The container for this would be dynamic module which is whole file
            var container = this.getAstDeclarationContainer();
            if (container.nodeType == NodeType.ModuleDeclaration &&
                hasFlag((<ModuleDeclaration>container).modFlags, ModuleFlags.IsWholeFile) &&
                hasFlag(declFlags, DeclFlags.Exported)) {
                result += "export ";
            }

            // Static/public/private/global declare
            if (hasFlag(declFlags, DeclFlags.LocalStatic) || hasFlag(declFlags, DeclFlags.Static)) {
                if (hasFlag(declFlags, DeclFlags.Private)) {
                    result += "private ";
                }
                result += "static " + accessorString;
            }
            else {
                if (hasFlag(declFlags, DeclFlags.Private)) {
                    result += "private " + accessorString;
                }
                else if (hasFlag(declFlags, DeclFlags.Public)) {
                    result += "public " + accessorString;
                }
                else {
                    if (accessorString == "") {
                        result += typeString + " ";
                    } else {
                        result += accessorString;
                    }
                }
            }

            return result;
        }

        private emitDeclFlags(declFlags: DeclFlags, typeString: string) {
            /*File Write Old*/ // this.declFile.Write(this.getDeclFlagsString(declFlags, typeString));
        }

        private canEmitTypeAnnotationSignature(declFlag: DeclFlags = DeclFlags.None) {
            // Private declaration, shouldnt emit type any time.
            return !hasFlag(declFlag, DeclFlags.Private);
        }

        private pushDeclarationContainer(ast: AST) {
            this.declarationContainerStack.push(ast);
        }

        private popDeclarationContainer(ast: AST) {
            CompilerDiagnostics.assert(ast != this.getAstDeclarationContainer(), 'Declaration container mismatch');
            this.declarationContainerStack.pop();
        }

        private emitTypeNamesMember(memberName: MemberName, emitIndent? : bool = false) {
            if (memberName.prefix == "{ ") {
                if (emitIndent) {
                    this.emitIndent();
                }
                /*File Write Old*/ // this.declFile.WriteLine("{");
                this.indenter.increaseIndent();
                emitIndent = true;
            } else if (memberName.prefix != "") {
                if (emitIndent) {
                    this.emitIndent();
                }
                /*File Write Old*/ // this.declFile.Write(memberName.prefix);
                emitIndent = false;
            }

            if (memberName.isString()) {
                if (emitIndent) {
                    this.emitIndent();
                }
                /*File Write Old*/ // this.declFile.Write((<MemberNameString>memberName).text);
            } else {
                var ar = <MemberNameArray>memberName;
                for (var index = 0; index < ar.entries.length; index++) {
                    this.emitTypeNamesMember(ar.entries[index], emitIndent);
                    if (ar.delim == "; ") {
                        /*File Write Old*/ // this.declFile.WriteLine(";");
                    }
                }
            }

            if (memberName.suffix == "}") {
                this.indenter.decreaseIndent();
                this.emitIndent();
                /*File Write Old*/ // this.declFile.Write(memberName.suffix);
            } else {
                /*File Write Old*/ // this.declFile.Write(memberName.suffix);
            }
        }

        private emitTypeSignature(type: Type) {
            var containingScope: SymbolScope = null;
            var declarationContainerAst = this.getAstDeclarationContainer();
            switch (declarationContainerAst.nodeType) {
                case NodeType.ModuleDeclaration:
                case NodeType.InterfaceDeclaration:
                case NodeType.FuncDecl:
                    if (declarationContainerAst.type) {
                        containingScope = declarationContainerAst.type.containedScope;
                    }
                    break;

                case NodeType.Script:
                    var script = <Script>declarationContainerAst;
                    if (script.bod) {
                        containingScope = script.bod.enclosingScope;
                    }
                    break;

                case NodeType.ClassDeclaration:
                    if (declarationContainerAst.type) {
                        containingScope = declarationContainerAst.type.instanceType.containedScope;
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
            if (this.declFile.onNewLine) {
                this.emitIndent();
            } else if (!comment.isBlockComment) {
                /*File Write Old*/ // this.declFile.WriteLine("");
                this.emitIndent();
            }
            
            /*File Write Old*/ // this.declFile.Write(text[0]);

            for (var i = 1; i < text.length; i++) {
                /*File Write Old*/ // this.declFile.WriteLine("");
                this.emitIndent();
                /*File Write Old*/ // this.declFile.Write(text[i]);
            }

            if (comment.endsLine || !comment.isBlockComment) {
                /*File Write Old*/ // this.declFile.WriteLine("");
            } else {
                /*File Write Old*/ // this.declFile.Write(" ");
            }
        }

        private emitDeclarationComments(ast: AST, endLine?: bool);
        private emitDeclarationComments(symbol: Symbol, endLine?: bool);
        private emitDeclarationComments(astOrSymbol, endLine = true) {
            if (!this.emitOptions.emitComments) {
                return;
            }

            var declComments = <Comment[]>astOrSymbol.getDocComments();
            if (declComments.length > 0) {
                for (var i = 0; i < declComments.length; i++) {
                    this.emitComment(declComments[i]);
                }

                if (endLine) {
                    if (!this.declFile.onNewLine) {
                        /*File Write Old*/ // this.declFile.WriteLine("");
                    }
                } else {
                    if (this.declFile.onNewLine) {
                        this.emitIndent();
                    }
                }
            }
        }

        public VarDeclCallback(pre: bool, varDecl: VarDecl): bool {
            if (pre && this.canEmitSignature(ToDeclFlags(varDecl.varFlags), false)) {
                var interfaceMember = (this.getAstDeclarationContainer().nodeType == NodeType.InterfaceDeclaration);
                this.emitDeclarationComments(varDecl);
                if (!interfaceMember) {

                    var oCurrentContext = this.getCurrentContext();

                    oCurrentContext.variables = oCurrentContext.variables || {};
                    if(!oCurrentContext.variables[varDecl.id.text]) {
                        oCurrentContext.variables[varDecl.id.text] = {
                            location: this.getCurrentContextString()
                        };
                    }
                    
                    // If it is var list of form var a, b, c = emit it only if count > 0 - which will be when emitting first var
                    // If it is var list of form  var a = varList count will be 0
                    if (this.varListCount >= 0) {
                        this.emitDeclFlags(ToDeclFlags(varDecl.varFlags), "var");
                        this.varListCount = -this.varListCount;
                    }
                    /*File Write Old*/ // this.declFile.Write(varDecl.id.text);
                } else {
                    this.emitIndent();
                    /*File Write Old*/ // this.declFile.Write(varDecl.id.text);
                    if (hasFlag(varDecl.id.flags, ASTFlags.OptionalName)) {
                        /*File Write Old*/ // this.declFile.Write("?");
                    }
                }

                var type: Type = null;
                if (varDecl.typeExpr && varDecl.typeExpr.type) {
                    type = varDecl.typeExpr.type;
                }
                else if (varDecl.sym) {
                    type = (<FieldSymbol>varDecl.sym).getType();
                    // Dont emit inferred any
                    if (type == this.checker.anyType) {
                        type = null;
                    }
                }

                if (type && this.canEmitTypeAnnotationSignature(ToDeclFlags(varDecl.varFlags))) {
                    /*File Write Old*/ // this.declFile.Write(": ");
                    this.emitTypeSignature(type);
                }
               
                // emitted one var decl
                if (this.varListCount > 0) { this.varListCount--; } else if (this.varListCount < 0) { this.varListCount++; }

                // Write ; or ,
                if (this.varListCount < 0) {
                    /*File Write Old*/ // this.declFile.Write(", ");
                } else {
                    /*File Write Old*/ // this.declFile.WriteLine(";");
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
            this.emitDeclarationComments(argDecl, false);
            /*File Write Old*/ // this.declFile.Write(argDecl.id.text);
            if (argDecl.isOptionalArg()) {
                /*File Write Old*/ // this.declFile.Write("?");
            }
            if ((argDecl.typeExpr || argDecl.type != this.checker.anyType) &&
                this.canEmitTypeAnnotationSignature(ToDeclFlags(funcDecl.fncFlags))) {
                /*File Write Old*/ // this.declFile.Write(": ");
                this.emitTypeSignature(argDecl.type);
            }
        }

        public FuncDeclCallback(pre: bool, funcDecl: FuncDecl): bool {
            if (!pre) {
                return false;
            }

            if (funcDecl.isAccessor()) {
                return this.emitPropertyAccessorSignature(funcDecl);
            }

            var isInterfaceMember = (this.getAstDeclarationContainer().nodeType == NodeType.InterfaceDeclaration);
            if (funcDecl.bod) {
                if (funcDecl.isConstructor) {
                    if (funcDecl.type.construct && funcDecl.type.construct.signatures.length > 1) {
                        return false;
                    }
                } else {
                    if (funcDecl.type.call && funcDecl.type.call.signatures.length > 1) {
                        // This means its implementation of overload signature. do not emit
                        return false;
                    }
                }
            } else if (!isInterfaceMember && hasFlag(funcDecl.fncFlags, FncFlags.Private) && funcDecl.type.call && funcDecl.type.call.signatures.length > 1) {
                // Print only first overload of private function
                var signatures = funcDecl.type.call.signatures;
                var firstSignature = signatures[0].declAST;
                if (firstSignature.bod) {
                    // Its a implementation, use next one
                    firstSignature = signatures[1].declAST;
                }

                if (firstSignature != funcDecl) {
                    return false;
                }
            }

            if (!this.canEmitSignature(ToDeclFlags(funcDecl.fncFlags), false)) {
                return false;
            }

            this.emitDeclarationComments(funcDecl);
            if (funcDecl.isConstructor) {
                this.emitIndent();
                /*File Write Old*/ // this.declFile.Write("constructor");
            }
            else {
                var id = funcDecl.getNameText();

                if (!isInterfaceMember) {
                    var oCurrentContext = this.getCurrentContext();

                    oCurrentContext.functions = oCurrentContext.functions || {};
                    if(!oCurrentContext.functions[id]) {
                        oCurrentContext.functions[id] = {
                            location: this.getCurrentContextString()
                        };
                    }

                    this.emitDeclFlags(ToDeclFlags(funcDecl.fncFlags), "function");
                    if (id != "__missing" || !funcDecl.name || !funcDecl.name.isMissing()) {
                        /*File Write Old*/ // this.declFile.Write(id);
                    } else if (funcDecl.isConstructMember()) {
                        /*File Write Old*/ // this.declFile.Write("new");
                    }
                } else {
                    this.emitIndent();
                    if (funcDecl.isConstructMember()) {
                        /*File Write Old*/ // this.declFile.Write("new");
                    } else if (!funcDecl.isCallMember() && !funcDecl.isIndexerMember()) {
                        /*File Write Old*/ // this.declFile.Write(id);
                        if (hasFlag(funcDecl.name.flags, ASTFlags.OptionalName)) {
                            /*File Write Old*/ // this.declFile.Write("? ");
                        }
                    }
                }
            }

            if (!funcDecl.isIndexerMember()) {
                /*File Write Old*/ // this.declFile.Write("(");
            } else {
                /*File Write Old*/ // this.declFile.Write("[");
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
                        /*File Write Old*/ // this.declFile.Write(", ");
                    }
                }
            }

            if (funcDecl.variableArgList) {
                var lastArg = <ArgDecl>funcDecl.arguments.members[funcDecl.arguments.members.length - 1];
                if (funcDecl.arguments.members.length > 1) {
                    /*File Write Old*/ // this.declFile.Write(", ...");
                }
                else {
                    /*File Write Old*/ // this.declFile.Write("...");
                }
                this.emitArgDecl(lastArg, funcDecl);
            }

            this.indenter.decreaseIndent();

            if (!funcDecl.isIndexerMember()) {
                /*File Write Old*/ // this.declFile.Write(")");
            } else {
                /*File Write Old*/ // this.declFile.Write("]");
            }

            if (!funcDecl.isConstructor &&
                (funcDecl.returnTypeAnnotation || funcDecl.signature.returnType.type != this.checker.anyType) &&
                this.canEmitTypeAnnotationSignature(ToDeclFlags(funcDecl.fncFlags))) {
                /*File Write Old*/ // this.declFile.Write(": ");
                this.emitTypeSignature(funcDecl.signature.returnType.type);
            }

            /*File Write Old*/ // this.declFile.WriteLine(";");

            return false;
        }

        private emitBaseList(bases: ASTList, qual: string) {
            if (bases && (bases.members.length > 0)) {
                /*File Write Old*/ // this.declFile.Write(" " + qual + " ");
                var basesLen = bases.members.length;
                for (var i = 0; i < basesLen; i++) {
                    var baseExpr = bases.members[i];
                    var baseSymbol = baseExpr.type.symbol;
                    var baseType = baseExpr.type;
                    if (i > 0) {
                        /*File Write Old*/ // this.declFile.Write(", ");
                    }
                    this.emitTypeSignature(baseType);
                }
            }
        }

        private emitPropertyAccessorSignature(funcDecl: FuncDecl) {
            var accessorSymbol = <FieldSymbol>funcDecl.accessorSymbol;
            if (accessorSymbol.getter && accessorSymbol.getter.declAST != funcDecl) {
                // Setter is being used to emit the type info. 
                return false;
            }

            this.emitDeclarationComments(accessorSymbol);
            this.emitDeclFlags(ToDeclFlags(accessorSymbol.flags), "var");
            /*File Write Old*/ // this.declFile.Write(funcDecl.name.text);
            var propertyType = accessorSymbol.getType();
            if (this.canEmitTypeAnnotationSignature(ToDeclFlags(accessorSymbol.flags))) {
                /*File Write Old*/ // this.declFile.Write(" : ");
                this.emitTypeSignature(propertyType);
            }
            /*File Write Old*/ // this.declFile.WriteLine(";");

            return false;
        }

        private emitClassMembersFromConstructorDefinition(funcDecl: FuncDecl) {
            if (funcDecl.arguments) {
                var argsLen = funcDecl.arguments.members.length; if (funcDecl.variableArgList) { argsLen--; }

                for (var i = 0; i < argsLen; i++) {
                    var argDecl = <ArgDecl>funcDecl.arguments.members[i];
                    if (hasFlag(argDecl.varFlags, VarFlags.Property)) {
                        this.emitDeclarationComments(argDecl);
                        this.emitDeclFlags(ToDeclFlags(argDecl.varFlags), "var");
                        /*File Write Old*/ // this.declFile.Write(argDecl.id.text);

                        if (argDecl.typeExpr && this.canEmitTypeAnnotationSignature(ToDeclFlags(argDecl.varFlags))) {
                            /*File Write Old*/ // this.declFile.Write(": ");
                            this.emitTypeSignature(argDecl.type);
                        }
                        /*File Write Old*/ // this.declFile.WriteLine(";");
                    }
                }
            }
        }

        public ClassDeclarationCallback(pre: bool, classDecl: ClassDeclaration): bool {
            if (!this.canEmitPrePostAstSignature(ToDeclFlags(classDecl.varFlags), classDecl, pre)) {
                return false;
            }

            if (pre) {
                var className = classDecl.name.text;

                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.classes = oCurrentContext.classes || {};
                if(!oCurrentContext.classes[className]) {
                    oCurrentContext.classes[className] = {
                        location: this.getCurrentContextString()
                    };
                }

                this.aContext.push({
                    type: "classes",
                    name: className
                });

                this.emitDeclarationComments(classDecl);
                this.emitDeclFlags(ToDeclFlags(classDecl.varFlags), "class");
                /*File Write Old*/ // this.declFile.Write(className);
                this.emitBaseList(classDecl.extendsList, "extends");
                this.emitBaseList(classDecl.implementsList, "implements");
                /*File Write Old*/ // this.declFile.WriteLine(" {");

                this.pushDeclarationContainer(classDecl);
                this.indenter.increaseIndent();
                if (classDecl.constructorDecl) {
                    this.emitClassMembersFromConstructorDefinition(classDecl.constructorDecl);
                }
            } else {
                this.aContext.pop();
                this.indenter.decreaseIndent();
                this.popDeclarationContainer(classDecl);

                this.emitIndent();
                /*File Write Old*/ // this.declFile.WriteLine("}");
            }

            return true;
        }

        public InterfaceDeclarationCallback(pre: bool, interfaceDecl: InterfaceDeclaration): bool {
            if (!this.canEmitPrePostAstSignature(ToDeclFlags(interfaceDecl.varFlags), interfaceDecl, pre)) {
                return false;
            }

            if (pre) {
                var interfaceName = interfaceDecl.name.text;
                this.emitDeclarationComments(interfaceDecl);
                this.emitDeclFlags(ToDeclFlags(interfaceDecl.varFlags), "interface");
                /*File Write Old*/ // this.declFile.Write(interfaceName);
                this.emitBaseList(interfaceDecl.extendsList, "extends");
                /*File Write Old*/ // this.declFile.WriteLine(" {");

                this.indenter.increaseIndent();
                this.pushDeclarationContainer(interfaceDecl);
            } else {
                this.indenter.decreaseIndent();
                this.popDeclarationContainer(interfaceDecl);

                this.emitIndent();
                /*File Write Old*/ // this.declFile.WriteLine("}");
            }

            return true;
        }

        public ImportDeclarationCallback(pre: bool, importDecl: ImportDeclaration): bool {
            if (pre) {
                if ((<Script>this.declarationContainerStack[0]).isExternallyVisibleSymbol(importDecl.id.sym)) {
                    this.emitDeclarationComments(importDecl);
                    this.emitIndent();
                    /*File Write Old*/ // this.declFile.Write("import ");

                    /*File Write Old*/ // this.declFile.Write(importDecl.id.text + " = ");
                    if (importDecl.isDynamicImport) {
                        /*File Write Old*/ // this.declFile.WriteLine("module (" + importDecl.getAliasName() + ");");
                    } else {
                        /*File Write Old*/ // this.declFile.WriteLine(importDecl.getAliasName() + ";");
                    }
                }
            }

            return false;
        }

        private emitEnumSignature(moduleDecl: ModuleDeclaration) {
            if (!this.canEmitSignature(ToDeclFlags(moduleDecl.modFlags))) {
                return false;
            }

            this.emitDeclarationComments(moduleDecl);
            this.emitDeclFlags(ToDeclFlags(moduleDecl.modFlags), "enum");
            /*File Write Old*/ // this.declFile.WriteLine(moduleDecl.name.text + " {");

            this.indenter.increaseIndent();
            var membersLen = moduleDecl.members.members.length;
            for (var j = 1; j < membersLen; j++) {
                var memberDecl: AST = moduleDecl.members.members[j];
                if (memberDecl.nodeType == NodeType.VarDecl) {
                    this.emitDeclarationComments(memberDecl);
                    this.emitIndent();
                    /*File Write Old*/ // this.declFile.WriteLine((<VarDecl>memberDecl).id.text + ",");
                } else {
                    CompilerDiagnostics.assert(memberDecl.nodeType != NodeType.Asg, "We want to catch this");
                }
            }
            this.indenter.decreaseIndent();

            this.emitIndent();
            /*File Write Old*/ // this.declFile.WriteLine("}");

            return false;
        }

        public ModuleDeclarationCallback(pre: bool, moduleDecl: ModuleDeclaration): bool {
            if (hasFlag(moduleDecl.modFlags, ModuleFlags.IsWholeFile)) {
                // This is dynamic modules and we are going to outputing single file, 
                // we need to change the declFile because dynamic modules are always emitted to their corresponding .d.ts
                if (hasFlag(moduleDecl.modFlags, ModuleFlags.IsDynamic)) {
                    if (pre) {
                        if (!this.emitOptions.outputMany) {
                            this.singleDeclFile = this.declFile;
                            CompilerDiagnostics.assert(this.indenter.indentAmt == 0, "Indent has to be 0 when outputing new file");
                            // Create new file
                            var declareFileName = this.emitOptions.mapOutputFileName(stripQuotes(moduleDecl.name.sym.name), TypeScriptCompiler.mapToDTSFileName);
                            var useUTF8InOutputfile = moduleDecl.containsUnicodeChar || (this.emitOptions.emitComments && moduleDecl.containsUnicodeCharInComment);
                            try {
                                // Creating files can cause exceptions, report them.   
                                this.declFile = new DocFileWriter(this.emitOptions.ioHost.createFile(declareFileName, useUTF8InOutputfile));
                            } catch (ex) {
                                this.errorReporter.emitterError(null, ex.message);
                            }
                        }
                        this.pushDeclarationContainer(moduleDecl);
                    } else {
                        if (!this.emitOptions.outputMany) {
                            CompilerDiagnostics.assert(this.singleDeclFile != this.declFile, "singleDeclFile cannot be null as we are going to revert back to it");
                            CompilerDiagnostics.assert(this.indenter.indentAmt == 0, "Indent has to be 0 when outputing new file");
                            try {
                                // Closing files could result in exceptions, report them if they occur
                                this.declFile.Close();
                            } catch (ex) {
                                this.errorReporter.emitterError(null, ex.message);
                            }
                            this.declFile = this.singleDeclFile;
                        }
                        this.popDeclarationContainer(moduleDecl);
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

            if (!this.canEmitPrePostAstSignature(ToDeclFlags(moduleDecl.modFlags), moduleDecl, pre)) {
                return false;
            }

            if (pre) {
                if (this.emitDottedModuleName()) {
                    this.dottedModuleEmit += ".";
                } else {
                    this.dottedModuleEmit = this.getDeclFlagsString(ToDeclFlags(moduleDecl.modFlags), "module");
                }
                this.dottedModuleEmit += moduleDecl.name.text;

                var oCurrentContext = this.getCurrentContext();

                oCurrentContext.modules = oCurrentContext.modules || {};
                if(!oCurrentContext.modules[moduleDecl.name.text]) {
                    oCurrentContext.modules[moduleDecl.name.text] = {
                        location: this.getCurrentContextString()
                    };
                }

                this.aContext.push({
                    type: "modules",
                    name: moduleDecl.name.text
                });

                var isCurrentModuleDotted = (moduleDecl.members.members.length == 1 &&
                    moduleDecl.members.members[0].nodeType == NodeType.ModuleDeclaration &&
                    !(<ModuleDeclaration>moduleDecl.members.members[0]).isEnum() &&
                    hasFlag((<ModuleDeclaration>moduleDecl.members.members[0]).modFlags, ModuleFlags.Exported));

                // Module is dotted only if it does not have doc comments for it
                var moduleDeclComments = moduleDecl.getDocComments();
                isCurrentModuleDotted = isCurrentModuleDotted && (moduleDeclComments == null || moduleDeclComments.length == 0);

                this.isDottedModuleName.push(isCurrentModuleDotted);
                this.pushDeclarationContainer(moduleDecl);

                if (!isCurrentModuleDotted) {
                    this.emitDeclarationComments(moduleDecl);
                    /*File Write Old*/ // this.declFile.Write(this.dottedModuleEmit);
                    /*File Write Old*/ // this.declFile.WriteLine(" {");
                    this.indenter.increaseIndent();
                }
            } else {
                this.aContext.pop();
                if (!this.emitDottedModuleName()) {
                    this.indenter.decreaseIndent();
                    this.emitIndent();
                    /*File Write Old*/ // this.declFile.WriteLine("}");
                }
                this.popDeclarationContainer(moduleDecl);
                this.isDottedModuleName.pop();
            }

            return true;
        }

        public ScriptCallback(pre: bool, script: Script): bool {
            if (pre) {
                if (this.emitOptions.outputMany) {
                    for (var i = 0; i < script.referencedFiles.length; i++) {
                        var referencePath = script.referencedFiles[i].path;
                        var declareFileName: string;
                        if (isRooted(referencePath)) {
                            declareFileName = this.emitOptions.mapOutputFileName(referencePath, TypeScriptCompiler.mapToDTSFileName)
                        } else {
                            declareFileName = getDeclareFilePath(script.referencedFiles[i].path);
                        }
                        /*File Write Old*/ // this.declFile.WriteLine('/// <reference path="' + declareFileName + '" />');
                    }
                }
                this.pushDeclarationContainer(script);
            }
            else {
                this.popDeclarationContainer(script);
            }
            return true;
        }

        public DefaultCallback(pre: bool, ast: AST): bool {
            return !hasFlag(ast.flags, ASTFlags.IsStatement);
        }
    }
}