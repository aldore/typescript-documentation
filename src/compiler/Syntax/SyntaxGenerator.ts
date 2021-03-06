///<reference path='..\Core\ArrayUtilities.ts' />
///<reference path='..\Core\Environment.ts' />
///<reference path='..\Core\StringUtilities.ts' />
///<reference path='SyntaxFacts.ts' />
///<reference path='SyntaxKind.ts' />

// Adds argument checking to the generated nodes.  Argument checking appears to slow things down
// parsing about 7%.  If we want to get that perf back, we can always remove this.
var argumentChecks = false;
var forPrettyPrinter = false;

interface ITypeDefinition {
    name: string;
    baseType: string;
    interfaces?: string[];
    isAbstract?: bool;
    children: IMemberDefinition[];
    isTypeScriptSpecific: bool;
}

interface IMemberDefinition {
    name: string;
    type?: string;
    isToken?: bool;
    isList?: bool;
    isSeparatedList?: bool;
    requiresAtLeastOneItem?: bool;
    isOptional?: bool;
    tokenKinds?: string[];
    isTypeScriptSpecific: bool;
    elementType?: string;
}

var interfaces = {
    IMemberDeclarationSyntax: 'IClassElementSyntax',
    IStatementSyntax: 'IModuleElementSyntax',
    INameSyntax: 'ITypeSyntax',
    ITypeSyntax: 'IUnaryExpressionSyntax',
    IUnaryExpressionSyntax: 'IExpressionSyntax'
};

