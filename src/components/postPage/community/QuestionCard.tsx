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
import { FC, useEffect, useState } from 'react';
import { QuestionResponseDto } from 'apiTypes/data-contracts';
import { deleteQuestion } from 'api/deleteQuestion';

const QuestionCard: FC<QuestionResponseDto> = ({
  questionId,
  nickname,
  profileImage,
  createdAt,
  commentCount,
  content,
}) => {
  const writeTime = createdAt?.split('T1').join('  ');

  // 삭제 버튼 부분
  const handleDeleteButton = async () => {
    if (!questionId) return;
    const response = await deleteQuestion(questionId);
  };

  // 댓글 부분
  const [showComment, setShowComment] = useState<boolean>(false);
  const handleShowCommentButtonToggle = () => {
    setShowComment(!showComment);
  };

  return (
    <>
      <div className={style.wrapper}>
        <header>
          <div>
            <Avatar src={profileImage} sx={{ marginRight: '10px' }} />
            <span>{nickname}</span>
          </div>
          <div>
            <span className={style.day}>{writeTime}</span>
            <DeleteOutline
              onClick={handleDeleteButton}
              sx={{ fontSize: '32px', cursor: 'pointer' }}
            />
          </div>
        </header>
        <main>{content}</main>
        <footer>
          <div
            className={style.inlineFlex}
            onClick={handleShowCommentButtonToggle}
          >
            <div>
              <Badge badgeContent={commentCount} color="primary">
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
        {showComment && questionId && <CommnetList questionId={questionId} />}
      </div>
    </>
  );
};

export default QuestionCard;
