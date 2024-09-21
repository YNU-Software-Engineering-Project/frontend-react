import style from 'styles/PostListPage/Postlist.module.css';
import FilterBox from 'components/postListPage/FilterBox';
import PostList from 'components/postListPage/PostList';

const PostListPage = () => {
  return (
    <>
      <div className={style.wrapper}>
        <FilterBox />
        {/* <PostList /> */}
      </div>
    </>
  );
};

export default PostListPage;
