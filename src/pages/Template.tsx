import Header from 'components/template/Header';
import Footer from 'components/template/Footer';
import SideNav from 'components/template/SideNav';
import style from 'styles/template/template.module.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Template = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [openSideNav, setOpenSideNav] = useState(false);
  const handleSideNavToogle = () => {
    setOpenSideNav(!openSideNav);
  };

  return (
    <>
      <div className={style.wrapper}>
        <SideNav isOpen={openSideNav} onToogle={handleSideNavToogle} />
        <main>
          <Header isOpen={openSideNav} onToogle={handleSideNavToogle} />
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Template;
