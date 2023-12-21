import React from 'react';
import { Link } from 'react-router-dom';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import HiveIcon from '@mui/icons-material/Hive';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import EditNoteIcon from '@mui/icons-material/EditNote';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ProfileMenu from '../ProfileMenu';


export const UserAppBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="h6" component={Link} to="/apiaries">
            <HiveIcon style={{marginRight: '5px'}}/>
            Пчелини
          </Button>

          <Button variant="h6" component={Link} to="/hives">
            <HouseSidingIcon style={{marginRight: '5px'}}/>
            Кошери
          </Button>

          <Button variant="h6" component={Link} to="/hives">
            <EmojiNatureIcon style={{marginRight: '5px'}}/>
            Майки
          </Button>

          <Button variant="h6" component={Link} to="/hives">
            <EditNoteIcon style={{marginRight: '5px'}}/>
            Прегледи
          </Button>

          <div style={{marginLeft: 'auto'}}>           
            <Button variant="h6" component={Link} to="/hives">
              <QueryStatsIcon style={{marginRight: '5px'}}/>
              Статистика
            </Button>              
            <ProfileMenu/>          
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
