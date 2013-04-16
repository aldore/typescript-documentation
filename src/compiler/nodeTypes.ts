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
    // Note: Any addition to the NodeType should also be supported with addition to AstWalkerDetailCallback
    export enum NodeType {
        None,		//0
        Empty,
        EmptyExpr,
        True,
        False,
        This,		//5
        Super,
        QString,
        Regex,
        Null,
        ArrayLit,	//10
        ObjectLit,
        Void,
        Comma,
        Pos,
        Neg,
        Delete,
        Await,
        In,
        Dot,		//19 --
        From,		//20
        Is,
        InstOf,
        Typeof,
        NumberLit,
        Name,		//25 --
        TypeParameter,
        GenericType,
        TypeRef,
        Index,
        Call,		//30
        New,
        Asg,		//32
        AsgAdd,
        AsgSub,
        AsgDiv,
        AsgMul,
        AsgMod,
        AsgAnd,
        AsgXor,
        AsgOr,		//40
        AsgLsh,
        AsgRsh,
        AsgRs2,
        ConditionalExpression,
        LogOr,
        LogAnd,
        Or,
        Xor,
        And,
        Eq,			//50
        Ne,
        Eqv,
        NEqv,
        Lt,
        Le,
        Gt,
        Ge,
        Add,
        Sub,
        Mul,		//60
        Div,
        Mod,
        Lsh,
        Rsh,
        Rs2,
        Not,
        LogNot,
        IncPre,
        DecPre,
        IncPost,	//70
        DecPost,
        TypeAssertion,
        FuncDecl,	//73
        Member,
        VarDecl,	//75
        ArgDecl,
        Return,		//77
        Break,
        Continue,
        Throw,		//80
        For,
        ForIn,
        If,
        While,
        DoWhile,
        Block,
        Case,
        Switch,
        Try,		//90
        TryCatch,
        TryFinally,
        Finally,
        Catch,
        List,		//95
        Script,
        ClassDeclaration,
        InterfaceDeclaration,
        ModuleDeclaration,
        ImportDeclaration,
        With,		//100
        Label,
        LabeledStatement,
        EBStart,
        GotoEB,
        EndCode,	//105
        Error,
        Comment,
        Debugger,
        GeneralNode = FuncDecl,
        LastAsg = AsgRs2,
    }
}