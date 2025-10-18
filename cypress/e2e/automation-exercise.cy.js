describe('Automation Exercise', () => {
    it('Login de Usuário com e-mail e senha corretos', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        const nomeDoUsuario = "QA Tester"

        cy.get('i.fa-user').parent().should('contain', nomeDoUsuario)
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get(':nth-child(10) > a')
            .should('be.visible')
            .and('have.text', `Logged in as ${nomeDoUsuario}`);

        cy.contains('b', nomeDoUsuario)
        cy.contains(`Logged in as ${nomeDoUsuario}`).should('be.visible')
        cy.contains(`Logged in as ${nomeDoUsuario}`).should('be.visible')
    });

    it('Login de Usuário com e-mail e senha incorretos', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password')
    });
});
