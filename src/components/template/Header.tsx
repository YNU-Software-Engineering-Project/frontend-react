import { useNavigate, Link, useLocation } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from 'styles/template/Header.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Token } from 'apiTypes/Token';

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
  const handleProfileIcon = () => {
    const token = Token.getToken;
    console.log(token);
    if (token) {
      // 로그인되어 있을 경우, 마이페이지로 이동
      navigate('/mypage'); 
    } else {
      // 로그인되어 있지 않을 경우, 로그인 페이지로 이동
      navigate('/login'); 
    }
  };
  const handleRegister = () => {
    const token = Token.getToken;
    console.log(token);
    if (token) {
      // 로그인되어 있을 경우, 등록하기로 이동
      navigate('/CreatePage'); 
    } else {
      // 로그인되어 있지 않을 경우, 로그인 페이지로 이동
      navigate('/login'); 
    }
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
          <div
            className={`${styles.menuBtn} ${isOpen ? styles.fade : ''}`}
            onClick={onToogle}
          >
            <span>메뉴</span>
          </div>
        </div>
        <div className={styles.titleBox}>
          <Link to="/">SPARK+SEED</Link>
        </div>
        <div className={`${styles.etcBtn} ${isOpen ? styles.fade : ''}`}>
          <div>
            <Link to="/mypage/alarm">
              <NotificationsNoneIcon sx={{ fontSize: '48px' }} />
            </Link>
          </div>
          <div style={{cursor:'pointer'}} onClick={handleProfileIcon}>
            {/* 로그인 확인되면 라우팅 경로가 mypage로 바뀌어야함. */}
            
              <AccountCircleOutlinedIcon sx={{ fontSize: '48px' }} />
            
          </div>
          <div style={{cursor:'pointer'}} onClick={handleRegister}>
            {/* 로그인 확인되면 라우팅 경로가 create로 바뀌어야함. */}
            등록하기
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
