import Typography from '@mui/material/Typography';
import { List, ListItem, Paper } from '@mui/material';
import logo from '../home/beekeeper.jpg';
import '../home/home.css';

export const About = () => {
    return (
        <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>        
            <Typography variant="h3" component="h2">За Пчелинът</Typography>
            <Typography variant="h4" component="h2">Как Пчелинът може да Ви бъде полезен</Typography>
            <List sx={{ listStyleType: 'disc' }}>
                <ListItem sx={{ display: 'list-item' }}>Бързо и лесно въвеждане на информация от полевата работа</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Споделяне на информация за пчелните семейства с цел онлайн консултация</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Споделяне на информация относно болести и пръскане с инсектициди с другите потребители</ListItem>
            </List>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}