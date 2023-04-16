describe('Cats', () => {

    it('displays a "No cats available" message when "Select Breed" is selected', () => {
        cy.visit('http://localhost:8080/');
        cy.get('#breed').select('Select Breed');
        cy.get('.no-cats').should('have.text', 'No cats available')
    });

    it('displays a list of cats when a breed is selected', () => {
        cy.visit('http://localhost:8080/');
        cy.get('#breed').select('Abyssinian');
        cy.get('.cat').should('have.length', 10);
    });

    it('displays a list of cats when there\'s a breed parameter ', () => {
        cy.visit('http://localhost:8080/?breed=abys');
        cy.get('#breed').select('Abyssinian');
        cy.get('.cat').should('have.length', 10);
    });

    it('show the load more if there are more that 10 results', () => {
        cy.visit('http://localhost:8080/');
        cy.get('#breed').select('Aegean');
        cy.get('.cat').should('have.length', 5);
        cy.get('.loadmore').should('not.exist');
        cy.get('#breed').select('Abyssinian');
        cy.get('.cat').should('have.length', 10);
        cy.get('.loadmore').should('be.visible');
        cy.get('.loadmore').click();
        cy.get('.cat').should('have.length.greaterThan', 10);
    });

    it('go to cat details and back to home', () => {
        cy.visit('http://localhost:8080/');
        cy.get('#breed').select('Abyssinian');
        cy.get('.cat').should('have.length', 10);
        cy.get('.cat').first().find('.btn-primary').click();

        cy.get('.cat-details .breed-name').should('exist').and('not.be.empty');
        cy.get('.cat-details .breed-origin').should('exist').and('not.be.empty');
        cy.get('.cat-details .breed-temperament').should('exist').and('not.be.empty');
        cy.get('.cat-details .breed-description').should('exist').and('not.be.empty');
        cy.get('.cat-details .cat-img')
            .should('exist')
            .should('have.attr', 'src')
            .should('not.be.empty')

        cy.get('.back').click().wait(1000);
        cy.url().should('include', 'breed=abys');
    });

    it('go to cat details and validate the value', () => {
        cy.visit('http://localhost:8080/unPP08xOZ');
        cy.get('.cat-details .breed-name').should('have.text','Abyssinian');
        cy.get('.cat-details .breed-origin').should('have.text','Origin:Egypt');
        cy.get('.cat-details .breed-temperament').should('have.text', 'Active, Energetic, Independent, Intelligent, Gentle');
        cy.get('.cat-details .breed-description').should('have.text', 'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.');
        cy.get('.cat-details .cat-img')
            .should('exist')
            .should('have.attr', 'src')
            .should('not.be.empty')

        cy.get('.back').click().wait(1000);
        cy.url().should('include', 'breed=abys');


        const expectedMessage = "Apologies but we could not load the cat details for you at this time! Miau!";
        cy.visit('http://localhost:8080/asd');
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal(expectedMessage);
        });

        cy.get('.back').click().wait(1000);
        cy.url().should('include', 'breed=');
        cy.get('.no-cats').should('have.text', 'No cats available')
    });


});
