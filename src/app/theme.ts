import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    body2: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#2E7D32', // HeyFood green
    },
    text: {
      primary: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, Arial, sans-serif',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;