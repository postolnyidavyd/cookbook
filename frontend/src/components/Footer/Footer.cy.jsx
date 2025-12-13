import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('рендериться та має правильні посилання', () => {
    cy.mount(<Footer />);
    cy.contains('a', "Головна").should("have.attr", "href", "/");
    cy.contains('a', "Рецепти").should("have.attr", "href", "/recipes");
    cy.contains('a', "Плейлисти").should("have.attr", "href", "/playlists");
    cy.contains('a', "Кабінет").should("have.attr", "href", "/profile");

    //Перевірка зовніших посилань
    cy.get('a[href="https://www.instagram.com/"]').should("exist");
    cy.get('a[href="https://www.facebook.com/"]').should("exist");
    cy.get('a[href="https://www.youtube.com/"]').should("exist");
  })
})