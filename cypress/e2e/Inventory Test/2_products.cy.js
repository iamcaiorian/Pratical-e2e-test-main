import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').click();
    });

    cy.get('.inventory_details').should('be.visible');
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  it('Should sort products by price properly (high to low)', () => {
    cy.get('.product_sort_container').select('hilo');

    let previousPrice = Infinity;
    cy.get('.inventory_item_price').each(($el) => {
      const price = parseFloat($el.text().replace('$', ''));
      expect(price).to.be.at.most(previousPrice);
      previousPrice = price;
    });
  });

  it.skip('Should sort products by price properly (low to high)');
});
