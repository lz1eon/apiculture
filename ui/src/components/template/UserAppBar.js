import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import HiveIcon from '@mui/icons-material/Hive';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditNoteIcon from '@mui/icons-material/EditNote';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

          <Button variant="h6" component={Link} to="/hives">
            <ChecklistIcon style={{marginRight: '5px'}}/>
            Задачи
          </Button>

          <div style={{marginLeft: 'auto'}}>
            <Button variant="h6" component={Link} to="/hives">
              <WbSunnyIcon style={{marginRight: '5px'}}/>
              Времето
            </Button>              
            <Button variant="h6" component={Link} to="/hives">
              <QueryStatsIcon style={{marginRight: '5px'}}/>
              Статистика
            </Button>              
            <MailOutlineIcon style={{marginRight: "15px"}}/>
            <NotificationsIcon style={{marginRight: "15px"}}/>
            <ProfileMenu/>          
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
