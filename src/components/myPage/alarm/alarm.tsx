import styles from 'styles/myPage/alarm.module.css'; 
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import { Api } from 'apiTypes/Api';
import { useState, useEffect } from 'react';
import { Token } from 'apiTypes/Token';
import { NotificationDataDto } from 'apiTypes/data-contracts';
import NotificationItem from 'components/myPage/alarm/notificationItem';

function Alarm() {
  const api = new Api();
  const [notifications, setNotifications] = useState<NotificationDataDto[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);
  
  //알림 목록 조회
  const fetchNotifications = async (page: number=0, size: number=10) => {
    setLoading(true);
    const params = Token.getHeaderParms;
    try {
      const response = await api.getNotifications({ page, size }, params);
      setNotifications(response.data.data);
      // console.log(response);
    } catch (error) {
      console.error('알림 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  //모든 알림 삭제
  const handleDeleteAll = async () => {
    const params = Token.getHeaderParms;
    try {
      await api.deleteNotifications(params);
      setNotifications([]);
      alert('모든 알림을 삭제했습니다.');
    } catch (error) {
      console.error('모든 알림 삭제 실패:', error);
    }
  };

  //특정 알림 삭제
  const handleDeleteNotification = async (notificationId: number) => {
    const params = Token.getHeaderParms;
    try {
      await api.deleteNotification(notificationId, params);
      setNotifications((prev) => {
        const updatedNotifications = prev ? prev.filter((notification) => notification.notificationId !== notificationId) : [];
        return updatedNotifications;
      });
      alert('알림이 삭제되었습니다.');
    } catch (error) {
      console.error(`${notificationId} 알림 삭제 실패`, error);
    }
  };

  return (
    <div className={styles.alarm_container}>
      <ProfileMenuBar />
      <div className={styles.alarm}>
        <div className={styles.title}>알림</div>
        <div className={styles.del_all} onClick={handleDeleteAll}>모두 삭제하기</div>

        {notifications && notifications.length > 0 ? (
              <div className={styles.alarm_component}>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
                    notificationId={notification.notificationId}
                    message={notification.message}
                    createdAt={notification.createdAt}
                    onDelete={handleDeleteNotification}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty_notification}>알림이 없습니다.</div>
            )}

      </div>
    </div>
  );
}

export default Alarm;
