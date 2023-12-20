import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';
import { User } from '../models/user';
import client from '../api';


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = useNavigate();
  const { user, logoutUser } = useAuth();

  const logout = () => {
    client.logout()
      .then(() => {
        logoutUser();
        navigateTo('/')
      });
  }

  return (
    <span>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : 'menu-appbar'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{color: 'white'}}
        onClick={handleClick}
      >
        <AccountCircleIcon style={{marginRight: "5px"}}/>
        { user?.first_name }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon/>
            </ListItemIcon>
          <ListItemText>Профил</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon/>
            </ListItemIcon>
          <ListItemText>Настройки</ListItemText>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon/>
            </ListItemIcon>
          <ListItemText>Изход</ListItemText>
        </MenuItem>
      </Menu>
    </span>
  );
}