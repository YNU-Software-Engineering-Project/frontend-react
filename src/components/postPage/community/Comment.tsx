import { Avatar } from '@mui/material';
import style from 'styles/PostPage/community/comment.module.css';
import { CommentResponseDto } from 'apiTypes/data-contracts';
import { deleteComment } from 'api/deleteCommnet';

const Commnet: React.FC<CommentResponseDto> = ({
  commentId,
  content,
  nickname,
  createdAt,
}) => {
  const onClick = async () => {
    if (!commentId) return;
    await deleteComment(commentId);
  };
  return (
    <>
      <div className={style.wrapper}>
        <Avatar sx={{ marginRight: '10px' }}>{nickname}</Avatar>
        <main>
          <span>{nickname}</span>
          <span className={style.day}>{createdAt}</span>
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
