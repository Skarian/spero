import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3399FF',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});
const theme = responsiveFontSizes(muiTheme);
export default theme;
