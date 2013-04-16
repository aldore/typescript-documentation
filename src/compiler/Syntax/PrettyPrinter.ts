///<reference path='SyntaxNode.ts' />

module PrettyPrinter {
    export function prettyPrint(node: SyntaxNode, indentWhitespace: string = "    "): string {
        var impl = new PrettyPrinterImpl(indentWhitespace);
        node.accept(impl);
        return impl.result.join("");
    }

    class PrettyPrinterImpl implements ISyntaxVisitor {
        public result: string[] = [];
        private indentations: string[] = [];
        private indentation: number = 0;

        constructor(private indentWhitespace: string) {
        }

        private newLineCountBetweenModuleElements(element1: IModuleElementSyntax, element2: IModuleElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.lastToken().kind() === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenClassElements(element1: IClassElementSyntax, element2: IClassElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            return 1;
        }

        private newLineCountBetweenStatements(element1: IClassElementSyntax, element2: IClassElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.lastToken().kind() === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenSwitchClauses(element1: SwitchClauseSyntax, element2: SwitchClauseSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.statements.childCount() === 0) {
                return 1;
            }

            return 2;
        }

        private ensureSpace(): void {
            if (this.result.length > 0) {
                var last = ArrayUtilities.last(this.result);
                if (last !== " " && last !== "\r\n") {
                    this.appendText(" ");
                }
            }
        }

        private ensureNewLine(): void {
            if (this.result.length > 0) {
                var last = ArrayUtilities.last(this.result);
                if (last !== "\r\n") {
                    this.appendText("\r\n");
                }
            }
        }

        private appendNewLines(count: number): void {
            for (var i = 0; i < count; i++) {
                this.appendText("\r\n");
            }
        }

        private getIndentation(count: number): string {
            for (var i = this.indentations.length; i <= count; i++) {
                var text = i === 0
                    ? ""
                    : this.indentations[i - 1] + this.indentWhitespace;
                this.indentations[i] = text;
            }

            return this.indentations[count];
        }

        private appendIndentationIfAfterNewLine(): void {
            if (this.result.length > 0) {
                if (ArrayUtilities.last(this.result) === "\r\n") {
                    this.result.push(this.getIndentation(this.indentation));
                }
            }
        }

        private appendText(text: string): void {
            this.result.push(text);
        }

        private appendNode(node: ISyntaxNode): void {
            if (node !== null) {
                node.accept(this);
            }
        }

        private appendToken(token: ISyntaxToken): void {
            if (token !== null && token.fullWidth() > 0) {
                this.appendIndentationIfAfterNewLine();
                this.appendText(token.text());
            }
        }

        private visitToken(token: ISyntaxToken): void {
            this.appendToken(token);
        }

        private appendSeparatorSpaceList(list: ISeparatedSyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureSpace();
                    }

                    list.childAt(i).accept(this);
                }
                else {
                    this.appendToken(<ISyntaxToken>list.childAt(i));
                }
            }
        }

        private appendSeparatorNewLineList(list: ISeparatedSyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureNewLine();
                    }

                    list.childAt(i).accept(this);
                }
                else {
                    this.appendToken(<ISyntaxToken>list.childAt(i));
                }
            }
        }

        private appendModuleElements(list: ISyntaxList): void {
            var lastModuleElement = null;
            for (var i = 0, n = list.childCount(); i < n; i++) {
                var moduleElement = <IModuleElementSyntax>list.childAt(i);
                var newLineCount = this.newLineCountBetweenModuleElements(lastModuleElement, moduleElement);

                this.appendNewLines(newLineCount);
                moduleElement.accept(this);

                lastModuleElement = moduleElement;
            }
        }

        private visitSourceUnit(node: SourceUnitSyntax): void {
            this.appendModuleElements(node.moduleElements);
        }

        private visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void {
            this.appendToken(node.moduleKeyword);
            this.appendToken(node.openParenToken);
            this.appendToken(node.stringLiteral);
            this.appendToken(node.closeParenToken);
        }

        private visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void {
            node.moduleName.accept(this);
        }

        private visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.appendToken(node.importKeyword);
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            node.moduleReference.accept(this);
            this.appendToken(node.semicolonToken);
        }

        private visitClassDeclaration(node: ClassDeclarationSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.declareKeyword);
            this.ensureSpace()
            this.appendToken(node.classKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.typeParameterList);
            this.ensureSpace();
            this.appendNode(node.extendsClause);
            this.ensureSpace();
            this.appendNode(node.implementsClause);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            
            var lastClassElement: IClassElementSyntax = null;
            for (var i = 0, n = node.classElements.childCount(); i < n; i++) {
                var classElement = <IClassElementSyntax>node.classElements.childAt(i);
                var newLineCount = this.newLineCountBetweenClassElements(lastClassElement, classElement);

                this.appendNewLines(newLineCount);
                classElement.accept(this);

                lastClassElement = classElement;
            }

            this.indentation--;

            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        private visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.interfaceKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.typeParameterList);
            this.ensureSpace();

            this.appendObjectType(node.body, /*appendNewLines:*/ true);
        }

        private appendObjectType(node: ObjectTypeSyntax, appendNewLines: bool): void {
            this.appendToken(node.openBraceToken);

            if (appendNewLines) {
                this.ensureNewLine();
                this.indentation++;
            }
            else {
                this.ensureSpace();
            }

            for (var i = 0, n = node.typeMembers.childCount(); i < n; i++) {
                node.typeMembers.childAt(i).accept(this);

                if (appendNewLines) {
                    this.ensureNewLine();
                }
                else {
                    this.ensureSpace();
                }
            }

            this.indentation--;
            this.appendToken(node.closeBraceToken);
        }

        private visitExtendsClause(node: ExtendsClauseSyntax): void {
            this.appendToken(node.extendsKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeNames);
        }

        private visitImplementsClause(node: ImplementsClauseSyntax): void {
            this.appendToken(node.implementsKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeNames);
        }

        private visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.moduleKeyword);
            this.ensureSpace();
            this.appendNode(node.moduleName);
            this.ensureSpace();
            this.appendToken(node.stringLiteral);
            this.ensureSpace();

            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            
            this.appendModuleElements(node.moduleElements);

            this.indentation--;
            this.appendToken(node.closeBraceToken);
        }

        private appendBlockOrSemicolon(block: BlockSyntax, semicolonToken: ISyntaxToken) {
            if (block) {
                this.ensureSpace();
                block.accept(this);
            }
            else {
                this.appendToken(semicolonToken);
            }
        }

        private visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.functionKeyword);
            this.ensureSpace();
            this.appendNode(node.functionSignature);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        private visitVariableStatement(node: VariableStatementSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.declareKeyword);
            this.ensureSpace();
            node.variableDeclaration.accept(this);
            this.appendToken(node.semicolonToken);
        }

        private visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.appendToken(node.varKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.variableDeclarators);
        }

        private visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            this.appendToken(node.identifier);
            this.appendNode(node.equalsValueClause);
        }

        private visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            node.value.accept(this);
        }

        private visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.appendToken(node.operatorToken);
            node.operand.accept(this);
        }

        private visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void {
            this.appendToken(node.openBracketToken);
            this.appendSeparatorSpaceList(node.expressions);
            this.appendToken(node.closeBracketToken);
        }

        private visitOmittedExpression(node: OmittedExpressionSyntax): void {
            // Nothing to do.
        }

        private visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.appendToken(node.openParenToken);
            node.expression.accept(this);
            this.appendToken(node.closeParenToken);
        }

        private visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.body.accept(this);
        }

        private visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            node.callSignature.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.body.accept(this);
        }

        private visitQualifiedName(node: QualifiedNameSyntax): void {
            node.left.accept(this);
            this.appendToken(node.dotToken);
            this.appendToken(node.right);
        }

        private visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.appendToken(node.lessThanToken);
            this.appendSeparatorSpaceList(node.typeArguments);
            this.appendToken(node.greaterThanToken);
        }

        private visitConstructorType(node: ConstructorTypeSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        private visitFunctionType(node: FunctionTypeSyntax): void {
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        private visitObjectType(node: ObjectTypeSyntax): void {
            this.appendToken(node.openBraceToken);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeMembers);
            this.appendToken(node.closeBraceToken);
        }

        private visitArrayType(node: ArrayTypeSyntax): void {
            node.type.accept(this);
            this.appendToken(node.openBracketToken);
            this.appendToken(node.closeBracketToken);
        }

        private visitGenericType(node: GenericTypeSyntax): void {
            node.name.accept(this);
            node.typeArgumentList.accept(this);
        }

        private visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        private appendStatements(statements: ISyntaxList): void {
            var lastStatement: IStatementSyntax = null;
            for (var i = 0, n = statements.childCount(); i < n; i++) {
                var statement = <IStatementSyntax>statements.childAt(i);

                var newLineCount = this.newLineCountBetweenStatements(lastStatement, statement);

                this.appendNewLines(newLineCount);
                statement.accept(this);

                lastStatement = statement;
            }
        }

        private visitBlock(node: BlockSyntax): void {
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();
            this.indentation++;
            
            this.appendStatements(node.statements);

            this.indentation--;
            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        private visitParameter(node: ParameterSyntax): void {
            this.appendToken(node.dotDotDotToken);
            this.appendToken(node.identifier);
            this.appendToken(node.questionToken);
            this.appendNode(node.typeAnnotation);
            this.appendNode(node.equalsValueClause);
        }

        private visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.dotToken);
            this.appendToken(node.name);
        }

        private visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            node.operand.accept(this);
            this.appendToken(node.operatorToken);
        }

        private visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.openBracketToken);
            node.argumentExpression.accept(this);
            this.appendToken(node.closeBracketToken);
        }

        private visitInvocationExpression(node: InvocationExpressionSyntax): void {
            node.expression.accept(this);
            node.argumentList.accept(this);
        }

        private visitArgumentList(node: ArgumentListSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendSeparatorSpaceList(node.arguments);
            this.appendToken(node.closeParenToken);
        }

        private visitBinaryExpression(node: BinaryExpressionSyntax): void {
            node.left.accept(this);

            if (node.kind() !== SyntaxKind.CommaExpression) {
                this.ensureSpace();
            }

            this.appendToken(node.operatorToken);
            this.ensureSpace();
            node.right.accept(this);
        }

        private visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            node.condition.accept(this);
            this.ensureSpace();
            this.appendToken(node.questionToken);
            this.ensureSpace();
            node.whenTrue.accept(this);
            this.ensureSpace();
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.whenFalse.accept(this);
        }

        private visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.appendToken(node.newKeyword);
            node.callSignature.accept(this);
        }

        private visitFunctionSignature(node: FunctionSignatureSyntax): void {
            this.appendToken(node.identifier);
            this.appendToken(node.questionToken);
            node.callSignature.accept(this);
        }

        private visitIndexSignature(node: IndexSignatureSyntax): void {
            this.appendToken(node.openBracketToken);
            node.parameter.accept(this);
            this.appendToken(node.closeBracketToken);
            this.appendNode(node.typeAnnotation);
        }

        private visitPropertySignature(node: PropertySignatureSyntax): void {
            this.appendToken(node.identifier);
            this.appendToken(node.questionToken);
            this.appendNode(node.typeAnnotation);
        }

        private visitParameterList(node: ParameterListSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendSeparatorSpaceList(node.parameters);
            this.appendToken(node.closeParenToken);
        }

        private visitCallSignature(node: CallSignatureSyntax): void {
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.appendNode(node.typeAnnotation);
        }

        private visitTypeParameterList(node: TypeParameterListSyntax): void {
            this.appendToken(node.lessThanToken);
            this.appendSeparatorSpaceList(node.typeParameters);
            this.appendToken(node.greaterThanToken);
        }

        private visitTypeParameter(node: TypeParameterSyntax): void {
            this.appendToken(node.identifier);
            this.appendNode(node.constraint);
        }

        private visitConstraint(node: ConstraintSyntax): void {
            this.ensureSpace();
            this.appendToken(node.extendsKeyword);
            this.ensureSpace();
            node.type.accept(this);
        }

        private appendBlockOrStatement(node: IStatementSyntax): void {
            if (node.kind() === SyntaxKind.Block) {
                this.ensureSpace();
                node.accept(this);
            }
            else {
                this.ensureNewLine();
                this.indentation++;
                node.accept(this);
                this.indentation--;
            }
        }

        private visitIfStatement(node: IfStatementSyntax): void {
            this.appendToken(node.ifKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
            this.appendNode(node.elseClause);
        }

        private visitElseClause(node: ElseClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.elseKeyword);

            if (node.statement.kind() === SyntaxKind.IfStatement) {
                this.ensureSpace();
                node.statement.accept(this);
            }
            else {
                this.appendBlockOrStatement(node.statement);
            }
        }

        private visitExpressionStatement(node: ExpressionStatementSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.semicolonToken);
        }

        private visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.appendToken(node.constructorKeyword);
            node.parameterList.accept(this);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        private visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            this.appendToken(node.publicOrPrivateKeyword);
            this.ensureSpace();
            this.appendToken(node.staticKeyword);
            this.ensureSpace();
            node.functionSignature.accept(this);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        private visitGetMemberAccessorDeclaration(node: GetMemberAccessorDeclarationSyntax): void {
            this.appendToken(node.publicOrPrivateKeyword);
            this.ensureSpace();
            this.appendToken(node.staticKeyword);
            this.ensureSpace();
            this.appendToken(node.getKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            node.parameterList.accept(this);
            this.appendNode(node.typeAnnotation);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitSetMemberAccessorDeclaration(node: SetMemberAccessorDeclarationSyntax): void {
            this.appendToken(node.publicOrPrivateKeyword);
            this.ensureSpace();
            this.appendToken(node.staticKeyword);
            this.ensureSpace();
            this.appendToken(node.setKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            node.parameterList.accept(this);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.appendToken(node.publicOrPrivateKeyword);
            this.ensureSpace();
            this.appendToken(node.staticKeyword);
            this.ensureSpace();
            node.variableDeclarator.accept(this);
            this.appendToken(node.semicolonToken);
        }

        private visitThrowStatement(node: ThrowStatementSyntax): void {
            this.appendToken(node.throwKeyword);

            if (node.expression) {
                this.ensureSpace();
                node.expression.accept(this);
            }

            this.appendToken(node.semicolonToken);
        }

        private visitReturnStatement(node: ReturnStatementSyntax): void {
            this.appendToken(node.returnKeyword);

            if (node.expression) {
                this.ensureSpace();
                node.expression.accept(this);
            }

            this.appendToken(node.semicolonToken);
        }

        private visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            node.expression.accept(this);
            this.appendNode(node.argumentList);
        }

        private visitSwitchStatement(node: SwitchStatementSyntax): void {
            this.appendToken(node.switchKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.expression.accept(this);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            var lastSwitchClause: SwitchClauseSyntax = null;
            for (var i = 0, n = node.switchClauses.childCount(); i < n; i++) {
                var switchClause = <SwitchClauseSyntax>node.switchClauses.childAt(i);

                var newLineCount = this.newLineCountBetweenSwitchClauses(lastSwitchClause, switchClause);

                this.appendNewLines(newLineCount);
                switchClause.accept(this);

                lastSwitchClause = switchClause;
            }

            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        private appendSwitchClauseStatements(node: SwitchClauseSyntax): void {
            if (node.statements.childCount() === 1 && node.statements.childAt(0).kind() === SyntaxKind.Block) {
                this.ensureSpace();
                node.statements.childAt(0).accept(this);
            }
            else if (node.statements.childCount() > 0) {
                this.ensureNewLine();

                this.indentation++;
                this.appendStatements(node.statements);
                this.indentation--;
            }
        }

        private visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.appendToken(node.caseKeyword);
            this.ensureSpace();
            node.expression.accept(this);
            this.appendToken(node.colonToken);
            this.appendSwitchClauseStatements(node);
        }

        private visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void {
            this.appendToken(node.defaultKeyword);
            this.appendToken(node.colonToken);
            this.appendSwitchClauseStatements(node);
        }

        private visitBreakStatement(node: BreakStatementSyntax): void {
            this.appendToken(node.breakKeyword);
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            this.appendToken(node.semicolonToken);
        }

        private visitContinueStatement(node: ContinueStatementSyntax): void {
            this.appendToken(node.continueKeyword);
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            this.appendToken(node.semicolonToken);
        }

        private visitForStatement(node: ForStatementSyntax): void {
            this.appendToken(node.forKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendNode(node.variableDeclaration);
            this.appendNode(node.initializer);
            this.appendToken(node.firstSemicolonToken);

            if (node.condition) {
                this.ensureSpace();
                node.condition.accept(this);
            }

            this.appendToken(node.secondSemicolonToken);

            if (node.incrementor) {
                this.ensureSpace();
                node.incrementor.accept(this);
            }

            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        private visitForInStatement(node: ForInStatementSyntax): void {
            this.appendToken(node.forKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendNode(node.variableDeclaration);
            this.appendNode(node.left);
            this.ensureSpace();
            this.appendToken(node.inKeyword);
            this.ensureSpace();
            this.appendNode(node.expression);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        private visitWhileStatement(node: WhileStatementSyntax): void {
            this.appendToken(node.whileKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        private visitWithStatement(node: WithStatementSyntax): void {
            this.appendToken(node.withKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        private visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            /*
            exportKeyword: ISyntaxToken,
                public enumKeyword: ISyntaxToken,
                public identifier: ISyntaxToken,
                public openBraceToken: ISyntaxToken,
                public variableDeclarators: ISeparatedSyntaxList,
                public closeBraceToken:
            */

            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.enumKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            this.appendSeparatorNewLineList(node.variableDeclarators);
            this.indentation--;

            this.appendToken(node.closeBraceToken);
        }

        private visitCastExpression(node: CastExpressionSyntax): void {
            this.appendToken(node.lessThanToken);
            node.type.accept(this);
            this.appendToken(node.greaterThanToken);
            node.expression.accept(this);
        }

        private visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.appendToken(node.openBraceToken);

            if (node.propertyAssignments.childCount() === 1) {
                this.ensureSpace();
                node.propertyAssignments.childAt(0).accept(this);
                this.ensureSpace();
            }
            else if (node.propertyAssignments.childCount() > 0) {
                this.indentation++;
                this.ensureNewLine();
                this.appendSeparatorNewLineList(node.propertyAssignments);
                this.ensureNewLine();
                this.indentation--;
            }

            this.appendToken(node.closeBraceToken);
        }

        private visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            this.appendToken(node.propertyName);
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.expression.accept(this);
        }

        private visitGetAccessorPropertyAssignment(node: GetAccessorPropertyAssignmentSyntax): void {
            this.appendToken(node.getKeyword);
            this.ensureSpace();
            this.appendToken(node.propertyName);
            this.appendToken(node.openParenToken);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitSetAccessorPropertyAssignment(node: SetAccessorPropertyAssignmentSyntax): void {
            this.appendToken(node.setKeyword);
            this.ensureSpace();
            this.appendToken(node.propertyName);
            this.appendToken(node.openParenToken);
            this.appendToken(node.parameterName);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.appendToken(node.functionKeyword);
            
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            node.callSignature.accept(this);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.appendToken(node.semicolonToken);
        }

        private visitTryStatement(node: TryStatementSyntax): void {
            this.appendToken(node.tryKeyword);
            this.ensureSpace();
            node.block.accept(this);
            this.appendNode(node.catchClause);
            this.appendNode(node.finallyClause);
        }

        private visitCatchClause(node: CatchClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.catchKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendToken(node.identifier);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            node.block.accept(this);
        }

        private visitFinallyClause(node: FinallyClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.finallyKeyword);
            this.ensureNewLine();
            node.block.accept(this);
        }

        private visitLabeledStatement(node: LabeledStatementSyntax): void {
            this.appendToken(node.identifier);
            this.appendToken(node.colonToken);
            this.appendBlockOrStatement(node.statement);
        }

        private visitDoStatement(node: DoStatementSyntax): void {
            this.appendToken(node.doKeyword);
            this.appendBlockOrStatement(node.statement);
            this.ensureNewLine();
            this.appendToken(node.whileKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendToken(node.semicolonToken);
        }

        private visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.appendToken(node.typeOfKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        private visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.appendToken(node.deleteKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        private visitVoidExpression(node: VoidExpressionSyntax): void {
            this.appendToken(node.voidKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        private visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            this.appendToken(node.debuggerKeyword);
            this.appendToken(node.semicolonToken);
        }
    }
}