var definitions:ITypeDefinition[] = [
    <any>{
        name: 'SourceUnitSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            <any>{ name: 'endOfFileToken', isToken: true }
        ]
    },
    <any>{
        name: 'ModuleReferenceSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleReferenceSyntax'],
        isAbstract: true,
        children: [],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ExternalModuleReferenceSyntax',
        baseType: 'ModuleReferenceSyntax',
        children: [
            <any>{ name: 'moduleKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'stringLiteral', isToken: true },
            <any>{ name: 'closeParenToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ModuleNameModuleReferenceSyntax',
        baseType: 'ModuleReferenceSyntax',
        children: [
            <any>{ name: 'moduleName', type: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ImportDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'importKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'equalsToken', isToken: true },
            <any>{ name: 'moduleReference', type: 'ModuleReferenceSyntax' },
            <any>{ name: 'semicolonToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ClassDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true  },
            <any>{ name: 'declareKeyword', isToken: true, isOptional: true  },
            <any>{ name: 'classKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'extendsClause', type: 'ExtendsClauseSyntax', isOptional: true },
            <any>{ name: 'implementsClause', type: 'ImplementsClauseSyntax', isOptional: true },
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'classElements', isList: true, elementType: 'IClassElementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'InterfaceDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true  },
            <any>{ name: 'interfaceKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'extendsClause', type: 'ExtendsClauseSyntax', isOptional: true },
            <any>{ name: 'body', type: 'ObjectTypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ExtendsClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'extendsKeyword', isToken: true },
            <any>{ name: 'typeNames', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ImplementsClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'implementsKeyword', isToken: true },
            <any>{ name: 'typeNames', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ModuleDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true },
            <any>{ name: 'declareKeyword', isToken: true, isOptional: true },
            <any>{ name: 'moduleKeyword', isToken: true },
            <any>{ name: 'moduleName', type: 'INameSyntax', isOptional: true },
            <any>{ name: 'stringLiteral', isToken: true, isOptional: true },
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'FunctionDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'declareKeyword', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'functionKeyword', isToken: true },
            <any>{ name: 'functionSignature', type: 'FunctionSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true }
        ]
    },
    <any>{
        name: 'VariableStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'declareKeyword', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax' },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'VariableDeclarationSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'varKeyword', isToken: true },
            <any>{ name: 'variableDeclarators', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'VariableDeclaratorSyntax' }
        ]
    },
    <any>{
        name: 'VariableDeclaratorSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'EqualsValueClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'equalsToken', isToken: true },
            <any>{ name: 'value', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'PrefixUnaryExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'kind', type: 'SyntaxKind' },
            <any>{ name: 'operatorToken', isToken: true, tokenKinds: ['PlusPlusToken', 'MinusMinusToken', 'PlusToken', 'MinusToken', 'TildeToken', 'ExclamationToken'] },
            <any>{ name: 'operand', type: 'IUnaryExpressionSyntax' }
        ]
    },
    <any>{
        name: 'ArrayLiteralExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'openBracketToken', isToken: true },
            <any>{ name: 'expressions', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true }
        ]
    },
    <any>{
        name: 'OmittedExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: []
    },
    <any>{
        name: 'ParenthesizedExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true }
        ]
    },
    <any>{
        name: 'ArrowFunctionExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        isAbstract: true,
        children: [],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'SimpleArrowFunctionExpressionSyntax',
        baseType: 'ArrowFunctionExpressionSyntax',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'equalsGreaterThanToken', isToken: true },
            <any>{ name: 'body', type: 'ISyntaxNodeOrToken' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ParenthesizedArrowFunctionExpressionSyntax',
        baseType: 'ArrowFunctionExpressionSyntax',
        children: [
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true },
            <any>{ name: 'body', type: 'ISyntaxNodeOrToken' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'QualifiedNameSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['INameSyntax'],
        children: [
            <any>{ name: 'left', type: 'INameSyntax' },
            <any>{ name: 'dotToken', isToken: true },
            <any>{ name: 'right', isToken: true, tokenKinds:['IdentifierName'] }
        ],
        // Qualified names only show up in Types, which are TypeScript specific. Note that a dotted
        // expression (like A.B.Foo()) is a MemberAccessExpression, not a QualifiedName.
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeArgumentListSyntax',
        baseType: 'SyntaxNode',
        children: [
                <any>{ name: 'lessThanToken', isToken: true },
                <any>{ name: 'typeArguments', isSeparatedList: true, elementType: 'ITypeSyntax' },
                <any>{ name: 'greaterThanToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ConstructorTypeSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'newKeyword', isToken: true },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'FunctionTypeSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ObjectTypeSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'typeMembers', isSeparatedList: true, elementType: 'TypeMemberSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ArrayTypeSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'type', type: 'ITypeSyntax' },
            <any>{ name: 'openBracketToken', isToken: true },
            <any>{ name: 'closeBracketToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'GenericTypeSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'name', type: 'INameSyntax' },
            <any>{ name: 'typeArgumentList', type: 'TypeArgumentListSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeAnnotationSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'BlockSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ]
    },
    <any>{
        name: 'ParameterSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'dotDotDotToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'publicOrPrivateKeyword', isToken: true, isOptional: true, tokenKinds: ['PublicKeyword', 'PrivateKeyword'], isTypeScriptSpecific: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    <any>{
        name: 'MemberAccessExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'dotToken', isToken: true },
            <any>{ name: 'name', isToken: true, tokenKinds: ['IdentifierName'] }
        ]
    },
    <any>{
        name: 'PostfixUnaryExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'kind', type: 'SyntaxKind' },
            <any>{ name: 'operand', type: 'IExpressionSyntax' },
            <any>{ name: 'operatorToken', isToken: true, tokenKinds:['PlusPlusToken', 'MinusMinusToken'] }
        ]
    },
    <any>{
        name: 'ElementAccessExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'openBracketToken', isToken: true },
            <any>{ name: 'argumentExpression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true }
        ]
    },
    <any>{
        name: 'InvocationExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'argumentList', type: 'ArgumentListSyntax' }
        ]
    },
    <any>{
        name: 'ArgumentListSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'typeArgumentList', type: 'TypeArgumentListSyntax', isOptional: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'arguments', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true }
        ]
    },
    <any>{
        name: 'BinaryExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            <any>{ name: 'kind', type: 'SyntaxKind' },
            <any>{ name: 'left', type: 'IExpressionSyntax' },
            <any>{ name: 'operatorToken', isToken: true,
                   tokenKinds:['AsteriskToken',  'SlashToken',  'PercentToken', 'PlusToken', 'MinusToken',  'LessThanLessThanToken',
                               'GreaterThanGreaterThanToken', 'GreaterThanGreaterThanGreaterThanToken', 'LessThanToken',
                               'GreaterThanToken', 'LessThanEqualsToken', 'GreaterThanEqualsToken', 'InstanceOfKeyword',
                               'InKeyword', 'EqualsEqualsToken', 'ExclamationEqualsToken', 'EqualsEqualsEqualsToken',
                               'ExclamationEqualsEqualsToken', 'AmpersandToken', 'CaretToken', 'BarToken', 'AmpersandAmpersandToken',
                               'BarBarToken', 'BarEqualsToken', 'AmpersandEqualsToken', 'CaretEqualsToken', 'LessThanLessThanEqualsToken',
                               'GreaterThanGreaterThanEqualsToken', 'GreaterThanGreaterThanGreaterThanEqualsToken', 'PlusEqualsToken',
                               'MinusEqualsToken', 'AsteriskEqualsToken', 'SlashEqualsToken', 'PercentEqualsToken', 'EqualsToken',
                               'CommaToken'] },
            <any>{ name: 'right', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'ConditionalExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'questionToken', isToken: true },
            <any>{ name: 'whenTrue', type: 'IExpressionSyntax' },
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'whenFalse', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'TypeMemberSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        isAbstract: true,
        children: [],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ConstructSignatureSyntax',
        baseType: 'TypeMemberSyntax',
        children: [
            <any>{ name: 'newKeyword', isToken: true },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'FunctionSignatureSyntax',
        baseType: 'TypeMemberSyntax',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true, itTypeScriptSpecific: true },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' }
        ]
    },
    <any>{
        name: 'IndexSignatureSyntax',
        baseType: 'TypeMemberSyntax',
        children: [
            <any>{ name: 'openBracketToken', isToken: true },
            <any>{ name: 'parameter', type: 'ParameterSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'PropertySignatureSyntax',
        baseType: 'TypeMemberSyntax',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ParameterListSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'parameters', isSeparatedList: true, elementType: 'ParameterSyntax' },
            <any>{ name: 'closeParenToken', isToken: true }
        ]
    },
    <any>{
        name: 'CallSignatureSyntax',
        baseType: 'TypeMemberSyntax',
        children: [
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    <any>{
        name: 'TypeParameterListSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'lessThanToken', isToken: true },
            <any>{ name: 'typeParameters', isSeparatedList: true, elementType: 'TypeParameterSyntax' },
            <any>{ name: 'greaterThanToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeParameterSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'constraint', type: 'ConstraintSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ConstraintSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'extendsKeyword', isToken: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ElseClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'elseKeyword', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'IfStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'ifKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' },
            <any>{ name: 'elseClause', type: 'ElseClauseSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'ExpressionStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'ConstructorDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IClassElementSyntax'],
        children: [
            <any>{ name: 'constructorKeyword', isToken: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MemberFunctionDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            <any>{ name: 'publicOrPrivateKeyword', isToken: true, isOptional: true, tokenKinds: ['PublicKeyword', 'PrivateKeyword'] },
            <any>{ name: 'staticKeyword', isToken: true, isOptional: true },
            <any>{ name: 'functionSignature', type: 'FunctionSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MemberAccessorDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        isAbstract: true,
        children: [],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'GetMemberAccessorDeclarationSyntax',
        baseType: 'MemberAccessorDeclarationSyntax',
        children: [
            <any>{ name: 'publicOrPrivateKeyword', isToken: true, isOptional: true, tokenKinds: ['PublicKeyword', 'PrivateKeyword'] },
            <any>{ name: 'staticKeyword', isToken: true, isOptional: true },
            <any>{ name: 'getKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true },
            <any>{ name: 'block', type: 'BlockSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'SetMemberAccessorDeclarationSyntax',
        baseType: 'MemberAccessorDeclarationSyntax',
        children: [
            <any>{ name: 'publicOrPrivateKeyword', isToken: true, isOptional: true, tokenKinds: ['PublicKeyword', 'PrivateKeyword'] },
            <any>{ name: 'staticKeyword', isToken: true, isOptional: true },
            <any>{ name: 'setKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MemberVariableDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            <any>{ name: 'publicOrPrivateKeyword', isToken: true, isOptional: true, tokenKinds: ['PublicKeyword', 'PrivateKeyword'] },
            <any>{ name: 'staticKeyword', isToken: true, isOptional: true },
            <any>{ name: 'variableDeclarator', type: 'VariableDeclaratorSyntax' },
            <any>{ name: 'semicolonToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ThrowStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'throwKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'ReturnStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'returnKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'ObjectCreationExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'newKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'argumentList', type: 'ArgumentListSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'SwitchStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'switchKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'switchClauses', isList: true, elementType: 'SwitchClauseSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ]
    },
    <any>{
        name: 'SwitchClauseSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['ISwitchClauseSyntax'],
        isAbstract: true,
        children: []
    },
    <any>{
        name: 'CaseSwitchClauseSyntax',
        baseType: 'SwitchClauseSyntax',
        children: [
            <any>{ name: 'caseKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'DefaultSwitchClauseSyntax',
        baseType: 'SwitchClauseSyntax',
        children: [
            <any>{ name: 'defaultKeyword', isToken: true },
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'BreakStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'breakKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'ContinueStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'continueKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'semicolonToken', isToken: true }
        ]
    },
    <any>{
        name: 'IterationStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        isAbstract: true,
        children: []
    },
    <any>{
        name: 'BaseForStatementSyntax',
        baseType: 'IterationStatementSyntax',
        isAbstract: true,
        children: []
    },
    <any>{
        name: 'ForStatementSyntax',
        baseType: 'BaseForStatementSyntax',
        children: [
            <any>{ name: 'forKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            <any>{ name: 'initializer', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'firstSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'] },
            <any>{ name: 'condition', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'secondSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'] },
            <any>{ name: 'incrementor', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'ForInStatementSyntax',
        baseType: 'BaseForStatementSyntax',
        children: [
            <any>{ name: 'forKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            <any>{ name: 'left', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'inKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'WhileStatementSyntax',
        baseType: 'IterationStatementSyntax',
        children: [
            <any>{ name: 'whileKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'WithStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'withKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'EnumDeclarationSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, isOptional: true },
            <any>{ name: 'enumKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'variableDeclarators', isSeparatedList: true, elementType: 'VariableDeclaratorSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'CastExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'lessThanToken', isToken: true },
            <any>{ name: 'type', type: 'ITypeSyntax' },
            <any>{ name: 'greaterThanToken', isToken: true },
            <any>{ name: 'expression', type: 'IUnaryExpressionSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ObjectLiteralExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'propertyAssignments', isSeparatedList: true, elementType: 'PropertyAssignmentSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true }
        ]
    },
    <any>{
        name: 'PropertyAssignmentSyntax',
        baseType: 'SyntaxNode',
        isAbstract: true,
        children: []
    },
    <any>{
        name: 'SimplePropertyAssignmentSyntax',
        baseType: 'PropertyAssignmentSyntax',
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'AccessorPropertyAssignmentSyntax',
        baseType: 'PropertyAssignmentSyntax',
        isAbstract: true,
        children: []
    },
    <any>{
        name: 'GetAccessorPropertyAssignmentSyntax',
        baseType: 'AccessorPropertyAssignmentSyntax',
        children: [
            <any>{ name: 'getKeyword', isToken: true },
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'SetAccessorPropertyAssignmentSyntax',
        baseType: 'AccessorPropertyAssignmentSyntax',
        children: [
            <any>{ name: 'setKeyword', isToken: true },
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'parameterName', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'FunctionExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'functionKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'EmptyStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'semicolonToken', isToken: true }]
    },
    <any>{
        name: 'TryStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'tryKeyword', isToken: true },
            <any>{ name: 'block', type: 'BlockSyntax' },
            <any>{ name: 'catchClause', type: 'CatchClauseSyntax', isOptional: true },
            <any>{ name: 'finallyClause', type: 'FinallyClauseSyntax', isOptional: true }]
    },
    <any>{
        name: 'CatchClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'catchKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'FinallyClauseSyntax',
        baseType: 'SyntaxNode',
        children: [
            <any>{ name: 'finallyKeyword', isToken: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'LabeledStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'colonToken', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }]
    },
    <any>{
        name: 'DoStatementSyntax',
        baseType: 'IterationStatementSyntax',
        children: [
            <any>{ name: 'doKeyword', isToken: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' },
            <any>{ name: 'whileKeyword', isToken: true },
            <any>{ name: 'openParenToken', isToken: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true },
            <any>{ name: 'semicolonToken', isToken: true }]
    },
    <any>{
        name: 'TypeOfExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'typeOfKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' }]
    },
    <any>{
        name: 'DeleteExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'deleteKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' }]
    },
    <any>{
        name: 'VoidExpressionSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'voidKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' }]
    },
    <any>{
        name: 'DebuggerStatementSyntax',
        baseType: 'SyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'debuggerKeyword', isToken: true },
            <any>{ name: 'semicolonToken', isToken: true }]
    }];

//function endsWith(string: string, value: string): bool {
//    return string.substring(string.length - value.length, string.length) === value;
//}

function getStringWithoutSuffix(definition: string) {
    if (StringUtilities.endsWith(definition, "Syntax")) {
        return definition.substring(0, definition.length - "Syntax".length);
    }

    return definition;
}

function getNameWithoutSuffix(definition: ITypeDefinition) {
    return getStringWithoutSuffix(definition.name);
}

function getType(child: IMemberDefinition): string {
    if (child.isToken) {
        return "ISyntaxToken";
    }
    else if (child.isSeparatedList) {
        return "ISeparatedSyntaxList";
    }
    else if (child.isList) {
        return "ISyntaxList";
    }
    else {
        return child.type;
    }
}

var hasKind = false;

function pascalCase(value: string): string {
    return value.substr(0, 1).toUpperCase() + value.substr(1);
}

function camelCase(value: string): string {
    return value.substr(0, 1).toLowerCase() + value.substr(1);
}

function getSafeName(child: IMemberDefinition) {
    if (child.name === "arguments") {
        return "_" + child.name;
    }

    return child.name;
}

function getPropertyAccess(child: IMemberDefinition): string {
    if (child.type === "SyntaxKind") {
        return "this._kind";
    }

    return "this." + child.name;
}

function generateProperties(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child: IMemberDefinition = definition.children[i];

        if (getType(child) === "SyntaxKind") {
            result += "    private _" + child.name + ": " + getType(child) + ";\r\n";
        }

        hasKind = hasKind || (getType(child) === "SyntaxKind");
    }

    if (definition.children.length > 0) {
        result += "\r\n";
    }

    return result;
}

function generateNullChecks(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child: IMemberDefinition = definition.children[i];

        if (!child.isOptional && !child.isToken) {
            result += "        if (" + child.name + " === null) { throw Errors.argumentNull('" + child.name + "'); }\r\n";
        }
    }

    return result;
}

function generateIfKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string {
    var result = "";
    
    result += indent + "        if (";

    for (var j = 0; j < tokenKinds.length; j++) {
        if (j > 0) {
            result += " && ";
        }

        var tokenKind = tokenKinds[j];
        if (tokenKind === "IdentifierName") {
            result += "!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)";
        }
        else {
            result += child.name + ".tokenKind !== SyntaxKind." + tokenKind;
        }
    }

    result += ") { throw Errors.argument('" + child.name + "'); }\r\n";
    return result;
}

function generateSwitchCase(tokenKind: string, indent: string): string {
    return indent + "            case SyntaxKind." + tokenKind + ":\r\n";
}

function generateBreakStatement(indent: string): string {
    return indent + "                break;\r\n";
}

function generateSwitchCases(tokenKinds: string[], indent: string): string {
    var result = "";
    for (var j = 0; j < tokenKinds.length; j++) {
        var tokenKind = tokenKinds[j];

        result += generateSwitchCase(tokenKind, indent);
    }

    if (tokenKinds.length > 0) {
        result += generateBreakStatement(indent);
    }

    return result;
}

function generateDefaultCase(child: IMemberDefinition, indent: string): string {
    var result = "";
    
    result += indent + "            default:\r\n";
    result += indent + "                throw Errors.argument('" + child.name + "');\r\n"; 

    return result;
}

function generateSwitchKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string {
    if (tokenKinds.length === 0) {
        return "";
    }

    var result = "";

    var identifierName = ArrayUtilities.where(tokenKinds, v => v.indexOf("IdentifierName") >= 0);
    var notIdentifierName = ArrayUtilities.where(tokenKinds, v => v.indexOf("IdentifierName") < 0);

    if (identifierName.length > 0) {
        result += indent + "        if (!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)) {\r\n";
        if (notIdentifierName.length === 0) {
            result += indent + "            throw Errors.argument('" + child.name + "');\r\n"; 
            result += indent + "        }\r\n";
            return result;
        }

        indent += "    ";
    }

    if (notIdentifierName.length <= 2) {
        result += generateIfKindCheck(child, notIdentifierName, indent);
    }
    else if (notIdentifierName.length > 2) {
        result += indent + "        switch (" + child.name + ".tokenKind) {\r\n";
        result += generateSwitchCases(notIdentifierName, indent);
        result += generateDefaultCase(child, indent);
        result += indent + "        }\r\n";
    }

    if (identifierName.length > 0) {
        result += indent + "    }\r\n";
    }

    // result += indent + "        }\r\n";
    return result;
}

function tokenKinds(child: IMemberDefinition): string[] {
    return child.tokenKinds
        ? child.tokenKinds
        : [pascalCase(child.name)];
}

function generateKindCheck(child: IMemberDefinition): string {
    var indent = "";
    var result = "";
    
    if (child.isOptional) {
        indent = "    ";

        result += "        if (" + child.name + " !== null) {\r\n";
    }

    var kinds = tokenKinds(child);

    if (kinds.length <= 2) {
        result += generateIfKindCheck(child, kinds, indent);
    }
    else {
        result += generateSwitchKindCheck(child, kinds, indent);
    }

    if (child.isOptional) {
        result += "        }\r\n";
    }

    return result;
}

function generateKindChecks(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (child.isToken) {
            result += generateKindCheck(child);
        }
    }

    return result;
}

function generateArgumentChecks(definition: ITypeDefinition): string {
    var result = "";

    if (argumentChecks) {
        result += generateNullChecks(definition);
        result += generateKindChecks(definition);

        if (definition.children.length > 0) {
            result += "\r\n";
        }
    }

    return result;
}

function generateConstructor(definition: ITypeDefinition): string {
    if (definition.isAbstract) {
        // return "";
    }

    var base = baseType(definition);
    var subchildren = childrenInAllSubclasses(definition);
    var baseSubchildren = childrenInAllSubclasses(base);
    var baseSubchildrenNames = ArrayUtilities.select(baseSubchildren, c => c.name);

    var result = "";
    result += "    constructor("

    var children = definition.children;
    if (subchildren.length > 0) {
        children = subchildren;
    }

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (getType(child) !== "SyntaxKind" && !ArrayUtilities.contains(baseSubchildrenNames, child.name)) {
            result += "public ";
        }

        result += child.name + ": " + getType(child);
        result += ",\r\n                ";
    }

    result += "parsedInStrictMode: bool) {\r\n";
    
    result += "        super(";

    for (var i = 0; i < baseSubchildrenNames.length; i++) {
        result += baseSubchildrenNames[i] + ", ";
    }

    result += "parsedInStrictMode); \r\n";
    if (definition.children.length > 0) {
        result += "\r\n";
    }

    result += generateArgumentChecks(definition);

    for (var i = 0; i < definition.children.length; i++) {
        var child: IMemberDefinition = definition.children[i];

        if (child.type === "SyntaxKind") {
            result += "        " + getPropertyAccess(child) + " = " + child.name + ";\r\n";
        }
    }

    result += "    }\r\n";

    return result;
}

function isOptional(child: IMemberDefinition) {
    if (child.isOptional) {
        return true;
    }

    if (child.isList && !child.requiresAtLeastOneItem) {
        return true;
    }

    if (child.isSeparatedList && !child.requiresAtLeastOneItem) {
        return true;
    }

    return false;
}

function generateFactory1Method(definition: ITypeDefinition): string {
    var mandatoryChildren = ArrayUtilities.where(
        definition.children, c => !isOptional(c));
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }

    var result = "\r\n    public static create("

    for (var i = 0; i < mandatoryChildren.length; i++) {
        var child = mandatoryChildren[i];

        result += child.name + ": " + getType(child);

        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                         ";
        }
    }

    result += "): " + definition.name + " {\r\n";

    result += "        return new " + definition.name + "(";
    
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (!isOptional(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList";
        }
        else {
            result += "null";
        }

        result += ", ";
    }

    result += "/*parsedInStrictMode:*/ false);\r\n";
    result += "    }\r\n";

    return result;
}

function isKeywordOrPunctuation(kind: string): bool {
    if (StringUtilities.endsWith(kind, "Keyword")) {
        return true;
    }
    
    if (StringUtilities.endsWith(kind, "Token") && 
        kind !== "IdentifierName" &&
        kind !== "EndOfFileToken") {
        return true;
    }

    return false;
}

function isDefaultConstructable(definition: ITypeDefinition): bool {
    if (definition === null || definition.isAbstract) {
        return false;
    }

    for (var i = 0; i < definition.children.length; i++) {
        if (isMandatory(definition.children[i])) {
            // If any child is mandatory, then the type is not default constructable.
            return false;
        }
    }

    // We can default construct this.
    return true;
}

function isMandatory(child: IMemberDefinition): bool {
    // If it's optional then it's not mandatory.
    if (isOptional(child)) {
        return false;
    }

    // Kinds are always mandatory.  As are non-optional lists.
    if (child.type === "SyntaxKind" || child.isList || child.isSeparatedList) {
        return true;
    }

    // We have a non optional node or token.  Tokens are mandatory if they're not keywords or
    // punctuation.
    if (child.isToken) {
        var kinds = tokenKinds(child);
        var isFixed = kinds.length === 1 && isKeywordOrPunctuation(kinds[0]);

        return !isFixed;
    }

    // It's a node.  It's mandatory if we can't default construct it.
    return !isDefaultConstructable(memberDefinitionType(child));
}

function generateFactory2Method(definition: ITypeDefinition): string {
    var mandatoryChildren: IMemberDefinition[] = ArrayUtilities.where(definition.children, isMandatory);
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }

    var result = "\r\n    public static create1("

    for (var i = 0; i < mandatoryChildren.length; i++) {
        var child = mandatoryChildren[i];

        result += child.name + ": " + getType(child);

        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                          ";
        }
    }

    result += "): " + definition.name + " {\r\n";

     result += "        return new " + definition.name + "(";
    
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (isMandatory(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList";
        }
        else if (isOptional(child)) {
            result += "null";
        }
        else if (child.isToken) {
            result += "Syntax.token(SyntaxKind." + tokenKinds(child)[0] + ")";
        }
        else {
            result += child.type + ".create1()";
        }

        result += ", ";
    }

    result += "/*parsedInStrictMode:*/ false);\r\n";
    result += "    }\r\n";

    return result;
}

function generateFactoryMethod(definition: ITypeDefinition): string {
    return generateFactory1Method(definition) + generateFactory2Method(definition);
}

function generateAcceptMethods(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {
        result += "\r\n";
        result += "    public accept(visitor: ISyntaxVisitor): any {\r\n";
        result += "        return visitor.visit" + getNameWithoutSuffix(definition) + "(this);\r\n";
        result += "    }\r\n";
    }

    return result;
}

function generateIsMethod(definition: ITypeDefinition): string {
    var result = "";

    //if (definition.isAbstract) {
    //    result += "\r\n";
    //    result += "    private is" + getNameWithoutSuffix(definition) + "(): bool {\r\n";
    //    result += "        return true;\r\n";
    //    result += "    }\r\n";
    //}

    if (definition.interfaces) {
        var ifaces = definition.interfaces.slice(0);
        for (var i = 0; i < ifaces.length; i++) {
            var current = ifaces[i];

            while (current !== undefined) {
                if (!ArrayUtilities.contains(ifaces, current)) {
                    ifaces.push(current);
                }

                current = interfaces[current];
            }
        }

        for (var i = 0; i < ifaces.length; i++) {
            var type = ifaces[i];
            type = getStringWithoutSuffix(type);
            if (isInterface(type)) {
                type = type.substr(1);
            }

            result += "\r\n";
            result += "    private is" + type + "(): bool {\r\n";
            result += "        return true;\r\n";
            result += "    }\r\n";
        }
    }

    return result;
}

function generateKindMethod(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {
        if (!hasKind) {
            result += "\r\n";
            result += "    public kind(): SyntaxKind {\r\n";
            result += "        return SyntaxKind." + getNameWithoutSuffix(definition) + ";\r\n";
            result += "    }\r\n";
        }
    }

    return result;
}

function generateSlotMethods(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {
        result += "\r\n";
        result += "    private childCount(): number {\r\n";
        var slotCount = hasKind ? (definition.children.length - 1) : definition.children.length;

        result += "        return " + slotCount + ";\r\n";
        result += "    }\r\n\r\n";

        result += "    private childAt(slot: number): ISyntaxElement {\r\n";

        if (slotCount === 0) {
            result += "        throw Errors.invalidOperation();\r\n";
        }
        else {
            result += "        switch (slot) {\r\n";

            var index = 0;
            for (var i = 0; i < definition.children.length; i++) {
                var child = definition.children[i];
                if (child.type === "SyntaxKind") {
                    continue;
                }

                result += "            case " + index + ": return this." + definition.children[i].name + ";\r\n";
                index++;
            }

            result += "            default: throw Errors.invalidOperation();\r\n";
            result += "        }\r\n";
        }

        result += "    }\r\n";
    }

    return result;
}

function generateFirstTokenMethod(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {

        result += "\r\n";
        result += "    public firstToken(): ISyntaxToken {\r\n";
        result += "        var token = null;\r\n";

        for (var i = 0; i < definition.children.length; i++) {
            var child: IMemberDefinition = definition.children[i];

            if (getType(child) === "SyntaxKind") {
                continue;
            }

            if (child.name === "endOfFileToken") {
                continue;
            }

            result += "        if (";

            if (child.isOptional) {
                result += getPropertyAccess(child) + " !== null && ";
            }

            if (child.isToken) {
                result += getPropertyAccess(child) + ".width() > 0";
                result += ") { return " + getPropertyAccess(child) + "; }\r\n";
            }
            else {
                result += "(token = " + getPropertyAccess(child) + ".firstToken()) !== null";
                result += ") { return token; }\r\n";
            }
        }

        if (definition.name === "SourceUnitSyntax") {
            result += "        return this._endOfFileToken;\r\n";
        }
        else {
            result += "        return null;\r\n";
        }

        result += "    }\r\n";
    }

    return result;
}

function generateLastTokenMethod(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {

        result += "\r\n";
        result += "    public lastToken(): ISyntaxToken {\r\n";
        
        if (definition.name === "SourceUnitSyntax") {
            result += "        return this._endOfFileToken;\r\n";
        }
        else {
            result += "        var token = null;\r\n";

            for (var i = definition.children.length - 1; i >= 0; i--) {
                var child: IMemberDefinition = definition.children[i];

                if (getType(child) === "SyntaxKind") {
                    continue;
                }

                if (child.name === "endOfFileToken") {
                    continue;
                }

                result += "        if (";

                if (child.isOptional) {
                    result += getPropertyAccess(child) + " !== null && ";
                }

                if (child.isToken) {
                    result += getPropertyAccess(child) + ".width() > 0";
                    result += ") { return " + getPropertyAccess(child) + "; }\r\n";
                }
                else {
                    result += "(token = " + getPropertyAccess(child) + ".lastToken()) !== null";
                    result += ") { return token; }\r\n";
                }
            }

            result += "        return null;\r\n";
        }

        result += "    }\r\n";
    }

    return result;
}

function generateInsertChildrenIntoMethod(definition: ITypeDefinition): string {
    var result = "";

    if (!definition.isAbstract) {

        result += "\r\n";
        result += "    public insertChildrenInto(array: ISyntaxElement[], index: number) {\r\n";

        for (var i = definition.children.length - 1; i >= 0; i--) {
            var child = definition.children[i];

            if (child.type === "SyntaxKind") {
                continue;
            }

            if (child.isList || child.isSeparatedList) {
                result += "        " + getPropertyAccess(child) + ".insertChildrenInto(array, index);\r\n";
            }
            else if (child.isOptional) {
                result += "        if (" + getPropertyAccess(child) + " !== null) { array.splice(index, 0, " + getPropertyAccess(child) + "); }\r\n";
            }
            else {
                result += "        array.splice(index, 0, " + getPropertyAccess(child) + ");\r\n";
            }
        }

        result += "    }\r\n";
    }

    return result;
}

function baseType(definition: ITypeDefinition): ITypeDefinition {
    return ArrayUtilities.firstOrDefault(definitions, d => d.name === definition.baseType);
}

function memberDefinitionType(child: IMemberDefinition): ITypeDefinition {
    // Debug.assert(child.type !== undefined);
    return ArrayUtilities.firstOrDefault(definitions, d => d.name === child.type);
}

function derivesFrom(def1: ITypeDefinition, def2: ITypeDefinition): bool {
    var current = def1;
    while (current !== null) {
        var base = baseType(current);
        if (base === def2) {
            return true;
        }

        current = base;
    }

    return false;
}

function contains(definition: ITypeDefinition, child: IMemberDefinition) {
    return ArrayUtilities.any(definition.children,
        c => c.name === child.name &&
             c.isList === child.isList &&
             c.isSeparatedList === child.isSeparatedList &&
             c.isToken === child.isToken &&
             c.type === child.type);
}

function childrenInAllSubclasses(definition: ITypeDefinition): IMemberDefinition[]{
    var result = [];

    if (definition !== null && definition.isAbstract) {
        var subclasses = ArrayUtilities.where(definitions, d => !d.isAbstract && derivesFrom(d, definition));

        if (subclasses.length > 0) {
            var firstSubclass = subclasses[0];

            for (var i = 0; i < firstSubclass.children.length; i++) {
                var child = firstSubclass.children[i];

                if (ArrayUtilities.all(subclasses, s => contains(s, child))) {
                    result.push(child);
                }
            }
        }
    }

    return result;
}

function generateAccessors(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        
        if (child.type === "SyntaxKind") {
            result += "\r\n";
            result += "    public " + child.name + "(): " + getType(child) + " {\r\n";
            result += "        return " + getPropertyAccess(child) + ";\r\n";
            result += "    }\r\n";
        }
    }

    return result;
}

function generateWithMethod(definition: ITypeDefinition, child: IMemberDefinition): string {
    var result = "";
    result += "\r\n";
    result += "    public with" + pascalCase(child.name) + "(" + getSafeName(child) + ": " + getType(child) + "): " + definition.name + " {\r\n";
    result += "        return this.update("

    for (var i = 0; i < definition.children.length; i++) {
        if (i > 0) {
            result += ", ";
        }

        if (definition.children[i] === child) {
            result += getSafeName(child);
        }
        else {
            result += getPropertyAccess(definition.children[i]);
        }
    }

    result += ");\r\n";
    result += "    }\r\n";

    if (child.isList || child.isSeparatedList) {
        if (StringUtilities.endsWith(child.name, "s")) {
            var pascalName = pascalCase(child.name);
            pascalName = pascalName.substring(0, pascalName.length - 1);

            var argName = getSafeName(child);
            argName = argName.substring(0, argName.length - 1)

            result += "\r\n";
            result += "    public with" + pascalName + "(" + argName + ": " + child.elementType + "): " + definition.name + " {\r\n";
            result += "        return this.with" + pascalCase(child.name) + "("

            if (child.isList) {
                result += "Syntax.list([" + argName + "])";
            }
            else {
                result += "Syntax.separatedList([" + argName + "])";
            }

            result += ");\r\n";
            result += "    }\r\n";
        }
    }

    return result;
}

function generateWithMethods(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child: IMemberDefinition = definition.children[i];
        result += generateWithMethod(definition, child);
    }

    return result;
}

function generateTriviaMethods(definition: ITypeDefinition): string {
    var result = "\r\n";
    result += "    public withLeadingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "        return <" + definition.name + ">super.withLeadingTrivia(trivia);\r\n";
    result += "    }\r\n\r\n";
    result += "    public withTrailingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "        return <" + definition.name + ">super.withTrailingTrivia(trivia);\r\n";
    result += "    }\r\n";

    return result;
}

function generateUpdateMethod(definition: ITypeDefinition): string {
    if (definition.isAbstract) {
        return "";
    }

    var result = "";

    result += "\r\n";
    
    // Don't need an public update method if there's only 1 child.  In that case, just call the
    // 'withXXX' method.
    //if (definition.children.length <= 1) {
    //    result += "    private ";
    //}
    //else {
        result += "    public ";
    //}
    
    result += "update("

    for (var i = 0; i < definition.children.length; i++) {
        var child: IMemberDefinition = definition.children[i];

        result += getSafeName(child) + ": " + getType(child);

        if (i < definition.children.length - 1) {
            result += ",\r\n                  ";
        }
    }

    result += "): " + definition.name + " {\r\n";

    if (definition.children.length === 0) {
        result += "        return this;\r\n";
    }
    else {
        result += "        if (";

        for (var i = 0; i < definition.children.length; i++) {
            var child: IMemberDefinition = definition.children[i];

            if (i !== 0) {
                result += " && ";
            }

            result += getPropertyAccess(child) + " === " + getSafeName(child);
        }

        result += ") {\r\n";
        result += "            return this;\r\n";
        result += "        }\r\n\r\n";

        result += "        return new " + definition.name + "(";

        for (var i = 0; i < definition.children.length; i++) {
            var child: IMemberDefinition = definition.children[i];

            result += getSafeName(child);
            result += ", ";
        }

        result += "/*parsedInStrictMode:*/ this.parsedInStrictMode());\r\n";
    }

    result += "    }\r\n";

    return result;
}

function generateIsTypeScriptSpecificMethod(definition: ITypeDefinition): string {
    var result = "\r\n    private isTypeScriptSpecific(): bool {\r\n";

    if (definition.isTypeScriptSpecific) {
        result += "        return true;\r\n";
    }
    else {
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];

            if (child.type === "SyntaxKind") {
                continue;
            }

            if (child.isTypeScriptSpecific) {
                result += "        if (" + getPropertyAccess(child) + " !== null) { return true; }\r\n";
                continue;
            }

            if (child.isToken) {
                continue;
            }
            
            if (child.isOptional) {
                result += "        if (" + getPropertyAccess(child) + " !== null && " + getPropertyAccess(child) + ".isTypeScriptSpecific()) { return true; }\r\n";
            }
            else {
                result += "        if (" + getPropertyAccess(child) + ".isTypeScriptSpecific()) { return true; }\r\n";
            }
        }

        result += "        return false;\r\n";
    }

    result += "    }\r\n";

    return result;
}

function couldBeRegularExpressionToken(child: IMemberDefinition): bool {
    var kinds = tokenKinds(child);
    return ArrayUtilities.contains(kinds, "SlashToken") ||
           ArrayUtilities.contains(kinds, "SlashEqualsToken") ||
           ArrayUtilities.contains(kinds, "RegularExpressionLiteral");
}

function generateComputeDataMethod(definition: ITypeDefinition): string {
    if (definition.isAbstract) {
        return "";
    }

    var result = "\r\n    private computeData(): number {\r\n";
    result += "        var fullWidth = 0;\r\n";
    result += "        var childWidth = 0;\r\n";
    result += "        var hasSkippedText = false;\r\n";

    // If we have no children (like an OmmittedExpressionSyntax), we automatically have a zero 
    // width token.
    result += "        var hasZeroWidthToken = " + (definition.children.length === 0) + ";\r\n";

    result += "        var hasRegularExpressionToken = false;\r\n";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (child.type === "SyntaxKind") {
            continue;
        }

        var indent = "";
        if (child.isOptional) {
            result += "\r\n        if (" + getPropertyAccess(child) + " !== null) {\r\n";
            indent = "    ";
        }
        else {
            result += "\r\n";
        }

        result += indent + "        childWidth = " + getPropertyAccess(child) + ".fullWidth();\r\n";
        result += indent + "        fullWidth += childWidth;\r\n";

        result += indent + "        hasSkippedText = hasSkippedText || " + getPropertyAccess(child) + ".hasSkippedText();\r\n";

        if (child.isToken) {
            result += indent + "        hasZeroWidthToken = hasZeroWidthToken || (childWidth === 0);\r\n";

            if (couldBeRegularExpressionToken(child)) {
                result += indent + "        hasRegularExpressionToken = hasRegularExpressionToken || SyntaxFacts.isAnyDivideOrRegularExpressionToken(" + getPropertyAccess(child) + ".tokenKind);\r\n";
            }
        }
        else {
            result += indent + "        hasZeroWidthToken = hasZeroWidthToken || " + getPropertyAccess(child) + ".hasZeroWidthToken();\r\n";
            result += indent + "        hasRegularExpressionToken = hasRegularExpressionToken || " + getPropertyAccess(child) + ".hasRegularExpressionToken();\r\n";
        }

        if (child.isOptional) {
            result += "        }\r\n";
        }
    }

    result += "\r\n        return (fullWidth << Constants.NodeFullWidthShift)";
    result += "\r\n             | (hasSkippedText ? Constants.NodeSkippedTextMask : 0)";
    result += "\r\n             | (hasZeroWidthToken ? Constants.NodeZeroWidthTokenMask : 0)";
    result += "\r\n             | (hasRegularExpressionToken ? Constants.NodeRegularExpressionTokenMask : 0);\r\n";

    result += "    }\r\n";

    return result;
}

function generateStructuralEqualsMethod(definition: ITypeDefinition): string {
    if (definition.isAbstract) {
        return "";
    }

    var result = "\r\n    private structuralEquals(node: SyntaxNode): bool {\r\n";
    result += "        if (this === node) { return true; }\r\n";
    result += "        if (node === null) { return false; }\r\n";
    result += "        if (this.kind() !== node.kind()) { return false; }\r\n";
    result += "        var other = <" + definition.name + ">node;\r\n";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (child.type !== "SyntaxKind") {
            if (child.isList) {
                result += "        if (!Syntax.listStructuralEquals(" + getPropertyAccess(child) + ", other._" + child.name + ")) { return false; }\r\n";
            }
            else if (child.isSeparatedList) {
                result += "        if (!Syntax.separatedListStructuralEquals(" + getPropertyAccess(child) + ", other._" + child.name + ")) { return false; }\r\n";
            }
            else if (child.isToken) {
                result += "        if (!Syntax.tokenStructuralEquals(" + getPropertyAccess(child) + ", other._" + child.name + ")) { return false; }\r\n";
            }
            else if (isNodeOrToken(child)) {
                result += "        if (!Syntax.nodeOrTokenStructuralEquals(" + getPropertyAccess(child) + ", other._" + child.name + ")) { return false; }\r\n";
            }
            else {
                result += "        if (!Syntax.nodeStructuralEquals(" + getPropertyAccess(child) + ", other._" + child.name + ")) { return false; }\r\n";
            }
        }
    }

    result += "        return true;\r\n";
    result += "    }\r\n";
    return result;
}

function generateNode(definition: ITypeDefinition): string {
    var result = "class " + definition.name + " extends " + definition.baseType 

    if (definition.interfaces) {
        result += " implements " + definition.interfaces.join(", ");
    }

    result += " {\r\n";
    hasKind = false;

    result += generateProperties(definition);
    result += generateConstructor(definition);
    result += generateAcceptMethods(definition);
    result += generateKindMethod(definition);
    result += generateSlotMethods(definition);
    result += generateIsMethod(definition);
    result += generateAccessors(definition);
    result += generateUpdateMethod(definition);

    if (!forPrettyPrinter) {
        result += generateFactoryMethod(definition);
        result += generateTriviaMethods(definition);
        result += generateWithMethods(definition);
        result += generateIsTypeScriptSpecificMethod(definition);
    }

    // result += generateIsMissingMethod(definition);
    // result += generateFirstTokenMethod(definition);
    // result += generateLastTokenMethod(definition);
    // result += generateInsertChildrenIntoMethod(definition);
    // result += generateCollectTextElementsMethod(definition);
    // result += generateComputeDataMethod(definition);
    // result += generateFindTokenInternalMethod(definition);
    // result += generateStructuralEqualsMethod(definition);

    result += "}";

    return result;
}

function generateNodes(): string {
    var result = "///<reference path='SyntaxNode.ts' />\r\n";
    result += "///<reference path='ISyntaxList.ts' />\r\n"
    result += "///<reference path='ISeparatedSyntaxList.ts' />\r\n"
    result += "///<reference path='SeparatedSyntaxList.ts' />\r\n"
    result += "///<reference path='SyntaxList.ts' />\r\n"
    result += "///<reference path='SyntaxToken.ts' />\r\n"
    result += "///<reference path='Syntax.ts' />"

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        result += "\r\n\r\n";
        result += generateNode(definition);
    }

    return result;
}

function isInterface(name: string) {
    return name.substr(0, 1) === "I" && name.substr(1, 1).toUpperCase() === name.substr(1, 1)
}

function isNodeOrToken(child: IMemberDefinition) {
    // IWhatever.
    return child.type && isInterface(child.type);
}

function generateRewriter(): string {
    var result = "///<reference path='SyntaxVisitor.generated.ts' />\r\n";
    result = "";
    result += "///<reference path='ISyntaxNodeOrToken.ts' />\r\n";

    result +=
"\r\nclass SyntaxRewriter implements ISyntaxVisitor {\r\n" +
"    public visitToken(token: ISyntaxToken): ISyntaxToken {\r\n" +
"        return token;\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitNode(node: SyntaxNode): SyntaxNode {\r\n" +
"        return node.accept(this);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitNodeOrToken(node: ISyntaxNodeOrToken): ISyntaxNodeOrToken {\r\n" +
"        return node.isToken() ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>node) : this.visitNode(<SyntaxNode>node);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitList(list: ISyntaxList): ISyntaxList {\r\n" +
"        var newItems: ISyntaxNodeOrToken[] = null;\r\n" +
"\r\n" +
"        for (var i = 0, n = list.childCount(); i < n; i++) {\r\n" +
"            var item = list.childAt(i);\r\n" +
"            var newItem = this.visitNodeOrToken(item);\r\n" +
"\r\n" +
"            if (item !== newItem && newItems === null) {\r\n" +
"                newItems = [];\r\n" +
"                for (var j = 0; j < i; j++) {\r\n" +
"                    newItems.push(list.childAt(j));\r\n" +
"                }\r\n" +
"            }\r\n" +
"\r\n" +
"            if (newItems) {\r\n" +
"                newItems.push(newItem);\r\n" +
"            }\r\n" +
"        }\r\n" +
"\r\n" +
"        // Debug.assert(newItems === null || newItems.length === list.childCount());\r\n" +
"        return newItems === null ? list : Syntax.list(newItems);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitSeparatedList(list: ISeparatedSyntaxList): ISeparatedSyntaxList {\r\n" +
"        var newItems: ISyntaxNodeOrToken[] = null;\r\n" +
"\r\n" +
"        for (var i = 0, n = list.childCount(); i < n; i++) {\r\n" +
"            var item = list.childAt(i);\r\n" +
"            var newItem = item.isToken() ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>item) : this.visitNode(<SyntaxNode>item);\r\n" +
"\r\n" +
"            if (item !== newItem && newItems === null) {\r\n" +
"                newItems = [];\r\n" +
"                for (var j = 0; j < i; j++) {\r\n" +
"                    newItems.push(list.childAt(j));\r\n" +
"                }\r\n" +
"            }\r\n" +
"\r\n" +
"            if (newItems) {\r\n" +
"                newItems.push(newItem);\r\n" +
"            }\r\n" +
"        }\r\n" +
"\r\n" +
"        // Debug.assert(newItems === null || newItems.length === list.childCount());\r\n" +
"        return newItems === null ? list : Syntax.separatedList(newItems);\r\n" +
"    }\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isAbstract) { continue; }

        result += "\r\n";
        result += "    public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";

        if (definition.children.length === 0) {
            result += "        return node;\r\n"
            result += "    }\r\n";
            continue;
        }

        //if (definition.children.length === 1) {
        //    result += "        return node.with" + pascalCase(definition.children[0].name) + "(\r\n";
        //}
        //else {
            result += "        return node.update(\r\n";
        //}

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];

            result += "            ";
            if (child.isOptional) {
                result += "node." + child.name + " === null ? null : ";
            }

            if (child.isToken) {
                result += "this.visitToken(node." + child.name + ")";
            }
            else if (child.isList) {
                result += "this.visitList(node." + child.name + ")";
            }
            else if (child.isSeparatedList) {
                result += "this.visitSeparatedList(node." + child.name + ")";
            }
            else if (child.type === "SyntaxKind") {
                result += "node.kind()";
            }
            else if (isNodeOrToken(child)) {
                result += "<" + child.type + ">this.visitNodeOrToken(node." + child.name + ")";
            }
            else {
                result += "<" + child.type + ">this.visitNode(node." + child.name + ")";
            }

            if (j < definition.children.length - 1) {
                result += ",\r\n";
            }
        }

        result += ");\r\n";
        result += "    }\r\n";
    }

    result += "}";
    return result;
}

function generateToken(isFixedWidth: bool, leading: bool, trailing: bool): string {
    var isVariableWidth = !isFixedWidth;
    var hasAnyTrivia = leading || trailing;

    var result = "    export class ";

    var needsSourcetext = hasAnyTrivia || isVariableWidth;

    var className = isFixedWidth ? "FixedWidthToken" : "VariableWidthToken";
    className += leading && trailing ? "WithLeadingAndTrailingTrivia" :
             leading && !trailing ? "WithLeadingTrivia" :
             !leading && trailing ? "WithTrailingTrivia" : "WithNoTrivia";

    result += className;

    result += " implements ISyntaxToken {\r\n";

    if (needsSourcetext) {
        result += "        private _sourceText: ISimpleText;\r\n";
        result += "        private _fullStart: number;\r\n";
    }

    result += "        public tokenKind: SyntaxKind;\r\n";
    // result += "        public tokenKeywordKind: SyntaxKind;\r\n";

    if (leading) {
        result += "        private _leadingTriviaInfo: number;\r\n";
    }

    if (isVariableWidth) {
        result += "        private _textOrWidth: any;\r\n";
        result += "        private _value: any = null;\r\n";
    }

    if (trailing) {
        result += "        private _trailingTriviaInfo: number;\r\n";
    }

    result += "\r\n";

    if (needsSourcetext) {
        result += "        constructor(sourceText: ISimpleText, fullStart: number,";
    }
    else {
        result += "        constructor(";
    }

    result += "kind: SyntaxKind";

    if (leading) {
        result += ", leadingTriviaInfo: number";
    }

    if (isVariableWidth) {
        result += ", textOrWidth: any";
    }

    if (trailing) {
        result += ", trailingTriviaInfo: number";
    }

    result += ") {\r\n";

    if (needsSourcetext) {
        result += "            this._sourceText = sourceText;\r\n";
        result += "            this._fullStart = fullStart;\r\n";
    }

    result += "            this.tokenKind = kind;\r\n";

    if (leading) {
        result += "            this._leadingTriviaInfo = leadingTriviaInfo;\r\n";
    }

    if (isVariableWidth) {
        result += "            this._textOrWidth = textOrWidth;\r\n";
    }

    if (trailing) {
        result += "            this._trailingTriviaInfo = trailingTriviaInfo;\r\n";
    }

    result += "        }\r\n\r\n";

    result += "        public clone(): ISyntaxToken {\r\n";
    result += "            return new " + className + "(\r\n";

    if (needsSourcetext) {
        result += "                this._sourceText,\r\n";
        result += "                this._fullStart,\r\n";
    }

    //if (isKeyword) {
    //    result += "                this.tokenKeywordKind";
    //}
    //else {
    //    result += "                this.tokenKind";
    //}
    result += "                this.tokenKind";

    if (leading) {
        result += ",\r\n                this._leadingTriviaInfo";
    }

    if (isVariableWidth) {
        result += ",\r\n                this._textOrWidth";
    }

    if (trailing) {
        result += ",\r\n                this._trailingTriviaInfo";
    }

    result += ");\r\n";
    result += "        }\r\n\r\n";

    result +=
"        public isNode(): bool { return false; }\r\n" +
"        public isToken(): bool { return true; }\r\n" +
"        public isList(): bool { return false; }\r\n" +
"        public isSeparatedList(): bool { return false; }\r\n\r\n";

    result += "        public kind(): SyntaxKind { return this.tokenKind; }\r\n\r\n";

    result += "        public childCount(): number { return 0; }\r\n";
    result += "        public childAt(index: number): ISyntaxElement { throw Errors.argumentOutOfRange('index'); }\r\n\r\n";

    var leadingTriviaWidth = leading ? "getTriviaWidth(this._leadingTriviaInfo)" : "0";
    var trailingTriviaWidth = trailing ? "getTriviaWidth(this._trailingTriviaInfo)" : "0";

    if (leading && trailing) {
        result += "        public fullWidth(): number { return " + leadingTriviaWidth + " + this.width() + " + trailingTriviaWidth + "; }\r\n";
    }
    else if (leading) {
        result += "        public fullWidth(): number { return " + leadingTriviaWidth + " + this.width(); }\r\n";
    }
    else if (trailing) {
        result += "        public fullWidth(): number { return this.width() + " + trailingTriviaWidth + "; }\r\n";
    }
    else {
        result += "        public fullWidth(): number { return this.width(); }\r\n";
    }

    if (needsSourcetext) {
        if (leading) {
            result += "        private start(): number { return this._fullStart + " + leadingTriviaWidth + "; }\r\n";
        }
        else {
            result += "        private start(): number { return this._fullStart; }\r\n";
        }

        result += "        private end(): number { return this.start() + this.width(); }\r\n\r\n";
    }

    if (isFixedWidth) {
        result += "        public width(): number { return this.text().length; }\r\n";
    }
    else {
        result += "        public width(): number { return typeof this._textOrWidth === 'number' ? this._textOrWidth : this._textOrWidth.length; }\r\n";
    }

    if (isFixedWidth) {
        result += "        public text(): string { return SyntaxFacts.getText(this.tokenKind); }\r\n";
    }
    else {
        result += "\r\n";
        result += "        public text(): string {\r\n";
        result += "            if (typeof this._textOrWidth === 'number') {\r\n";
        result += "                this._textOrWidth = this._sourceText.substr(\r\n";
        result += "                    this.start(), this._textOrWidth, /*intern:*/ this.tokenKind === SyntaxKind.IdentifierName);\r\n";
        result += "            }\r\n";
        result += "\r\n";
        result += "            return this._textOrWidth;\r\n";
        result += "        }\r\n\r\n";
    }

    if (needsSourcetext) {
        result += "        public fullText(): string { return this._sourceText.substr(this._fullStart, this.fullWidth(), /*intern:*/ false); }\r\n\r\n";
    }
    else {
        result += "        public fullText(): string { return this.text(); }\r\n\r\n";
    }

    if (isFixedWidth) {
        result += "        public value(): any { return null; }\r\n";
        //result += "        public value(): any { return this._keywordKind === SyntaxKind.TrueKeyword  ? true  :\r\n";
        //result += "                                     this._keywordKind === SyntaxKind.FalseKeyword ? false : null; }\r\n";
    }
    else {
        result += "        public value(): any { return this._value || (this._value = value(this)); }\r\n";
    }

    result += "        public hasLeadingTrivia(): bool { return " + (leading ? "true" : "false") + "; }\r\n";
    result += "        public hasLeadingComment(): bool { return " + (leading ? "hasTriviaComment(this._leadingTriviaInfo)" : "false") + "; }\r\n";
    result += "        public hasLeadingNewLine(): bool { return " + (leading ? "hasTriviaNewLine(this._leadingTriviaInfo)" : "false") + "; }\r\n";
    result += "        public hasLeadingSkippedText(): bool { return false; }\r\n";
    result += "        public leadingTriviaWidth(): number { return " + (leading ? "getTriviaWidth(this._leadingTriviaInfo)" : "0") + "; }\r\n";
    result += "        public leadingTrivia(): ISyntaxTriviaList { return " + (leading
        ? "Scanner.scanTrivia(this._sourceText, this._fullStart, getTriviaWidth(this._leadingTriviaInfo), /*isTrailing:*/ false)"
        : "Syntax.emptyTriviaList") + "; }\r\n\r\n";

    result += "        public hasTrailingTrivia(): bool { return " + (trailing ? "true" : "false") + "; }\r\n";
    result += "        public hasTrailingComment(): bool { return " + (trailing ? "hasTriviaComment(this._trailingTriviaInfo)" : "false") + "; }\r\n";
    result += "        public hasTrailingNewLine(): bool { return " + (trailing ? "hasTriviaNewLine(this._trailingTriviaInfo)" : "false") + "; }\r\n";
    result += "        public hasTrailingSkippedText(): bool { return false; }\r\n";
    result += "        public trailingTriviaWidth(): number { return " + (trailing ? "getTriviaWidth(this._trailingTriviaInfo)" : "0") + "; }\r\n";
    result += "        public trailingTrivia(): ISyntaxTriviaList { return " + (trailing
        ? "Scanner.scanTrivia(this._sourceText, this.end(), getTriviaWidth(this._trailingTriviaInfo), /*isTrailing:*/ true)"
        : "Syntax.emptyTriviaList") + "; }\r\n\r\n";
    result += "        public hasSkippedText(): bool { return false; }\r\n";

    result +=
"        public toJSON(key) { return tokenToJSON(this); }\r\n" +
"        private firstToken() { return this; }\r\n" +
"        private lastToken() { return this; }\r\n" +
"        private isTypeScriptSpecific() { return false; }\r\n" +
"        private hasZeroWidthToken() { return this.fullWidth() === 0; }\r\n" +
"        private accept(visitor: ISyntaxVisitor): any { return visitor.visitToken(this); }\r\n" +
"        private hasRegularExpressionToken() { return SyntaxFacts.isAnyDivideOrRegularExpressionToken(this.tokenKind); }\r\n" +
"        private realize(): ISyntaxToken { return realize(this); }\r\n" +
"        private collectTextElements(elements: string[]): void { collectTokenTextElements(this, elements); }\r\n\r\n";

    result +=
"        private findTokenInternal(parent: PositionedElement, position: number, fullStart: number): PositionedToken {\r\n" +
"            return new PositionedToken(parent, this, fullStart);\r\n" +
"        }\r\n\r\n";

    result += 
"        public withLeadingTrivia(leadingTrivia: ISyntaxTriviaList): ISyntaxToken {\r\n" +
"            return this.realize().withLeadingTrivia(leadingTrivia);\r\n" +
"        }\r\n" +
"\r\n" +
"        public withTrailingTrivia(trailingTrivia: ISyntaxTriviaList): ISyntaxToken {\r\n" +
"            return this.realize().withTrailingTrivia(trailingTrivia);\r\n" +
"        }\r\n"


    result += "    }\r\n";

    return result;
}

function generateTokens(): string {
    var result = 
        "///<reference path='ISyntaxToken.ts' />\r\n" +
        "///<reference path='..\\Text\\IText.ts' />\r\n" +
        "///<reference path='SyntaxToken.ts' />\r\n" +
        "\r\n" +
        "module Syntax {\r\n";

    result += generateToken(/*isFixedWidth:*/ false, /*leading:*/ false, /*trailing:*/ false);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ false, /*leading:*/ true, /*trailing:*/ false);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ false, /*leading:*/ false, /*trailing:*/ true);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ false, /*leading:*/ true, /*trailing:*/ true);
    result += "\r\n";

    result += generateToken(/*isFixedWidth:*/ true, /*leading:*/ false, /*trailing:*/ false);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ true, /*leading:*/ true, /*trailing:*/ false);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ true, /*leading:*/ false, /*trailing:*/ true);
    result += "\r\n";
    result += generateToken(/*isFixedWidth:*/ true, /*leading:*/ true, /*trailing:*/ true);
    result += "\r\n";

    result += 
