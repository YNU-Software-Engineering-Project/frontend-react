import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import styles from 'styles/myPage/alarm.module.css';
import { NotificationDataDto } from 'apiTypes/data-contracts';

interface NotificationItemProps extends NotificationDataDto {
  onDelete: (notificationId: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notificationId, message, createdAt, onDelete }) => {
  const handleDeleteClick = () => {
    if (notificationId) {
      onDelete(notificationId);
    } else {
      console.error('Notification ID is undefined');
    }
  };

  return (
    <div className={styles.alarm_component}>
      <CancelOutlinedIcon className={styles.del_icon} onClick={handleDeleteClick} />
      <div className={styles.top}>
        <div className={styles.name}>SpaekSeed</div>
        <div className={styles.time}>{createdAt}</div>
      </div>
      <div className={styles.content}>{message}</div>
    </div>
  );
};

export default NotificationItem;
