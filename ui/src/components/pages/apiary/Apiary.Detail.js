import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../api';
import { Hive } from '../../Hive';
import { ApiaryPlan } from '../../map/ApiaryPlan';

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
      <Typography variant="h3" component="h3">Пчелин {apiary.name} ({apiary.number}) {apiary.type}</Typography>
      
      {apiary ? <ApiaryPlan hives={apiary.hives}/> : ''}      

    </div>
  )
}