"    function collectTokenTextElements(token: ISyntaxToken, elements: string[]): void {\r\n" +
"        token.leadingTrivia().collectTextElements(elements);\r\n" +
"        elements.push(token.text());\r\n" +
"        token.trailingTrivia().collectTextElements(elements);\r\n" +
"    }\r\n" +
"\r\n" +
"    export function fixedWidthToken(sourceText: ISimpleText, fullStart: number,\r\n" +
"        kind: SyntaxKind,\r\n" +
"        leadingTriviaInfo: number,\r\n" +
"        trailingTriviaInfo: number): ISyntaxToken {\r\n" +
"\r\n" +
"        if (leadingTriviaInfo === 0) {\r\n" +
"            if (trailingTriviaInfo === 0) {\r\n" +
"                return new FixedWidthTokenWithNoTrivia(kind);\r\n" +
"            }\r\n" +
"            else {\r\n" +
"                return new FixedWidthTokenWithTrailingTrivia(sourceText, fullStart, kind, trailingTriviaInfo);\r\n" +
"            }\r\n" +
"        }\r\n" +
"        else if (trailingTriviaInfo === 0) {\r\n" +
"            return new FixedWidthTokenWithLeadingTrivia(sourceText, fullStart, kind, leadingTriviaInfo);\r\n" +
"        }\r\n" +
"        else {\r\n" +
"            return new FixedWidthTokenWithLeadingAndTrailingTrivia(sourceText, fullStart, kind, leadingTriviaInfo, trailingTriviaInfo);\r\n" +
"        }\r\n" +
"    }\r\n" +
"\r\n" +
"    export function variableWidthToken(sourceText: ISimpleText, fullStart: number,\r\n" +
"        kind: SyntaxKind,\r\n" +
"        leadingTriviaInfo: number,\r\n" +
"        width: number,\r\n" +
"        trailingTriviaInfo: number): ISyntaxToken {\r\n" +
"\r\n" +
"        if (leadingTriviaInfo === 0) {\r\n" +
"            if (trailingTriviaInfo === 0) {\r\n" +
"                return new VariableWidthTokenWithNoTrivia(sourceText, fullStart, kind, width);\r\n" +
"            }\r\n" +
"            else {\r\n" +
"                return new VariableWidthTokenWithTrailingTrivia(sourceText, fullStart, kind, width, trailingTriviaInfo);\r\n" +
"            }\r\n" +
"        }\r\n" +
"        else if (trailingTriviaInfo === 0) {\r\n" +
"            return new VariableWidthTokenWithLeadingTrivia(sourceText, fullStart, kind, leadingTriviaInfo, width);\r\n" +
"        }\r\n" +
"        else {\r\n" +
"            return new VariableWidthTokenWithLeadingAndTrailingTrivia(sourceText, fullStart, kind, leadingTriviaInfo, width, trailingTriviaInfo);\r\n" +
"        }\r\n" +
//"    }\r\n" +
//"\r\n" +
//"    export function tokenFromText(text: IText, fullStart: number,\r\n" +
//"        kind: SyntaxKind,\r\n" +
//"        leadingTriviaInfo: number,\r\n" +
//"        width: number,\r\n" +
//"        trailingTriviaInfo: number): ISyntaxToken {\r\n" +
//"        if (kind >= SyntaxKind.FirstFixedWidth) {\r\n" +
//"            return fixedWidthToken(text, fullStart, kind, leadingTriviaInfo, trailingTriviaInfo);\r\n" +
//"        }\r\n" +
//"        else {\r\n" +
//"            return variableWidthToken(text, fullStart, kind, leadingTriviaInfo, width, trailingTriviaInfo);\r\n" +
//"        }\r\n" +
"    }\r\n\r\n"

    result += 
