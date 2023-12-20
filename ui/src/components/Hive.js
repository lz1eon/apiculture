import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Hive = ({hive}) => {
    return (
        <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {hive.model}
          </Typography>
          <Typography variant="h5" component="div">
            {hive.number}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {hive.type}
          </Typography>
          <Typography variant="body2">
            {hive.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Подбробно</Button>
        </CardActions>
      </Card>
    );
}