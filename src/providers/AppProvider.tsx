/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/themes/default';
import { store } from '../store';

import { ToastProvider } from '../hooks/useToast';

const AppProvider = ({ children }: any) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  </Provider>
);

export default AppProvider;
