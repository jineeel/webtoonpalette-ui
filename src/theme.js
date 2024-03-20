import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8fb5e3',
      light: '#d1e2f7',
      dark: '#8fb5e3'
    },
    secondary: {
      main: '#a37ae0',
      light: '#d6bcfc',
      dark: '#9977cb',
    },
    dark: {
      main: '#333333',
      light: '#3A3A3A',
      dark: '#282828',
    },
    red: {
      main: "#fec9b9",
      light: "##db1632",
      dark: "#C90000",
    },

  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif"
  } 
});
export default theme;