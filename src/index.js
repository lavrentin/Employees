import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './routes';
import "./Scss/GlogalStyle.scss";

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <Routing />
  </Provider>
);
