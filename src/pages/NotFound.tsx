import { Link } from 'react-router-dom';
import style from 'styles/notFoundPage/notfound.module.css';

const NotFound = () => {
  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.title}>404 - Page Not Found</h1>
      <p className={style.description}>
        죄송합니다. 찾을 수 없는 페이지입니다.
      </p>
      <Link to="/" className={style.backLink}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
