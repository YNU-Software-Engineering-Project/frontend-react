import MuiButton from '@mui/material/Button';

type ButtonProps = {
  children: string;
  style?: React.CSSProperties;
  variant?: 'contained' | 'outlined';
  type?: 'black' | 'white';
};

const variantStyle = {
  contained: {
    black: {
      color: '#f5f5f5',
      backgroundColor: '#2c2c2c',
      ':hover': { backgroundColor: 'black' },
      borderColor: 'gray',
    },
    white: {
      color: '#1E1E1E',
      backgroundColor: '#E3E3E3',
      ':hover': { backgroundColor: '#dcdcdc' },
      borderColor: '#767676',
    },
  },
  outlined: {
    black: {
      color: 'black',
      borderColor: 'gray',
      ':hover': { borderColor: 'black' },
    },
    white: {
      color: 'black',
      borderColor: 'gray',
      ':hover': { borderColor: 'black' },
    },
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  variant = 'contained',
  type = 'black',
}) => {
  return (
    <>
      <MuiButton
        variant={variant}
        color="primary"
        sx={{
          fontFamily: 'GmarketSans',
          padding: '2px 8px',
          minWidth: '0px',
          fontWeight: 'normal',
          fontSize: '16px',
          ...variantStyle[variant][type],
          ...style,
        }}
      >
        {children}
      </MuiButton>
    </>
  );
};

export default Button;
