import style from 'styles/common/Tag.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';

type ChipProps = {
  children: string;
  nthChild?: number;
  variant?: 'contained' | 'outlined';
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
};

const Chip: React.FC<ChipProps> = ({
  children,
  nthChild = 0,
  onClick,
  variant = 'contained',
  style: wrapperStyle,
}) => {
  const theme = {
    contained: {
      backgroundColor: nthChild % 2 ? '#F5F5F5' : '#B7B7B7',
    },
    outlined: {
      border: '1px solid black',
      color: 'black',
      borderColor: 'gray',
      ':hover': { borderColor: 'black' },
    },
  };

  return (
    <>
      <div
        className={style.tagBox}
        onClick={onClick}
        style={{ ...theme[variant], ...wrapperStyle }}
      >
        <a>{children}</a>
        <span className={style.cancelIcon}>
          <CancelIcon />
        </span>
      </div>
    </>
  );
};

export default Chip;
