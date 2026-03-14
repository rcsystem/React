import { createTheme } from '@mui/material/styles';

export const temaApp = createTheme({
  palette: {
    primary: {
      main: '#18273A',
    },
    secondary: {
      main: '#475569',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
});
