import {
  getRandomNumber,
  getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
  });

  it.only('Exemplos de Logs', () => {
    cy.log('STEP 1 :: PGATS AUTOMACAO WEB CY LOG')
    cy.log('STEP 2 :: PGATS AUTOMACAO WEB CY LOG')

    cy.log(`getRandomNumber: ${getRandomNumber()}`)
    cy.log(`getRandomEmail: ${getRandomEmail()}`)

    cy.log(`Nome do usuário: ${userData.name}`)
    cy.log(`Email do usuário: ${userData.email}`)

    cy.fixture('imagem-exemplo.png').as('imagem')
  });

});