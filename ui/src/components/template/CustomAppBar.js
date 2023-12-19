import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
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
            <Button component={Link} to="/login" color="inherit">Вход</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
