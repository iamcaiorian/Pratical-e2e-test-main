import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it('Should do checkout with the correct flow', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    cy.get('.shopping_cart_link').click();

    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Caio');
    cy.get('[data-test="lastName"]').type('Sousa');
    cy.get('[data-test="postalCode"]').type('12345678');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();

    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });

  it('Should select some products, go to cart, and go back to continue shopping', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    cy.get('.shopping_cart_link').click();

    cy.get('[data-test="continue-shopping"]').click();
    
    cy.url().should('include', '/inventory.html');
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.contains('Products');
  });

  it.skip("Should not continue checkout with empty delivery information");
});