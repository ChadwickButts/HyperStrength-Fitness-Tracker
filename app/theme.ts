'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: { light: true, dark: false },
  cssVariables: true,
  palette: {
    primary: {
      main: '#dc4d00',
    },
    secondary: {
      main: '#373A40',
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '1rem'
        }
      }
    }
  },
});

export default theme;
