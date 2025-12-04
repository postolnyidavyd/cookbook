import PasswordInput from './PasswordInput.jsx';

describe('<PasswordInput', () => {
  it('рендериться правильно', () => {
    cy.mount(<PasswordInput />);
    cy.get('input[type="password"]').should('exist');
  }
  );
  it('при нажатті на кнопку змінюється тип інпуту', () => {
    cy.mount(<PasswordInput />);
    cy.get('input[type="password"]').should('exist');
    cy.get('input[type="password"]').type('MySecretPassword');
    cy.get('button[aria-label="Показати пароль"]').click();
    cy.get('input[type="text"]').should('exist').and('have.value','MySecretPassword');
    cy.get('button[aria-label="Сховати пароль"]').click();
    cy.get('input[type="password"]').should('exist').and('have.value','MySecretPassword');
  });
  it('передає пропси інпуту', () => {
    cy.mount(<PasswordInput placeholder="Введіть пароль" />);
    cy.get('input').should('have.attr', 'placeholder', 'Введіть пароль');
  });
});