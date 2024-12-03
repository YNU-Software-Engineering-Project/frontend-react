import style from 'styles/PostPage/Community.module.css';
import QuestionCardList from './community/QuestionCardList';
import WriteQuestion from './community/WriteQuestion';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Community = () => {
  const { id } = useParams();

  //slider 제어부분
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const slide_1 = useRef<HTMLDivElement>(null);
  const slide_2 = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setShowQuestion(!showQuestion);
    if (!slide_1.current || !slide_2.current) return;
    if (showQuestion) {
      slide_1.current.setAttribute('style', `left: ${-680}px`);
      slide_2.current.setAttribute('style', `left: ${-680}px`);
    } else {
      slide_1.current.setAttribute('style', `left: ${0}px`);
      slide_2.current.setAttribute('style', `left: ${0}px`);
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <QuestionCardList
          ref={slide_1}
          handleShow={handleToggle}
          fundingId={Number(id)}
        />
        <WriteQuestion ref={slide_2} handleShow={handleToggle} />
      </div>
    </>
  );
};

export default Community;
