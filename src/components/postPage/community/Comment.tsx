import { Avatar } from '@mui/material';
import style from 'styles/PostPage/community/comment.module.css';

type commentProps = {
  avatorImgUrl: string;
  nickname: string;
  day: string;
  content: string;
  onClick: () => void;
};

const Commnet: React.FC<commentProps> = ({
  avatorImgUrl,
  nickname,
  day,
  content,
  onClick,
}) => {
  return (
    <>
      <div className={style.wrapper}>
        <Avatar
          src={avatorImgUrl}
          sx={{ marginRight: '10px' }}
        >{`${nickname[0]}`}</Avatar>
        <main>
          <span>{nickname}</span>
          <span className={style.day}>{`${day}일전`}</span>
          <div className={style.divider} />
          <p>{content}</p>
        </main>
        <button type="submit" onClick={onClick}>
          지우기
        </button>
      </div>
    </>
  );
};

export default Commnet;
