describe('Ultraverse navigation and content', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore*',
      { fixture: 'explore.json' }
    ).as('explore')
  })

  it('renders NFT items on the Explore page', () => {
    cy.visit('/explore/')
    cy.wait('@explore')
    cy.contains('Cosmic Ape #1').should('be.visible')
    cy.contains('Neon Tiger #2').should('be.visible')
    cy.contains('2.5 ETH').should('be.visible')
  })

  it('has a working filter dropdown', () => {
    cy.visit('/explore/')
    cy.wait('@explore')
    cy.get('#filter-items').should('exist')
  })

  it('navigates to an item detail page when an NFT is clicked', () => {
    cy.visit('/explore/')
    cy.wait('@explore')
    cy.get('.nft__item_preview', { timeout: 10000 }).should('be.visible')
    cy.get('a[href*="/item-details/"]').first().click()
    cy.url().should('include', '/item-details/')
  })
})