import style from 'styles/template/sideNav.module.css';
import { CancelOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type SideNavProps = {
  isOpen: boolean;
  onToogle: () => void;
};

type navItem = {
  label: string;
  key: string;
  path: string;
};

const SideNav: React.FC<SideNavProps> = ({ isOpen, onToogle }) => {
  const navItems: navItem[] = [
    { label: '홈', key: 'homePage', path: '/' },
    { label: '개시물 보기', key: 'postListPage', path: '/postList' },
    { label: '마이페이지', key: 'myPage', path: '/mypage' },
    { label: '개시물 작성하기', key: 'createPage', path: '/CreatePage' },
    { label: '서비스 소개', key: 'termsOfService', path: '/termsOfService' },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollPosition(scrollY); // 스크롤을 20% 정도로 천천히 따라오게 설정
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={style.wrapper}
        style={{
          transform: `translateY(${scrollPosition}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <header>
          <CancelOutlined
            sx={{ fontSize: '48px', cursor: 'pointer' }}
            onClick={onToogle}
          />
        </header>
        <div className={style.navSection}>
          <div className={style.navBox}>
            <ul>
              {navItems.map(item => (
                <li key={`${item.label}-${item.key}`}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
