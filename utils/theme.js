import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const muiTheme = createMuiTheme({
  breakpoints: {
    values: {
      xl: 1200,
      lg: 992,
      md: 768,
      sm: 576,
      xs: 0,
    },
  },
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
      default: '#f0f5ff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },

  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
        textTransform: 'capitalize',
      },
    },
  },
});
const theme = responsiveFontSizes(muiTheme);
export default theme;
