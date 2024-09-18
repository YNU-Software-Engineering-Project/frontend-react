import styles from 'styles/homePage/HomePage.module.css';
import PostList from 'components/homePage/PostList';
import PostInfo from 'components/homePage/PostInfo';
import ServiceInfo from 'components/homePage/ServiceInfo';

const Homepage = () => {
  return (
    <>
      <div>
        <PostList />
      </div>
      <div>
        <ServiceInfo />
      </div>
      <div>
        <PostInfo />
      </div>
    </>
  );
};

export default Homepage;
