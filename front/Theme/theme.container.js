import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './theme.global';
import THEME from './theme.object';

export default function Theme ({ children }) {

  return (
    <ThemeProvider theme={THEME}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children: PropTypes.node,
};