"    function getTriviaWidth(value: number): number {\r\n" +
"        return value >>> SyntaxConstants.TriviaFullWidthShift;\r\n" +
"    }\r\n" +
"\r\n" +
"    function hasTriviaComment(value: number): bool {\r\n" +
"        return (value & SyntaxConstants.TriviaCommentMask) !== 0;\r\n" +
"    }\r\n" +
"\r\n" +
"    function hasTriviaNewLine(value: number): bool {\r\n" +
"        return (value & SyntaxConstants.TriviaNewLineMask) !== 0;\r\n" +
"    }\r\n";

    result += "}";

    return result;
}

function generateWalker(): string {
    var result = "";

    result +=
"///<reference path='SyntaxVisitor.generated.ts' />\r\n"+
"\r\n" +
"class SyntaxWalker implements ISyntaxVisitor {\r\n" +
"    public visitToken(token: ISyntaxToken): void {\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitNode(node: SyntaxNode): void {\r\n" +
"        node.accept(this);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {\r\n" +
"        if (nodeOrToken.isToken()) { \r\n" +
"            this.visitToken(<ISyntaxToken>nodeOrToken);\r\n" +
"        }\r\n" +
"        else {\r\n" +
"            this.visitNode(<SyntaxNode>nodeOrToken);\r\n" +
"        }\r\n" +
"    }\r\n" +
"\r\n" +
"    private visitOptionalToken(token: ISyntaxToken): void {\r\n" +
"        if (token === null) {\r\n" +
"            return;\r\n" +
"        }\r\n" +
"\r\n" +
"        this.visitToken(token);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitOptionalNode(node: SyntaxNode): void {\r\n" +
"        if (node === null) {\r\n" +
"            return;\r\n" +
"        }\r\n" +
"\r\n" +
"        this.visitNode(node);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitOptionalNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {\r\n" +
"        if (nodeOrToken === null) {\r\n" +
"            return;\r\n" +
"        }\r\n" +
"\r\n" +
"        this.visitNodeOrToken(nodeOrToken);\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitList(list: ISyntaxList): void {\r\n" +
"        for (var i = 0, n = list.childCount(); i < n; i++) {\r\n" +
"           this.visitNodeOrToken(list.childAt(i));\r\n" +
"        }\r\n" +
"    }\r\n" +
"\r\n" +
"    public visitSeparatedList(list: ISeparatedSyntaxList): void {\r\n" +
"        for (var i = 0, n = list.childCount(); i < n; i++) {\r\n" +
"            var item = list.childAt(i);\r\n" +
"            this.visitNodeOrToken(item);\r\n" + 
"        }\r\n" +
"    }\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isAbstract) { continue; }

        result += "\r\n";
        result += "    public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): void {\r\n";

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];

            if (child.isToken) {
                if (child.isOptional) {
                    result += "        this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "        this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.isList) {
                result += "        this.visitList(node." + child.name + ");\r\n";
            }
            else if (child.isSeparatedList) {
                result += "        this.visitSeparatedList(node." + child.name + ");\r\n";
            }
            else if (isNodeOrToken(child)) {
                if (child.isOptional) {
                    result += "        this.visitOptionalNodeOrToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "        this.visitNodeOrToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.type !== "SyntaxKind") {
                if (child.isOptional) {
                    result += "        this.visitOptionalNode(node." + child.name + ");\r\n";
                }
                else {
                    result += "        this.visitNode(node." + child.name + ");\r\n";
                }
            }
        }

        result += "    }\r\n";
    }

    result += "}";
    return result;
}

