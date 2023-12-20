import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


export const AnonymousAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="h6" component={Link} to="/">
            Начало
          </Button>
          <div style={{marginLeft: 'auto'}}>
            <Button variant="h6" component={Link} to="/about">
              За Пчелинът
            </Button>
            <Button variant="h6" component={Link} to="/contacts">
              Свържи се с нас
            </Button>
            <div style={{display: 'inline', marginRight: '5px'}}>|</div>          
            <Button component={Link} to="/register" color="inherit">Регистрация</Button>            
            <Button component={Link} to="/login" color="inherit">Вход</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
