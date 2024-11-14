import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css'
import { Link, Outlet } from 'react-router-dom';


function App() {
  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="b6">Personal Trainer</Typography>
        </Toolbar>
        <nav>
          <Link to={"/customer"}>Customers</Link>
          <Link to={"/training"}>Training</Link>
        </nav>
        </AppBar>
      <CssBaseline />
      <Outlet />
    </Container>
  )
}

export default App