function generateKeywordCondition(keywords: { text: string; kind: SyntaxKind; }[], currentCharacter: number, indent: string): string {
    var length = keywords[0].text.length;

    var result = "";

    if (keywords.length === 1) {
        var keyword = keywords[0];
        
        if (currentCharacter === length) {
            return indent + "return SyntaxKind." + (<any>SyntaxKind)._map[keyword.kind] + ";\r\n";
        }

        var keywordText = keywords[0].text;
        var result = indent + "return ("

        for (var i = currentCharacter; i < length; i++) {
            if (i > currentCharacter) {
                result += " && ";
            }

            var index = i === 0 ? "startIndex" : ("startIndex + " + i);
            result += "array[" + index + "] === CharacterCodes." + keywordText.substr(i, 1);
        }

        result += ") ? SyntaxKind." + (<any>SyntaxKind)._map[keyword.kind] + " : SyntaxKind.IdentifierName;\r\n";
    }
    else {
        var index = currentCharacter === 0 ? "startIndex" : ("startIndex + " + currentCharacter);
        result += indent + "switch(array[" + index + "]) {\r\n"

        var groupedKeywords = ArrayUtilities.groupBy(keywords, k => k.text.substr(currentCharacter, 1));

        for (var c in groupedKeywords) {
            if (groupedKeywords.hasOwnProperty(c)) {
                result += indent + "case CharacterCodes." + c + ":\r\n";
                result += indent + "    // " + ArrayUtilities.select(groupedKeywords[c], k => k.text).join(", ") + "\r\n";
                result += generateKeywordCondition(groupedKeywords[c], currentCharacter + 1, indent + "    ");
            }
        }

        result += indent + "default:\r\n";
        result += indent + "    return SyntaxKind.IdentifierName;\r\n";
        result += indent + "}\r\n\r\n";
    }

    return result;
}

