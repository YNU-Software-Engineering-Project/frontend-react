import PostList from 'components/homePage/PostList';
import PostInfo from 'components/homePage/PostInfo';
import ServiceInfo from 'components/homePage/ServiceInfo';
import Header from 'components/template/Header';
import Footer from 'components/template/Footer';

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
