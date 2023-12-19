import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/useAuth';


export const UserAppBar = () => {

  
  const navigateTo = useNavigate();
  const { logout } = useAuth();

  const logoutUser = () => {
    let api_base = process.env.REACT_APP_API_BASE;

    fetch(`${api_base}/logout/`, {
      method: 'post',
      body: '',
    })
      .then(() => {
        logout();
        navigateTo('/')
      });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="h6" component={Link} to="/apiaries">
            Пчелини
          </Button>

          <div style={{marginLeft: 'auto'}}>
            <Button onClick={logoutUser} color="inherit">Изход</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
