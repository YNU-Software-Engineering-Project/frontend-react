import style from 'styles/common/Tag.module.css';
import CancelIcon from '@mui/icons-material/Cancel';

type TagProps = {
  children: string;
  nthChild?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Tag: React.FC<TagProps> = ({ children, nthChild = 0, onClick }) => {
  return (
    <>
      <div
        className={style.tagBox}
        onClick={onClick}
        style={
          nthChild % 2 == 0
            ? { backgroundColor: '#F5F5F5' }
            : { backgroundColor: '#B7B7B7' }
        }
      >
        <a>{children}</a>
        <span className={style.cancelIcon}>
          <CancelIcon />
        </span>
      </div>
    </>
  );
};

export default Tag;
