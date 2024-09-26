import Button, { ButtonProps } from './Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type orderButtonProps = {
  children: React.ReactNode;
  isClicked: boolean;
  isDescending?: boolean;
  onClick: () => void;
};

const OrderButton: React.FC<orderButtonProps> = ({
  children,
  isClicked,
  isDescending,
  onClick,
}) => {
  return (
    <Button
      variant={isClicked ? 'contained' : 'outlined'}
      type="black"
      onClick={onClick}
    >
      {children}
      {isClicked && isDescending && <KeyboardArrowDownIcon />}
      {isClicked && (isDescending || <KeyboardArrowUpIcon />)}
    </Button>
  );
};

export default OrderButton;
