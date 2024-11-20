import Sidebar from 'components/CreatePage/SideBar';
import styles from 'styles/CreatePage/createPage.module.css';
import { Outlet } from 'react-router-dom';
const CreatePage: React.FC = () => {
  return (
    <>
      <div className={styles.createPage}>
        <Sidebar />
        <div style={{ height: '100%', width: '885px' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CreatePage;
