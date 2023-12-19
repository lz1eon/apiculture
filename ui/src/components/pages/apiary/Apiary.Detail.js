import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const ApiaryDetail = (props) => {
    console.log(props)
    return (        
        <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>
            <Typography variant="h1" component="h2">Пчелин {props.id}</Typography>
        </div>
    )
}