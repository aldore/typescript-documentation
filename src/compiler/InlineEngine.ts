
///<reference path='typescript.ts' />

module TypeScript {
    export enum EAccessorModes {
        GETTER,
        SETTER
    }
    
    export interface IInlineArg {
    	i: number;
    	n: number;
    	arg: AST;
    }

    class InlineTextWriter implements ITextWriter {
    	public buffer = "";
    	// Inner writer does not need a WriteLine method, since the BufferedTextWriter wraps it itself
    	
    	Write(str) {
    		this.buffer += str;
    	}
    	WriteLine(str) {
    		this.Write(str + '\r\n');
    	}
    	Close() {
    		this.Clear();
    	}

    	Clear() {
    		this.buffer = "";
    	}
    }

    export class InlineEngine {
		//context backend
        contextMap: AST[] = [];
        deferredContext: AST[] = new AST[];

		//common backend
        
        bEnabled: bool = true;
        inlineStack: FuncDecl[] = [];

		//arguments backend
        pDepthInfo: ArgDecl[][] = [];
        argMap: AST[][] = [];
        deferredArgument: IInlineArg[] = [];
        lastArg: IInlineArg = { i: 0, n: 0, arg: null };

        outBuffer: ITextWriter = new InlineTextWriter;
        emitter: Emitter = null;
		emitterLevel: number = 0;

        grabImitterOutput(emitter: Emitter): void {
        	var pOut: ITextWriter = emitter.outfile;
        	this.emitter = emitter;

        	emitter.outfile = this.outBuffer;
        	this.outBuffer = pOut;
        }

        restoreImitterOutput(): void {
        	var pOut: ITextWriter = this.emitter.outfile;
        	this.emitter.outfile = this.outBuffer;
        	this.outBuffer = pOut;
        	this.emitter = null;
        }
		
        normalizeModuleName (emitter: Emitter, container: Symbol): string {
        	if (!this.isActive()) {
        		return container.name;
        	}

        	var origin: Symbol = container;

        	var pGroupT: Symbol[] = [];
        	var pGroupP: ModuleDeclaration[] = emitter.moduleDeclList;

        	while (container) {
        		pGroupT.push(container);
        		container = container.container;
        	}

        	pGroupT.length--;
        	pGroupT.reverse();

        	var s = "";
        	emitter.writeToOutput("/*checked (origin: " + origin.name + ")>>*/");
        	for (var i = 0; i < pGroupP.length; ++i) {
        		if (pGroupP[i].name.text != pGroupT[i].name || pGroupP.length == 1) {
        			for (var j = i; j < pGroupT.length; ++j) {
        				s += pGroupT[j].name + (j != pGroupT.length - 1 ? "." : "");
        			}
        			// emitter.writeToOutput("/*correct> " + s + " */");
        			return s;
        		}

        		//goups are equal!
        		if (i == pGroupT.length - 1) {
        			return s + origin.name;
        		}

        		s += pGroupP[i].name.text + ".";
        	}

        	return origin.name;
        }

        begin(pFunc: FuncDecl = null): void {
        	this.pDepthInfo.push([]);
        	this.argMap.push([]);
        	this.inlineStack.push(pFunc);
        	//console.log("--------------------------------------->");
        }

        end(): void {
        	this.pDepthInfo.pop();
        	this.argMap.pop();
        	this.inlineStack.pop();
        	//console.log("---------------------------------------<");
        }

        depth(): number {
        	return this.pDepthInfo.length;
        }

        argv(iLevel?: number): ArgDecl[] {
        	return this.pDepthInfo[!isDef(iLevel) ? this.pDepthInfo.length - 1 : iLevel >= 0 ? iLevel : this.pDepthInfo.length - 1 + iLevel];
        }
		
        argc(): number {
        	return this.pDepthInfo[this.pDepthInfo.length - 1].length;
        }

        argumentsMap(iLevel?: number): AST[] {
        	return this.argMap[!isDef(iLevel) ? this.argMap.length - 1 : iLevel >= 0 ? iLevel : this.argMap.length - 1 + iLevel];
        }

