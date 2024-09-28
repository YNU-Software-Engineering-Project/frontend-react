import style from 'styles/PostPage/Community.module.css';
import Button from 'components/common/Button';
import CreateIcon from '@mui/icons-material/Create';
import QuestionCard from './community/QuestionCard';
import WriteQuestion from './community/WriteQuestion';
import { useState } from 'react';

const Community = () => {


  //글쓰기 버튼
  const [showWriteModal,setShowWriteModal] = useState<boolean>(false);
  const handleCommentToggle = () =>{
    setShowWriteModal(!showWriteModal);
  }

  return (
    <>
      <div className={style.wrapper}>
        {<WriteQuestion/>}
        <header>
          <Button style={{ padding: '20px 30px' }} onClick={handleCommentToggle}>
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
};

export default Community;