function generateScannerUtilities(): string {
    var result = "///<reference path='..\\Text\\CharacterCodes.ts' />\r\n" +
        "///<reference path='SyntaxKind.ts' />\r\n" +
        "\r\n" +
        "class ScannerUtilities {\r\n";

    var keywords: { text: string; kind: SyntaxKind; }[] = [];
    for (var i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
        keywords.push({ kind: i, text: SyntaxFacts.getText(i) });
    }

    result += "    public static identifierKind(array: number[], startIndex: number, length: number): SyntaxKind {\r\n";

    var minTokenLength = ArrayUtilities.min(keywords, k => k.text.length);
    var maxTokenLength = ArrayUtilities.max(keywords, k => k.text.length);
    result += "        switch (length) {\r\n";


    for (var i = minTokenLength; i <= maxTokenLength; i++) {
        var keywordsOfLengthI = ArrayUtilities.where(keywords, k => k.text.length === i);
        if (keywordsOfLengthI.length > 0) {
            result += "        case " + i + ":\r\n";
            result += "            // " + ArrayUtilities.select(keywordsOfLengthI, k => k.text).join(", ") + "\r\n";

            result += generateKeywordCondition(keywordsOfLengthI, 0, "            ");

            // result += "            return SyntaxKind.None;\r\n\r\n";
        }
    }

    result += "        default:\r\n";
    result += "            return SyntaxKind.IdentifierName;\r\n";
    result += "        }\r\n";
    result += "    }\r\n";

    result += "}";

    return result;
}

