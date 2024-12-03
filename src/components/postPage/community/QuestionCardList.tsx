import style from 'styles/PostPage/community/questionCardList.module.css';
import Button from 'components/common/Button';
import CreateIcon from '@mui/icons-material/Create';
import QuestionCard from './QuestionCard';
import { forwardRef, useEffect, useState } from 'react';
import {
  fetchCommunityQuestionsAtom,
  commuityQuestionsAtom,
} from 'atoms/commuityQuestionsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

type QuestionCardListPorps = {
  handleShow: () => void;
  fundingId: number;
};

const QuestionCardList = forwardRef<HTMLDivElement, QuestionCardListPorps>(
  ({ handleShow, fundingId }, ref) => {
    const questions = useAtomValue(commuityQuestionsAtom);
    const fetchQuestions = useSetAtom(fetchCommunityQuestionsAtom);
    useEffect(() => {
      fetchQuestions(fundingId);
    }, [fetchQuestions]);

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
            {questions.map(info => (
              <QuestionCard key={info.questionId} {...info} />
            ))}
          </main>
        </div>
      </>
    );
  },
);

export default QuestionCardList;
