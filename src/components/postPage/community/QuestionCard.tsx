import style from 'styles/PostPage/community/questionCard.module.css';
import {
  ChatBubbleOutline,
  ArrowDropUp,
  ArrowDropDown,
  DeleteOutline,
} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import CommnetList from './CommentList';
import { useState } from 'react';

const QuestionCard = () => {
  // 삭제 버튼 부분
  const handleDeleteButton = () => {
    // API연결 부분
  };

  // 댓글 부분
  const commentNumber = 1;
  const [showComment, setShowComment] = useState<boolean>(false);
  const handleShowCommentButtonToggle = () => {
    setShowComment(!showComment);
  };

  return (
    <>
      <div className={style.wrapper}>
        <header>
          <div>
            <Avatar
              src="https://picsum.photos/200/300"
              sx={{ marginRight: '10px' }}
            >
              nickname
            </Avatar>
            <span>제목</span>
          </div>
          <DeleteOutline
            onClick={handleDeleteButton}
            sx={{ fontSize: '32px', cursor: 'pointer' }}
          />
        </header>
        <main>
          질문내용질문내용질문내용 질문내용질문내용질문내용
          질문내용질문내용질문내용 질문내용질문내용질문내용
          질문내용질문내용질문내용 질문내용질문내용질문내용
          질문내용질문내용질문내용
        </main>
        <footer>
          <div
            className={style.inlineFlex}
            onClick={handleShowCommentButtonToggle}
          >
            <div>
              <Badge badgeContent={commentNumber} color="primary">
                <ChatBubbleOutline
                  sx={{ fontSize: '32px', cursor: 'pointer' }}
                />
              </Badge>
            </div>
            {showComment && (
              <ArrowDropDown sx={{ fontSize: '32px', cursor: 'pointer' }} />
            )}
            {showComment || (
              <ArrowDropUp sx={{ fontSize: '32px', cursor: 'pointer' }} />
            )}
          </div>
        </footer>
        {showComment && <CommnetList />}
      </div>
    </>
  );
};

export default QuestionCard;
