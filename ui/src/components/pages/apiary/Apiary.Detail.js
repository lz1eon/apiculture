import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../api';
import { Hive } from '../../Hive';
import { Markers } from '../../map/Markers';

export const ApiaryDetail = () => {
  const params = useParams();
  const [apiary, setApiary] = useState({});

  useEffect(() => {
    client.getApiary(params.id)
      .then((response) => {
        setApiary(response.data);
      });
  }, []);
  

  return (        
    <div className={"flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white"}>
      <Typography variant="h2" component="h2">Пчелин {apiary.name} ({apiary.number}) {apiary.type}</Typography>
      
      {apiary ? <Markers hives={apiary.hives}/> : ''}      

      {/* <ImageList  cols={3} rowHeight={165}>
          {apiary.hives?.map((hive) => (                    
              <ImageListItem key={hive.id}>                        
                <Hive key={hive.id} hive={hive}/>
              </ImageListItem>                    
          ))}
      </ImageList> */}

    </div>
  )
}