function generateVisitor(): string {
    var result = "";

    result += "///<reference path='SyntaxNodes.generated.ts' />\r\n\r\n";

    result += "interface ISyntaxVisitor {\r\n";
    result += "    visitToken(token: ISyntaxToken): any;\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (!definition.isAbstract) {
            result += "    visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any;\r\n";
        }
    }

    result += "}\r\n\r\n";

    if (!forPrettyPrinter) {
        result += "class SyntaxVisitor implements ISyntaxVisitor {\r\n";
        result += "    public defaultVisit(node: ISyntaxNodeOrToken): any {\r\n";
        result += "        return null;\r\n";
        result += "    }\r\n";
        result += "\r\n";
        result += "    private visitToken(token: ISyntaxToken): any {\r\n";
        result += "        return this.defaultVisit(token);\r\n";
        result += "    }\r\n";

        for (var i = 0; i < definitions.length; i++) {
            var definition = definitions[i];

            if (!definition.isAbstract) {
                result += "\r\n    private visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";
                result += "        return this.defaultVisit(node);\r\n";
                result += "    }\r\n";
            }
        }

        result += "}";
    }

    return result;
}

function generateFactory(): string {
    var result = "///<reference path='ISyntaxList.ts' />\r\n";

    result += "\r\nmodule Syntax {\r\n";

    result += "    export interface IFactory {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isAbstract) {
            continue;
        }
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";

        for (var j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }

            var child = definition.children[j];
            result += child.name + ": " + getType(child);
        }

        result += "): " + definition.name + ";\r\n";
    }

    result += "    }\r\n\r\n";

    // TODO: stop exporting these once compiler bugs are fixed.
    result += "    class NormalModeFactory implements IFactory {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isAbstract) {
            continue;
        }
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";

        for (var j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }

            var child = definition.children[j];
            result += getSafeName(child) + ": " + getType(child);
        }

        result += "): " + definition.name + " {\r\n";
        result += "            return new " + definition.name + "(";

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];
            result += getSafeName(child);
            result += ", ";
        }

        result += "/*parsedInStrictMode:*/ false);\r\n";

        result += "        }\r\n"
    }

    result += "    }\r\n\r\n";
    
    // TODO: stop exporting these once compiler bugs are fixed.
    result += "    class StrictModeFactory implements IFactory {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isAbstract) {
            continue;
        }
        result += "        " + camelCase(getNameWithoutSuffix(definition)) + "(";

        for (var j = 0; j < definition.children.length; j++) {
            if (j > 0) {
                result += ", ";
            }

            var child = definition.children[j];
            result += getSafeName(child) + ": " + getType(child);
        }

        result += "): " + definition.name + " {\r\n";
        result += "            return new " + definition.name + "(";

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];
            result += getSafeName(child);
            result += ", ";
        }

        result += "/*parsedInStrictMode:*/ true);\r\n";

        result += "        }\r\n"
    }

    result += "    }\r\n\r\n";


    result += "    export var normalModeFactory: IFactory = new NormalModeFactory();\r\n";
    result += "    export var strictModeFactory: IFactory = new StrictModeFactory();\r\n";
    result += "}";

    return result;
}

var syntaxNodes = generateNodes();
var rewriter = generateRewriter();
var tokens = generateTokens();
var walker = generateWalker();
var scannerUtilities = generateScannerUtilities();
var visitor = generateVisitor();
var factory = generateFactory();

Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxNodes.generated.ts", syntaxNodes, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxRewriter.generated.ts", rewriter, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxToken.generated.ts", tokens, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxWalker.generated.ts", walker, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\ScannerUtilities.generated.ts", scannerUtilities, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxVisitor.generated.ts", visitor, true);
Environment.writeFile(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxFactory.generated.ts", factory, true);
