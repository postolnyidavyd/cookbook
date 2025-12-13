import { useState } from 'react';
import Steps from './Steps';

describe('<Steps />', () => {
  it('відображає кроки коректно та обробляє видалення', () => {
    const onRemoveSpy = cy.spy().as('onRemove');
    const steps = [
      { name: 'Крок 1', description: 'Опис 1' },
      { name: 'Крок 2', description: 'Опис 2' }
    ];

    cy.mount(
      <Steps
        steps={steps}
        previews={{}}
        onRemove={onRemoveSpy}
        onAdd={cy.spy()}
        onChangeName={cy.spy()}
        onChangeDesc={cy.spy()}
        onChangeImage={cy.spy()}
      />
    );

    cy.get('h5').should('have.length', 2);
    cy.contains('1 крок').should('be.visible');

    cy.get('#0-step-name').should('have.value', 'Крок 1');
    cy.get('#1-step-description').should('have.value', 'Опис 2');

    cy.contains('2 крок').parent().find('button').click();
    cy.get('@onRemove').should('have.been.calledWith', 1);
  });

  it('обробляє введення тексту та додавання нових кроків', () => {
    const Wrapper = () => {
      const [steps, setSteps] = useState([{ name: '', description: '' }]);

      const handleAdd = () => {
        setSteps([...steps, { name: '', description: '' }]);
      };

      const handleNameChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index].name = value;
        setSteps(newSteps);
      };

      const handleDescChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index].description = value;
        setSteps(newSteps);
      };

      return (
        <Steps
          steps={steps}
          previews={{}}
          onAdd={handleAdd}
          onChangeName={handleNameChange}
          onChangeDesc={handleDescChange}
          onRemove={() => {}}
          onChangeImage={() => {}}
        />
      );
    };

    cy.mount(<Wrapper />);

    cy.get('#0-step-name').type('Закипʼятити воду');
    cy.get('#0-step-name').should('have.value', 'Закипʼятити воду');

    cy.get('#0-step-description').type('100 градусів');
    cy.get('#0-step-description').should('have.value', '100 градусів');

    cy.contains('Додати крок').click();
    cy.get('h5').should('have.length', 2);
    cy.contains('2 крок').should('be.visible');
  });

  it('обробляє завантаження зображення', () => {
    const onChangeImageSpy = cy.spy().as('onChangeImage');
    const steps = [{ name: '', description: '' }];
    const previews = { 0: 'blob:url' };

    cy.mount(
      <Steps
        steps={steps}
        previews={previews}
        onChangeImage={onChangeImageSpy}
        onAdd={() => {}}
        onRemove={() => {}}
        onChangeName={() => {}}
        onChangeDesc={() => {}}
      />
    );

    cy.get('img[alt="Прев\'ю зображення"]')
      .should('have.attr', 'src', 'blob:url');

    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file'),
      fileName: 'step.png',
      mimeType: 'image/png',
    }, { force: true });

    cy.get('@onChangeImage').should('have.been.calledWith', 0);
  });
});