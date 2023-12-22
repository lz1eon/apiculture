import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../api';
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
      <Typography variant="h4" component="h4" style={{marginTop: '10px', marginBottom: '20px'}}>        
        {apiary.name}  {apiary.type == 1 ? 'Подвижен' : ''}
      </Typography>
      
      <ApiaryPlan apiary={apiary}/>
    </div>
  )
}