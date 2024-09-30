import { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import style from 'styles/PostPage/community/commnetList.module.css';
import Commnet from './Comment';

const CommnetList = () => {
  // form 댓글 작성 부분
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    console.log(inputValue);
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

  // commnet 부분
  const handleDeleteComment = () => {};

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
          <Commnet
            avatorImgUrl="https://picsum.photos/5/200/300"
            nickname="닉네임"
            day="3"
            content="오늘은 좋은 아침입니다. 서포터님 질문 감사합니다. ~~~ 무슨 내용~~~ 입니다. \n\n\n"
            onClick={handleDeleteComment}
          />
        </div>
      </div>
    </>
  );
};

export default CommnetList;
