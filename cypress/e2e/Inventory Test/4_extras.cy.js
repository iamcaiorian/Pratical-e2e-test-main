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
});
