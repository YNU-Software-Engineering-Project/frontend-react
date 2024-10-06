import style from 'styles/PostPage/community/questionCardList.module.css';
import Button from 'components/common/Button';
import CreateIcon from '@mui/icons-material/Create';
import QuestionCard from './QuestionCard';
import { forwardRef, useState } from 'react';

type QuestionCardListPorps = {
  handleShow: () => void;
};

const QuestionCardList = forwardRef<HTMLDivElement, QuestionCardListPorps>(
  ({ handleShow }, ref) => {
    return (
      <>
        <div className={style.wrapper} ref={ref}>
          <header>
            <Button
              style={{ padding: '20px 30px', marginRight: '10px' }}
              onClick={handleShow}
            >
              <CreateIcon /> 글쓰기
            </Button>
          </header>
          <div className={style.divider} />
          <main>
            <QuestionCard />
          </main>
        </div>
      </>
    );
  },
);

export default QuestionCardList;
