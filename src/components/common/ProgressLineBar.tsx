import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 3, color: 'blue' }}>
        <LinearProgress variant="determinate" {...props} color="inherit" />
      </Box>
      <Box
        sx={{ fontFamily: 'GmarketSans', fontWeight: 'light' }}
      >{`${Math.round(props.value)}%`}</Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