        isActive(): bool {
        	return this.depth() > 0;
        }

        disable(): void {
            this.bEnabled = false;
        }

        enable(): void {
            this.bEnabled = true;
        }

        isEnabled(): bool {
            return this.bEnabled;
        }

        replaceArgumentByText(emitter: Emitter, pExpr: AST): StringLiteral {
        	if (this.emitter === null) {
        		this.grabImitterOutput(emitter);
        	}
			this.emitterLevel ++;

        	var pWriter: InlineTextWriter = (<InlineTextWriter>emitter.outfile);
        	var sCurrentData: string = pWriter.buffer;
        	var sResult: string;

        	pWriter.Clear();

        	emitter.emitJavascript(pExpr, TokenID.OpenParen, false);

        	sResult = pWriter.buffer;
        	pWriter.buffer = sCurrentData;

            this.emitterLevel --;
        	if (this.emitter !== null && this.emitterLevel == 0) {
        		this.restoreImitterOutput();
        	}

        	return new StringLiteral(sResult);
        }

        inlineInitArg(emitter: Emitter, pExpr: AST, pContext: AST): AST {
        	this.replaceContext(pContext);
        	var pSubst = this.replaceArgumentByText(emitter, pExpr);
        	this.rollbackContext();
        	return pSubst;
        }

		// arguments API

        findArgIndex(pArg: ArgDecl): number {
        	var argv = this.argv();
        	for (var i = 0; i < argv.length; ++i) {
        		if (argv[i] === pArg) {
        			return i;
        		}
        	}

        	throw new Error("cannot find argument in inline argument map");
        }

        replaceArgument(emitter: Emitter, pArg: ArgDecl, pExpr: AST): void {
        	var argv = this.argv();
        	var argMap = this.argumentsMap();
        	var n = argv.length;
        	


        	//var s = "";
        	//for (var i = 0; i < this.depth(); ++i) {
        	//	s += "--";
        	//}
        	//s += "> (";
        	//for (var i = 0; i < 2; ++i) {


        	//	if (i == n) {
        	//		s += pArg.printLabel() + " --> " + pExpr.printLabel();
        	//	}
        	//	else {
        	//		s += "...";
        	//	}

        	//	if (i !== 2 - 1) {
        	//		s += ", ";
        	//	}

        	//}
        	//s += ")";


        	argMap[n] = this.replaceArgumentByText(emitter, pExpr);
        	argv.push(pArg);

        	//console.log(s);

        	//this.printArgumentsMap();
        }

        printArgumentsMap(): void {
        	var s = "";
        	s += "\n";
        	for (var i = 0; i < this.depth() ; ++i) {
        		var map = this.argumentsMap(i);
        		s += i + ": " + this.inlineStack[i].treeViewLabel() + "[ ";
        		for (var j = 0; j < map.length; ++j) {
        			s += "(" + this.argv(i)[j].printLabel() + ") " + (map[j] ? map[j].printLabel() : null) + ", ";
        		}
        		s += " ]\n";
        	}
        	console.log(s);
        }

        rollbackArgument(pArg: ArgDecl): bool {
        	var n = this.findArgIndex(pArg);
        	var argMap = this.argumentsMap();

        	if (argMap[n]) {
        		argMap[n] = null;
        		return true;
        	}

        	return false;
        }
		
        findArgumentIndexByProto(pProto: Identifier, iLevel: number = 0): number {
        	var argv = this.argv(iLevel);

        	var argv = this.argv(iLevel);
        	
			
			//if (!argv) {
        	//    console.log("ERROR!!!", pProto.printLabel(), iLevel, "depth:", this.depth());
        	//}

        	for (var i = 0; i < argv.length; ++i) {
        		if (argv[i].id.text == pProto.text) {
        			break;
        		}
        	}

        	if (i == argv.length) {
        		return -1;
        	}

        	return i;
        }

