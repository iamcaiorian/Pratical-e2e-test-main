import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe('Inventory - Extras', () => {
  beforeEach(() => {
    cy.visit(url);
    doSignIn(users.standard_user);
  });

  it('Should validate the presence of all products on the inventory page', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('Should validate that each product has a name, price, and image', () => {
    cy.get('.inventory_item').each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('be.visible');
      cy.wrap($item).find('.inventory_item_price').should('be.visible');
      cy.wrap($item).find('img').should('have.attr', 'src');
    });
  });
});
