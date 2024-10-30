import Button from 'components/common/Button';
import style from 'styles/homePage/PostInfo.module.css';
import { Link } from 'react-router-dom';

const PostInfo = () => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.contents}>
          <div className={style.main}>
            <p>숨어 있는 재능을 발굴해 보세요</p>
            <p>
              아직 발굴되지 않은 아이디어를 찿고 후원하세요. 많은 창작물들이
              세상에 나오지 못하고 있습니다. 후원 보상도 받고 운이 좋다면 후원을
              넘어 좋은 협력 관계로 발전할 수도 있어요.
            </p>
            <Link to="/postList">
              <Button>더보기</Button>
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img of idea"
          />
        </div>
      </div>
    </>
  );
};

export default PostInfo;
