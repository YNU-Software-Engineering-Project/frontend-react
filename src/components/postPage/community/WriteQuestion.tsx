import style from 'styles/PostPage/community/writeQuestion.module.css';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Close } from '@mui/icons-material';

type WriteQuestionPorps = {
  handleShow: () => void;
};
const WriteQuestion = forwardRef<HTMLDivElement, WriteQuestionPorps>(
  ({ handleShow }, ref) => {
    //제목 입력 부분
    const [title, setTitle] = useState<string>('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (title === value.trim()) return;
      setTitle(value);
    };

    //내용 입력 부분
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState<string>('');

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

    // 내용 입력 후 저장 버튼
    const handleSave = () => {
      handleShow();
    };

    return (
      <>
        <div className={style.wrapper} ref={ref}>
          <header>
            <div className={`${style.flexEnd} ${style.icon}`}>
              <Close
                sx={{ fontSize: '48px', cursor: 'pointer' }}
                onClick={handleShow}
              />
            </div>
            <div className={style.divider} />
            <div className={style.titleBox}>
              <span>제목:</span>
              <input
                type="text"
                placeholder="제목"
                onChange={handleTitleChange}
                value={title}
              />
            </div>
          </header>

          <div className={style.textBox}>
            <textarea
              ref={textareaRef}
              placeholder="질문 내용을 적어주세요."
              value={inputValue}
              onChange={handleInputOnChange}
            />
            <button
              type="button"
              className={style.flexEnd}
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </>
    );
  },
);

export default WriteQuestion;
