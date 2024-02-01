import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { ErrorHandlingProvider } from './error-modules/ui-error-module/ErrorHandlingProvider';
import React, { PropsWithChildren } from 'react';

export const GlobalProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <ErrorHandlingProvider>{children}</ErrorHandlingProvider>
  </ThemeProvider>
);
