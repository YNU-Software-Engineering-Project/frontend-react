import { Box, LinearProgress, Typography } from '@mui/material';

const CustomProgressBar = ({ value }: { value: number }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="primary" sx={{ marginRight: 2 }}>
        {`${value}%`}
      </Typography>
      
      <Box sx={{ width: '100%', position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 12,
            borderRadius: 8,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1976d2',
            },
          }}
        />
        
        {[20, 40, 60, 80].map((point, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${point}%`,
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: point <= value ? '#1976d2' : '#90caf9',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomProgressBar;
