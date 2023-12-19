import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './bee.jpg';
import './home.css';

export const Home = () => {
  return (        
    <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>       
      <Typography variant="h1" component="h2">Пчелинът</Typography>
      <img src={logo} className="App-logo" alt="logo" />
      <br/>
      <Button component={Link} to="/login" variant="contained">Вход</Button>
      {/* <br/>
      <Button>Изпробвай с пробен акаунт</Button> */}
    </div>
  )
}