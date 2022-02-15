describe('GitHub User Finder', () => {
  context('No errors', () => {
    const repos = require('../fixtures/repos.json')

    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://api.github.com/users/wlsf82',
        { fixture: 'user' }
      ).as('getUser')
      cy.intercept(
        'GET',
        'https://api.github.com/users/wlsf82/repos?page=1&per_page=4',
        { fixture: 'repos' }
      ).as('getRepos')
      cy.visit('/github-user-finder')
      cy.get('input[type="text"]#user')
        .as('userInputField')
        .type('wlsf82{enter}')
      cy.wait('@getUser')
      cy.wait('@getRepos')
      cy.wait('@getRepos')
    })

    it('finds users\'s repos', () => {
      const { name } = require('../fixtures/user.json')
      cy.contains('h1', name).should('be.visible')
    })

    it('searches for a specific repo', () => {
      cy.intercept(
        'GET',
        'https://api.github.com/repos/wlsf82/repo-1',
        { body: repos[0] }
      ).as('getRepo')

      cy.contains('button[type="submit"]', 'Procurar')
        .as('searchButton')
        .should('be.disabled')
      cy.get('input[type="text"][placeholder="Busque por nome de repositório"]')
        .type('repo-1')
      cy.get('@searchButton')
        .should('be.enabled')
        .click()
      cy.wait('@getRepo')

      cy.contains('h2', repos[0].full_name).should('be.visible')
    })

    it('searches for an unnexistent repo', () => {
      cy.intercept(
        'GET',
        'https://api.github.com/repos/wlsf82/repo-1000',
        { body: [] }
      ).as('getNoRepoFound')

      cy.get('input[type="text"][placeholder="Busque por nome de repositório"]')
        .type('repo-1000{enter}')
      cy.wait('@getNoRepoFound')

      cy.contains('Repositório não encontrado.').should('be.visible')
    })

    it('shows starred repos', () => {
      const starredRepos = require('../fixtures/starredRepos.json')
      cy.intercept(
        'GET',
        'https://api.github.com/users/wlsf82/starred?page=1&per_page=4',
        { fixture: 'starredRepos' }
      ).as('starredRepos')

      cy.contains('button', 'Starred').click()
      cy.wait('@starredRepos')

      cy.contains('h2', starredRepos[0].full_name).should('be.visible')
      cy.contains('h2', starredRepos[1].full_name).should('be.visible')
    })

    it('changes to grid view then back to list view', () => {
      cy.get('nav')
        .next()
        .find('button svg')
        .last()
        .click()

      cy.get(`a[href="${repos[0].html_url}"]`)
        .parent()
        .as('repos')
        .should('have.css', 'display', 'grid')

      cy.get('nav')
        .next()
        .find('button svg')
        .first()
        .click()

      cy.get('@repos') .should('have.css', 'display', 'flex')

    })

    it('goes back to the homepage', () => {
      cy.contains('a', 'Voltar').click()

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/github-user-finder/`)
      cy.get('@userInputField').should('be.visible')
    })
  })

  context('Error scenarios', () => {
    it('erros when rate limit is exceeded and redirects to the homepage', () => {
      cy.intercept(
        'GET',
        'https://api.github.com/users/wlsf82',
        { statusCode: 403 }
      ).as('getUser')
      cy.visit('/github-user-finder')
      cy.get('input[type="text"]#user')
        .as('userInputField')
        .type('wlsf82{enter}')
      cy.wait('@getUser')

      cy.contains('Erro')
        .should('be.visible')
        .parent()
        .find('p')
        .should('have.text', 'Usuário não encontrado. Redirecionando...')
      cy.get('header')
        .next()
        .find('main main:contains(Usuário não encontrado)')
        .should('have.length', 3)
        .and('be.visible')

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/github-user-finder/`)
      cy.get('@userInputField').should('be.visible')
    })
  })
})

