describe('GitHub User Finder', () => {
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
    ).as('getUserRepos')
    cy.visit('/')
    cy.get('input[type="text"]').type('wlsf82{enter}')
    cy.wait('@getUser')
    cy.wait('@getUserRepos')
  })

  it('finds user repos', () => {
    cy.contains('h1', 'Chris Doe').should('be.visible')
  })
})
