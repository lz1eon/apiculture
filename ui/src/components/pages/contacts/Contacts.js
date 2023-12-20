import Typography from '@mui/material/Typography';
import logo from '../home/honeycomb.jpg';
import '../home/home.css';

export const Contacts = () => {
    return (
        <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>        
            <Typography variant="h3" component="h2">За връзка с нас</Typography>
            <Typography variant="h6" component="h2">Пишете ни на stefanov.alexandre@gmail.com</Typography>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}