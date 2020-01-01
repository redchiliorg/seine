describe('typography', function() {
  it('content width is equal to canvas of svg typography', () => {
    cy.visit('/iframe.html?id=cypress--svg-typography-text');

    cy.get('#root div > p, #root canvas').should((elements) => {
      expect(elements).to.have.length(2);
      expect(parseInt(elements[0].getBoundingClientRect().width)).equals(
        parseInt(elements[1].getBoundingClientRect().width)
      );
    });
  });
});