        getArgument(pProto: Identifier): AST {
        	for (var i = this.depth() - 1; i >= 0; --i) {
        		var n = this.findArgumentIndexByProto(pProto, i);

        		if (n < 0) {
        			continue;
        		}

        		var argMap = this.argumentsMap(i);

        		if (argMap[n] === null) {
        			continue;
        		}

        		//console.log(pProto.printLabel(), "-->", argMap[n] ? argMap[n].printLabel() : null);
        		this.lastArg.n = n;
        		this.lastArg.i = i;
        		this.lastArg.arg = argMap[n];

        		return argMap[n] || null;
        	}

        	return null;
        }

        shiftArgument(pProto?: Identifier): AST {
        	var lastArg: IInlineArg = this.lastArg;
        	var i = lastArg.i;
        	var n = lastArg.n;
        	var arg: AST = lastArg.arg;

        	var argMap = this.argumentsMap(i);
        	this.deferredArgument.push({i: i, n: n, arg: arg});

        	argMap[n] = null;

        	return arg;
        }
		
        unshiftArgument(pProto: Identifier): void {
        	var defArg: IInlineArg = this.deferredArgument.pop();
        	var i = defArg.i;
        	var n = defArg.n;
        	var argMap = this.argumentsMap(i);
        	argMap[n] = defArg.arg;
        }
		
		//context API

        replaceContext(pExpr: AST): void {
        	var ctx = this.getContext();
        	//if (ctx)
        	//	console.log(ctx.printLabel() + " --> " + pExpr.printLabel())
        	//else {
        	//	console.log(" * " + pExpr.printLabel())
        	//}
        	this.contextMap.push(pExpr);
        	//this.printContextMap();
        }

        printContextMap(): void {
        	var s = "{ ";
        	for (var i = 0; i < this.contextMap.length; ++i) {
        		s += this.contextMap[i].printLabel() + (i == this.contextMap.length - 1 ? "" : ", ");
        	}
        	s += " }";
        	console.log(s);
        }

        rollbackContext(): bool {
        	return isDefAndNotNull(this.contextMap.pop());
        }

        getContext(): AST {
        	return this.contextMap[this.contextMap.length - 1];
        }

        shiftContext(): AST {
        	var pExpr = this.contextMap.pop() || null;

        	this.deferredContext.push(pExpr);

        	return pExpr;
        }

        unshiftContext(): void {
        	this.contextMap.push(this.deferredContext.pop());
        }

        getExpression(eExpr: NodeType, pProto: AST = null): AST {
        	if (eExpr === NodeType.Name) {
        		return this.getArgument(<Identifier>pProto);
        	}
			
        	if (eExpr !== NodeType.This) {
        		throw new Error("unsupported call");
        	}

            return this.getContext();
        }
		
        shiftExpression(eExpr: NodeType, pProto: AST = null): AST {
        	if (eExpr == NodeType.Name) {
        		return this.shiftArgument(<Identifier>pProto);
        	}


        	return this.shiftContext();
        }

        unshiftExpression(eExpr: NodeType, pProto: AST = null): void {
        	if (eExpr == NodeType.Name) {
        		this.unshiftArgument(<Identifier>pProto);
				return;
        	}

        	this.unshiftContext();
        }
        

		//inline API for AST

        inline(target: AST, emitter: Emitter, tokenId: TokenID, startLine: bool): bool {
        	if (!this.isActive()) {
        		return false;
        	}

        	var eqv = /*target.inlineValue || */this.getExpression(target.nodeType, target);

        	if (!isDefAndNotNull(eqv)) {
        		return false;
        	}

        	if (eqv.nodeType != NodeType.Name) {
        		emitter.writeToOutput("(");
        	}

        	this.shiftExpression(target.nodeType, target);
        	emitter.emitJavascript(eqv, TokenID.OpenParen, false);
        	this.unshiftExpression(target.nodeType, target);

        	if (eqv.nodeType != NodeType.Name) {
        		emitter.writeToOutput(")");
        	}

        	return true;
        }

		//inline API for emitter & AST

