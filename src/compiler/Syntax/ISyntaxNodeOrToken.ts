///<reference path='ISyntaxElement.ts' />

interface ISyntaxNodeOrToken extends ISyntaxElement {
    withLeadingTrivia(leadingTrivia: ISyntaxTriviaList): ISyntaxNodeOrToken;
    withTrailingTrivia(trailingTrivia: ISyntaxTriviaList): ISyntaxNodeOrToken;

    accept(visitor: ISyntaxVisitor): any;
}