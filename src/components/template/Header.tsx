import { useNavigate, Link, useLocation } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from 'styles/template/Header.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type HeaderProps = {
  isOpen: boolean;
  onToogle: () => void;
};

const Header: React.FC<HeaderProps> = ({ isOpen, onToogle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.leftMenu}>
          {'/' !== location.pathname && (
            <div onClick={handleBackBtn}>
              <ArrowBackIcon sx={{ fontSize: '48px' }} />
            </div>
          )}
          <div className={styles.menuBtn} onClick={onToogle}>
            <span>메뉴</span>
          </div>
        </div>
        <div className={styles.titleBox}>
          <Link to="/">SPARK+SEED</Link>
        </div>
        <div className={styles.etcBtn}>
          <div>
            <Link to="/mypage/alarm">
              <NotificationsNoneIcon sx={{ fontSize: '48px' }} />
            </Link>
          </div>
          <div>
            {/* 로그인 확인되면 라우팅 경로가 mypage로 바뀌어야함. */}
            <Link to="/login">
              <AccountCircleOutlinedIcon sx={{ fontSize: '48px' }} />
            </Link>
          </div>
          <div>
            {/* 로그인 확인되면 라우팅 경로가 create로 바뀌어야함. */}
            <Link to="/login">등록하기</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
