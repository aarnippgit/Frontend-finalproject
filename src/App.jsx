import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main:cyan['A100'],
      },
    },
  });

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="b6">Personal Trainer</Typography>
        </Toolbar>
        <nav>
        <ThemeProvider theme={theme}>
          <Button variant="contained" size="large">
            <Link to="/customer" style={{textDecoration: 'none' }}>Customers</Link>
          </Button>
          <Button variant="contained" size="large">
            <Link to="/training" style={{textDecoration: 'none' }}>Training</Link>
          </Button>
          </ThemeProvider>
        </nav>
        </AppBar>
      <CssBaseline />
      <Outlet />
    </Container>
  )
}

export default App