        inlineFunction(emitter: Emitter, target: AST, funcDecl: FuncDecl, argData: AST = null): bool {

        	var realTarget: AST = target;
        	var isUnsupported = false;
        	var type: Type = null;

        	//default condition
        	if (!this.isEnabled()) {
        		return false;
        	}

        	var args: AST[] = null;

        	if (isDefAndNotNull(argData)) {
        		if (argData.nodeType != NodeType.List) {
        			args = [argData];
        		}
        		else {
        			args = (<ASTList>argData).members;
        		}
        	}
        	else {
        		args = [];
        	}

        	if (this.depth() > 1 && isDefAndNotNull(args)) {
        		for (var i = 0; i < args.length; ++i) {
        			switch (args[i].nodeType) {
        				case NodeType.Call:
						case NodeType.New:
						case NodeType.ArrayLit:
						case NodeType.ObjectLit:
							emitter.writeToOutput("/*warning: used unsafe argument when you call the inline function(" + args[i].printLabel() + ")*/");
							return false;
        			}
        		}
        	}

        	//if (args && args.members.length > 0) {
        	//	emitter.writeToOutput("/*not inlined, because arguments count is not zero*/");
        	//	return false;
        	//}

        	//Support conditions

        	if (target.nodeType == NodeType.Name ||
                target.nodeType == NodeType.Dot ||
                target.nodeType == NodeType.New ||
				target.nodeType == NodeType.This ||
				target.nodeType == NodeType.Asg) {
        		//supported only BinaryExpression or direct call.

        		if (target.nodeType != NodeType.Name) {

        			if (target.nodeType == NodeType.Dot) {
        				realTarget = (<BinaryExpression>target).operand1;
        			}

        			type = realTarget.type;

        			if (isNull(type)) {
        				//type must be defined
        				emitter.writeToOutput("/*not inlined, because context type is undefined*/");
        				return false;
        			}
        		
        			//only class getters/method or global context calls supported
        			if (!type.isClassInstance() && !type.isModuleType()) {
        				emitter.writeToOutput("/*not inlined, because context is not class or module*/");
        				return false;
        			}
        			
        		}
        	}
        	else {
        		emitter.writeToOutput("/*not inlined, because expression has unsupported type(type: " + target.nodeType + ")*/");
        		return false;
        	}

        	type = realTarget.type;

			var body = funcDecl.bod.members;

            if ((body.length > 1 && !(body.length == 2 && body[1].nodeType == NodeType.EndCode)) && body[0].nodeType != NodeType.Return ) {

                emitter.writeToOutput("/*not inlined, because supportes only single statement functions(cur. st. count: " + body.length + ")*/");

                return false;
            }

            var expType = body[0].nodeType;

            if (expType != NodeType.Return &&
				expType != NodeType.Call &&
				expType != NodeType.Dot &&
				expType != NodeType.Asg) {
                emitter.writeToOutput("/*not inlined, because first statement is not return/call/dot(cur st.: " + body[0].treeViewLabel() + ")*/");
                return false;
            }
        	

        	this.begin(funcDecl);

        	var argv: AST[] = funcDecl.arguments.members;

        	for (var i = 0; i < argv.length; ++i) {
        		var argDecl: ArgDecl = <ArgDecl>argv[i];
        		var defArg: AST = null;
				
        		if (!args[i]) {
        			var initArg: AST = null;

        			if (argDecl.init) {
        				initArg = this.inlineInitArg(emitter, argDecl.init, realTarget);
        			}

        			defArg = initArg || new Identifier("undefined");
        		}

        		this.replaceArgument(emitter, argDecl, args[i] || defArg);
        	}

        	if (!TypeScript.isNull(type)) {
        		if (type.isClassInstance()) {
        			this.replaceContext(realTarget);
        		}
        	}

			var st: AST = funcDecl.bod.members[0]
			var res: AST = st.nodeType == NodeType.Return ? (<ReturnStatement>st).returnExpression: st;

        	emitter.writeToOutput("(");
        	emitter.emitJavascript(res, TokenID.OpenParen, true);
        	emitter.writeToOutput(")");

        	for (var i = 0; i < argv.length; ++i) {
        		this.rollbackArgument(<ArgDecl>argv[i]);
        	}

        	if (!TypeScript.isNull(type)) {
        		if (type.isClassInstance()) {
        			this.rollbackContext();
        		}
        	}

        	this.end();

        	return true;
        };
        
    }
}