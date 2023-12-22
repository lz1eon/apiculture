import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Apiary = ({apiary}) => {
    return (
        <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {apiary.number}
          </Typography>
          <Typography variant="h5" component="div">
            {apiary.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {apiary.hives.length} кошера
          </Typography>
          <Typography variant="body2">
            Предстоящи задачи: 4
            <br/>
            Последна проверка: 08.09.20023
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Подбробно</Button>
        </CardActions>
      </Card>
    );
}