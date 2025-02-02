import { users, url } from "./Mock";

describe('Inventory - Login', () => {
    it('Should login with valid credentials', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.contains('Products');
    });

    it('Should login with valid credentials and do logout', () => {
      cy.visit(url);
      
      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();

      cy.get('[data-test="login-button"]').should('be.visible');
    });

    it('Should not login with invalid credentials', () => {
      cy.visit(url);
      
      cy.get('[data-test="username"]').type(users.invalid_user.username);
      cy.get('[data-test="password"]').type(users.invalid_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Should not allow "locked_out_user" do sign in', () => {
      cy.visit(url);
      
      cy.get('[data-test="username"]').type(users.locked_out_user.username);
      cy.get('[data-test="password"]').type(users.locked_out_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Should login with "performance_glitch_user" and wait the products page loads', () => {
      cy.visit(url);
      
      cy.get('[data-test="username"]').type(users.performance_glitch_user.username);
      cy.get('[data-test="password"]').type(users.performance_glitch_user.password);
      cy.get('[data-test="login-button"]').click();
      
      cy.contains('Products', { timeout: 10000 }).should('be.visible');
    });
  })