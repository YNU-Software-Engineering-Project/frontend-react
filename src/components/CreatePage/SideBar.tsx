import React from 'react';
import styles from 'styles/CreatePage/sideBar.module.css';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarTop}>
        <div
          className={styles.productImg}
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: '#d9d9d9',
          }}
        />
        <div
          className={styles.productName}
          style={{
            fontSize: '16px',
            height: '57px',
            alignContent: 'center',
            padding: '35px 0',
          }}
        >
          상품명
        </div>
      </div>

      <div className={styles.sideBarBottom}>
        <button>
          <Link to="/createPage/schedule">일정</Link>
        </button>
        <button>
          <Link to="/">심사 정책 및 요금 안내</Link>
        </button>
        <button>
          <Link to="/createPage/projectInfo">프로젝트 정보 작성</Link>
        </button>
        <button>
          <Link to="/createPage/story">스토리 작성</Link>
        </button>
        <button>
          <Link to="/createPage/reward">리워드 설계</Link>
        </button>
        <button>
          <Link to="/createPage/policy">정책</Link>
        </button>
        <button>
          <Link to="/createPage/setting">설정</Link>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
