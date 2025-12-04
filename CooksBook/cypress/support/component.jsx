import '@cypress/code-coverage/support';
import '../../src/index.css';
import { mount } from 'cypress/react';
import { MemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTestStore } from './test-utils.js';

Cypress.Commands.add('mount', (component, options = {}) => {
  const {
    // Додаємо можливість передавати пропси для MemoryRouter
    routerProps = { initialEntries: ['/'] },
    // Додаємо можливість передавати пропси для Redux Provider
    initialState = {},
    reduxStore = createTestStore(initialState),
    // Додаємо можливість передавати дата роутер
    router,
    ...mountOptions
  } = options;

  let content;
  if (router) {
    content = (<RouterProvider router={router} />);
  } else {
    content = <MemoryRouter {...routerProps}> {component}</MemoryRouter>;
  }
  const wrappedComponent = <Provider store={reduxStore}>{content}</Provider>;
  return mount(wrappedComponent, mountOptions);
});
