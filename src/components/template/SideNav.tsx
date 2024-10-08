import style from 'styles/template/sideNav.module.css';
import { CancelOutlined } from '@mui/icons-material';

type SideNavProps = {
  isOpen: boolean;
  onToogle: () => void;
};

const SideNav: React.FC<SideNavProps> = ({ isOpen, onToogle }) => {
  return (
    <div className={style.wrapper}>
      <header>
        <CancelOutlined
          sx={{ fontSize: '48px', cursor: 'pointer' }}
          onClick={onToogle}
        />
      </header>
      <ul>
        <li>ㅣㅑㅣㅑ</li>
        <li>ㅣㅑㅣㅑ</li>
        <li>ㅣㅑㅣㅑ</li>
      </ul>
    </div>
  );
};

export default SideNav;
