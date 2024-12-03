import { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import style from 'styles/PostPage/community/commnetList.module.css';
import Commnet from './Comment';
import {
  commuityCommentAtom,
  fetchCommunityCommentAtom,
} from 'atoms/communityCommentAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { createComment } from 'api/createComment';

const CommnetList = ({ questionId }: { questionId: number }) => {
  const commentList = useAtomValue(commuityCommentAtom);
  const fetchComment = useSetAtom(fetchCommunityCommentAtom);

  useEffect(() => {
    if (!questionId) return;
    fetchComment(questionId);
  }, [fetchComment]);

  // form 댓글 작성 부분
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const data = {
      content: inputValue,
    };
    const response = await createComment(questionId, data);
    setInputValue('');
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputValue]);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.inputBox}>
          <Avatar
            src="https://picsum.photos/2/200/300"
            sx={{ marginRight: '10px' }}
            className={style.flexEnd}
          >
            nickname
          </Avatar>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              placeholder="댓글을 적어주세요."
              value={inputValue}
              onChange={handleInputOnChange}
            />
            <button type="submit" className={style.flexEnd}>
              입력
            </button>
          </form>
        </div>
        <div className={style.commetBox}>
          {commentList.map(info => (
            <Commnet key={info.commentId} {...info} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CommnetList;
