import styles from 'styles/myPage/profileMenuBar.module.css';
import { Link } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

function ProfileMenuBar() {
  return (
    <div className={styles.profile_menu_bar}>
      <div className={styles.profile_img}></div>
      <div className={styles.profile_name}>nickname</div>
      <div className={styles.horizon_line2} />
      <div className={styles.profile_menu}>
        <div>
          <Link to="/mypage">
            <SettingsOutlinedIcon /> 개인정보 수정
          </Link>
        </div>
        <div className={styles.horizon_line} />
        <div>
          <Link to="/mypage/chatting">
            <ChatBubbleOutlineOutlinedIcon /> 채팅
          </Link>
        </div>
        <div className={styles.horizon_line} />
        <div>
          <Link to="/mypage/wishlist">
            <FavoriteBorderOutlinedIcon /> 위시리스트
          </Link>
        </div>
        <div className={styles.horizon_line} />
        <div>
          <Link to="/mypage/joined">
            <PaidOutlinedIcon /> 참여한 펀딩
          </Link>
        </div>
        <div className={styles.horizon_line} />
        <div>
          <Link to="/mypage/myfunding">
            <FolderOutlinedIcon /> 내 펀딩 관리
          </Link>
        </div>
        <div className={styles.horizon_line} />
        <div>
          <Link to="/mypage/alarm">
            <NotificationsNoneOutlinedIcon /> 알림
          </Link>
        </div>
        <div className={styles.horizon_line} />
      </div>
    </div>
  );
}

export default ProfileMenuBar;
