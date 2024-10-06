import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import styles from 'styles/myPage/alarm.module.css'; 
import ProfileMenuBar from 'components/myPage/profileMenuBar';

function Alarm() {
  return (
    <div className={styles.alarm_container}>
      <ProfileMenuBar />
      <div className={styles.alarm}>
        <div className={styles.title}>알림</div>
        <div className={styles.del_all}>모두 삭제하기</div>

        <div className={styles.alarm_component}>
          <CancelOutlinedIcon className={styles.del_icon} />
          <div className={styles.top}>
            <div className={styles.name}>SpaekSeed</div>
            <div className={styles.time}>2024.08.24</div>
          </div>
          <div className={styles.content}>새로운 프로젝트를 시작해보세요.</div>
        </div>
      </div>
    </div>
  );
}

export default Alarm;
