import styles from 'styles/adminPage/menuBar.module.css';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <div className={styles.menu_bar}>
        <div className={styles.menu_bar_top}>관리자 로그인 상태</div>
        <div className={styles.horizontal_line_CAC4D0}></div>
        <div><Link to="/admin">summary</Link></div>
        <div className={styles.horizontal_line}></div>
        <div><Link to="/admin/membermange">회원관리</Link></div>
        <div className={styles.horizontal_line}></div>
        <div><Link to="/admin/postmanage">게시물 관리</Link></div>
        <div className={styles.horizontal_line}></div>
        <div><Link to="/admin/chat">채팅</Link></div>
        <div className={styles.horizontal_line}></div>
    </div>  
  );
}

export default MenuBar;