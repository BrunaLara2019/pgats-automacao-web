// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//cy.

Cypress.Commands.add('navegarParaLogin', () => {
  cy.get('a[href="/login"]').click()
});

// 🔹 Acessar a página "Todos os Produtos" e validar o carregamento
Cypress.Commands.add('acessarPaginaProdutos', () => {
  cy.get('a[href="/products"]').click();
  cy.url().should('include', '/products');
  cy.get('.title.text-center')
    .should('be.visible')
    .and('contain.text', 'All Products');
  cy.get('.features_items .col-sm-4')
    .should('have.length.greaterThan', 0);
});

// 🔹 Pesquisar um produto e validar o resultado
Cypress.Commands.add('pesquisarProduto', (nomeProduto) => {
  cy.get('#search_product').type(nomeProduto);
  cy.get('#submit_search').click();

  // Verifica se seção "SEARCHED PRODUCTS" está visível
  cy.get('.title.text-center')
    .should('be.visible')
    .and('contain.text', 'Searched Products');

  // Garante que há produtos listados
  cy.get('.features_items .col-sm-4')
    .should('have.length.greaterThan', 0);
});
// Comando para assinar newsletter
Cypress.Commands.add('assinarNewsletter', (email) => {
  cy.get('footer').scrollIntoView();              // rola até o rodapé
  cy.get('.single-widget h2').should('contain.text', 'SUBSCRIPTION'); // verifica título
  cy.get('#susbscribe_email').type(email);        // digita o e-mail
  cy.get('#subscribe').click();                   // clica no botão
  cy.get('.alert-success')
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
});
// Comando para acessar a página de login
Cypress.Commands.add('acessarLogin', () => {
  cy.visit('https://automationexercise.com/');
  cy.get('a[href="/login"]').click();
});

// Comando para cadastrar usuário
Cypress.Commands.add('cadastrarUsuario', (userName, userEmail) => {
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
});

// Comando para login de usuário
Cypress.Commands.add('loginUsuario', (userEmail, password = '12345') => {
  cy.acessarLogin();
  cy.get('[data-qa="login-email"]').type(userEmail);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

// Comando para adicionar o primeiro produto ao carrinho
Cypress.Commands.add('adicionarPrimeiroProdutoCarrinho', () => {
  // Acessa a página de produtos, se ainda não estiver nela
  cy.get('a[href="/products"]').click();

  // Espera os produtos carregarem
  cy.get('.features_items .col-sm-4', { timeout: 10000 }).should('have.length.greaterThan', 0);

  // Clica em "Add to cart" do primeiro produto
  cy.get('.features_items .col-sm-4').first().contains('Add to cart').click();

  // Espera o modal de confirmação aparecer
  cy.get('#cartModal', { timeout: 10000 }).should('be.visible');

  // Clica em "View Cart" no modal
  cy.get('#cartModal').contains('View Cart').click();

  // Verifica se a página de carrinho carregou
  cy.get('.cart_info', { timeout: 10000 }).should('be.visible');
});

// Comando para finalizar compra
Cypress.Commands.add('finalizarCompra', (comentario, pagamento) => {
  // Avança para checkout
  cy.contains('Proceed To Checkout', { timeout: 10000 }).click();

  // Digita comentário
  cy.get('textarea[name="message"]').type(comentario);

  // Coloca o pedido
  cy.contains('Place Order').click();

  // Preenche dados de pagamento
  cy.get('input[name="name_on_card"]').type(pagamento.nome);
  cy.get('input[name="card_number"]').type(pagamento.numero);
  cy.get('input[name="cvc"]').type(pagamento.cvc);
  cy.get('input[name="expiry_month"]').type(pagamento.mes);
  cy.get('input[name="expiry_year"]').type(pagamento.ano);

  // Clica no botão de pagamento
  cy.get('button[data-qa="pay-button"]')
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Espera que a mensagem de sucesso apareça na nova página
  cy.contains('Congratulations! Your order has been confirmed!', { timeout: 10000 })
    .should('be.visible');
});



// Comando para deletar conta
Cypress.Commands.add('deletarConta', () => {
  cy.get('a[href="/delete_account"]').click();
  cy.contains('b', 'Account Deleted!').should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
});
