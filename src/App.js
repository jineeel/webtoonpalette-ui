import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import root from './router/root';
import theme from './theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={root} />
    </ThemeProvider>
  );
}

export default App;
