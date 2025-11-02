/// <reference types="cypress" />

let userData;
let userEmail;
const userName = 'QABL5';

describe('Automation Exercise - Testes Completos', () => {
  let userData;
  let userEmail;
  const userName = 'QABL5';

  before(() => {
    userEmail = `qabl-${new Date().getTime()}@test.com`;
  });

  beforeEach(() => {    
    cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com');
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  it('Registrar Usuário', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.contains('button', 'Signup').click();

    cy.get('[data-qa="password"]').type('12345');
    cy.get('select[data-qa=days]').select('20');
    cy.get('select[data-qa=months]').select('September');
    cy.get('select[data-qa=years]').select('1992');
    cy.get('input#newsletter').check();
    cy.get('input#optin').check();
    cy.get('input#first_name').type('Breno');
    cy.get('input#last_name').type('Bruno');
    cy.get('input#company').type('AMZ');
    cy.get('input#address1').type('RUA 1');
    cy.get('select#country').select('Canada');
    cy.get('input#state').type('California');
    cy.get('input#city').type('Los Angeles');
    cy.get('[data-qa=zipcode]').type('90001');
    cy.get('[data-qa=mobile_number]').type('222 333 4444');

    cy.get('[data-qa="create-account"]').click();
    cy.contains('b', 'Account Created!').should('be.visible');
  });

  it('Login de Usuário com e-mail e senha corretos', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(userEmail); 
    cy.get('[data-qa="login-password"]').type('12345');
    cy.get('[data-qa="login-button"]').click();

    cy.get('li > a')
      .contains(`Logged in as ${userName}`, { timeout: 10000 })
      .should('be.visible');

    cy.get('a[href="/logout"]').should('be.visible');
  });

  it('Login de Usuário com e-mail e senha incorretos', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(userEmail);
    cy.get('[data-qa="login-password"]').type('54321');
    cy.get('[data-qa="login-button"]').click();

    cy.get('.login-form > form > p', { timeout: 10000 })
      .should('contain', 'Your email or password');
  });

  it('Logout de Usuário', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(userEmail);
    cy.get('[data-qa="login-password"]').type('12345');
    cy.get('[data-qa="login-button"]').click();

    cy.contains(`Logged in as ${userName}`, { timeout: 10000 }).should('be.visible');

    cy.contains('Logout', { timeout: 10000 }).should('be.visible').click();
    cy.url({ timeout: 10000 }).should('contain', 'login');

    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('contain.text', 'Signup / Login');
  });

  it('Cadastrar Usuário com e-mail existente', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.contains('button', 'Signup').click();

    cy.get('.signup-form p', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!');
  });

  it('Enviar formulário de contato com upload', () => {
    cy.get('a[href*=contact]').click();
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);

    cy.fixture('userData.json').as('arquivo');
    cy.get('input[type="file"]').selectFile('@arquivo');

    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status', { timeout: 10000 })
      .should('contain.text', 'Success! Your details have been submitted successfully.');
  });

  it('Verificar todos os produtos e detalhes do produto', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.title.text-center').should('contain.text', 'All Products');
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);

    cy.get('.features_items .col-sm-4').first().contains('View Product').click();
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information h2').should('not.be.empty');
    cy.get('.product-information p').eq(0).should('contain.text', 'Category');
    cy.get('.product-information p').eq(1).should('contain.text', 'Availability');
    cy.get('.product-information p').eq(2).should('contain.text', 'Condition');
    cy.get('.product-information p').eq(3).should('contain.text', 'Brand');
  });

  it('Pesquisar produto', () => {
    cy.acessarPaginaProdutos(); 
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);
    cy.get('.features_items .col-sm-4').each(($produto) => {
      cy.wrap($produto).should('be.visible');
      cy.wrap($produto).find('p').should('not.be.empty');
    });
  });

  it('Inscrever usuário na subscription', () => {
    cy.get('footer').scrollIntoView();
    cy.get('#susbscribe_email').type(userEmail);
    cy.get('#subscribe').click();
    cy.get('.alert-success')
      .should('contain.text', 'You have been successfully subscribed!');
  });

 it('Fluxo completo de compra', () => {
  cy.get('a[href="/login"]').click();


  const fluxoUserEmail = `fluxo-${new Date().getTime()}@test.com`;
  cy.get('[data-qa="signup-name"]').type(userName);
  cy.get('[data-qa="signup-email"]').type(fluxoUserEmail);
  cy.contains('button', 'Signup').click();

  cy.get('[data-qa="password"]').type('12345');
  cy.get('select[data-qa=days]').select('20');
  cy.get('select[data-qa=months]').select('September');
  cy.get('select[data-qa=years]').select('1992');

  cy.get('input#newsletter').check();
  cy.get('input#optin').check();
  cy.get('input#first_name').type('Breno');
  cy.get('input#last_name').type('Bruno');
  cy.get('input#company').type('AMZ');
  cy.get('input#address1').type('RUA 1');
  cy.get('select#country').select('Canada');
  cy.get('input#state').type('California');
  cy.get('input#city').type('Los Angeles');
  cy.get('[data-qa=zipcode]').type('90001');
  cy.get('[data-qa=mobile_number]').type('222 333 4444');

  cy.get('[data-qa="create-account"]').click();

  cy.contains('b', 'Account Created!', { timeout: 10000 }).should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();

  cy.contains(`Logged in as ${userName}`, { timeout: 10000 }).should('be.visible');

  cy.adicionarPrimeiroProdutoCarrinho();
  cy.get('.cart_info', { timeout: 10000 }).should('be.visible');

  cy.finalizarCompra('Favor entregar rápido', {
    nome: 'Breno Bruno',
    numero: '4242424242424242',
    cvc: '123',
    mes: '12',
    ano: '2025'
  });

  cy.contains('Congratulations! Your order has been confirmed!', { timeout: 10000 }).should('be.visible');

  cy.get('a[href="/delete_account"]').click();
  cy.get('b').should('contain.text', 'Account Deleted!');
  cy.contains('Your account has been permanently deleted!').should('be.visible');
  cy.get('a[data-qa="continue-button"], a:contains("Continue")').click();
});

});
