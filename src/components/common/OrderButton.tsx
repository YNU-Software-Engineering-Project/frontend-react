import Button from './Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactNode, FC } from 'react';

type orderButtonProps = {
  children: ReactNode;
  isClicked: boolean;
  isDescending?: boolean;
  onClick: () => void;
};

const OrderButton: FC<orderButtonProps> = ({
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
      {isClicked && isDescending && <KeyboardArrowUpIcon />}
      {isClicked && (isDescending || <KeyboardArrowDownIcon />)}
    </Button>
  );
};

export default OrderButton;
