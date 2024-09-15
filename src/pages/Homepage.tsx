import styles from 'styles/homePage/HomePage.module.css';
import PostList from 'components/homePage/PostList';

const Homepage = () => {
  return (
    <>
      <div>
        <PostList />
      </div>
      <div>contents2</div>
      <div>contents3</div>
    </>
  );
};

export default Homepage;
