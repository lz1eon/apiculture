import Typography from '@mui/material/Typography';
import client from '../../../api';
import { Apiary } from '../../Apiary'; 
import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

export const ApiaryList = () => {
    const [apiaries, setApiaries] = useState([]);

    useEffect(() => {
        client.getApiaries()
          .then((response) => {
            setApiaries(response.data);
          });
    }, []);
  

    return (
        <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>
            <Typography variant="h2" component="h2">Пчелини</Typography>
            <ImageList sx={{ width: 700, height: 450 }} cols={2} rowHeight={165}>
                {apiaries?.map((apiary) => (                    
                    <ImageListItem key={apiary.id}>                        
                        <Link to={`/apiaries/${apiary.id}`}>
                            <Apiary key={apiary.id} apiary={apiary}/>
                        </Link>
                    </ImageListItem>                    
                ))}
            </ImageList>
        </div>        
    )
}