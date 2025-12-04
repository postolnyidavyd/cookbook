import GeneralInfo from './GeneralInfo';
import { useState } from 'react';

describe('<GeneralInfo />', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      name: '',
      description: '',
      time: '',
      difficulty: '',
      coverPreview: '',
      onChange: cy.spy().as('onChange'),
      onImageAdd: cy.spy().as('onImageAdd'),
      onImageRemove: cy.spy().as('onImageRemove'),
    };
  });

  it('відображає всі поля та мітки', () => {
    cy.mount(<GeneralInfo {...defaultProps} />);

    cy.contains('Загальна інформація').should('be.visible');
    cy.contains('label', 'Назва рецепту').should('be.visible');
    cy.contains('label', 'Опис рецепту').should('be.visible');
    cy.contains('label', 'Час приготування').should('be.visible');
    cy.contains('label', 'Складність приготування').should('be.visible');
  });

  it('відображає передані значення', () => {
    cy.mount(
      <GeneralInfo
        {...defaultProps}
        name="Борщ"
        description="Дуже смачний"
        time="120"
        difficulty="Складно"
      />
    );

    cy.get('#recipe-name').should('have.value', 'Борщ');
    cy.get('#recipe-desc').should('have.value', 'Дуже смачний');
    cy.get('#cooking-time').should('have.value', '120');
    cy.get('#recipe-difficulty').should('have.value', 'Складно');
  });


  it('викликає onChange при введенні тексту', () => {
    const TestWrapper = () => {
      const [state, setState] = useState({
        name: '',
        description: '',
        time: '',
      });

      const handleChange = (field, value) => {
        setState((prev) => ({ ...prev, [field]: value }));
        defaultProps.onChange(field, value);
      };

      return (
        <GeneralInfo
          {...defaultProps}
          name={state.name}
          description={state.description}
          time={state.time}
          onChange={handleChange}
        />
      );
    };

    cy.mount(<TestWrapper />);


    cy.get('#recipe-name').type('Суп');
    cy.get('@onChange').should('have.been.calledWith', 'name', 'Суп');

    cy.get('#recipe-desc').type('Опис страви');
    cy.get('@onChange').should('have.been.calledWith', 'description', 'Опис страви');

    cy.get('#cooking-time').type('45');
    cy.get('@onChange').should('have.been.calledWith', 'time', '45');
  });

  it('викликає onChange при виборі складності', () => {
    cy.mount(<GeneralInfo {...defaultProps} />);

    cy.get('#recipe-difficulty').select('Легко');
    cy.get('@onChange').should('have.been.calledWith', 'difficulty', 'Легко');
  });

  it('викликає onImageAdd при виборі файлу', () => {
    cy.mount(<GeneralInfo {...defaultProps} />);

    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file'),
      fileName: 'cover.jpg',
      mimeType: 'image/jpeg',
    }, { force: true });

    cy.get('@onImageAdd').should('have.been.called');
  });

  it('відображає превʼю та викликає onImageRemove при кліку на фото', () => {
    const propsWithImage = {
      ...defaultProps,
      coverPreview: 'blob:http://localhost:5173/fake-url'
    };

    cy.mount(<GeneralInfo {...propsWithImage} />);

    cy.get('img[alt="Прев\'ю зображення"]')
      .should('be.visible')
      .and('have.attr', 'src', 'blob:http://localhost:5173/fake-url')
      .click();

    cy.get('@onImageRemove').should('have.been.called');
  });
});