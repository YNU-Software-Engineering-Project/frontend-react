import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from 'styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  return (
      <div className={styles.Header}>
        <div className={styles.Header_left}>메뉴</div>
        <div className={styles.Header_center} onClick={() =>{navigate('homepage');}}>SPARK+SEED</div>
        <div className={styles.Header_right}>
          <div className={styles.alarm_icon}><NotificationsNoneIcon fontSize='large' /></div>
          <div className={styles.profile_icon}><AccountCircleOutlinedIcon fontSize='large' /></div>
          <div style={{
            borderLeft: '1px solid #000', 
            height: '45px',
            margin: '0 10px'
          }}></div>
          <div className={styles.post}>등록하기</div>
        </div>
      </div>  
  );
}

export default Header;