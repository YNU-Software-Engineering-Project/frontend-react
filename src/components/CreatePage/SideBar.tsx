import React, { useEffect, useState } from 'react';
import styles from 'styles/CreatePage/sideBar.module.css';
import { Link } from 'react-router-dom';
import { Api } from 'apiTypes/Api';
import { useAtom } from 'jotai';
import { fundingIdAtom } from './atoms';

const SideBar: React.FC = () => {
  const [fundingId] = useAtom(fundingIdAtom);
  const [projectName, setProjectName] = useState('');
  const [mainImage, setMainImg] = useState<string | null>(); // 대표 이미지
  const api = new Api();

  useEffect(()=>{
    if(fundingId){
      api.getProject(fundingId)
      .then((response)=>{
        if(response.data.main_url)
          setMainImg(response.data.main_url || '');
        if(response.data.title)
          setProjectName(response.data.title || '');
      })
      .catch((error) => {
        console.error('프로젝트 정보를 불러오는 중 오류가 발생했습니다:', error);
      });
    }
  })

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarTop}>
        <div
          className={styles.productImg}
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: '#d9d9d9',
            backgroundImage: mainImage ? `url(${mainImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
          {projectName || '상품명'}
        </div>
      </div>

      <div className={styles.sideBarBottom}>
        <button>
          <Link to="/createPage/schedule">일정</Link>
        </button>
        <button>
          <Link to="/termsOfService/PolicyInfo">심사 정책 및 요금 안내</Link>
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
