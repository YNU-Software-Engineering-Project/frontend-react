import PostList from 'components/homePage/PostList';
import PostInfo from 'components/homePage/PostInfo';
import ServiceInfo from 'components/homePage/ServiceInfo';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

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
