import { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuBar from 'components/adminPage/menuBar';
import styles from 'styles/adminPage/PostManage.module.css';
import { Admin } from 'apiTypes/Admin';
import { Token } from 'apiTypes/Token';
import { GetFundingStateCountData } from 'apiTypes/data-contracts';

function PostManage() {
  interface Card {
    title: string;
    status: '펀딩 진행 중' | '심사 중' | '심사 완료';
  }

  const [cards] = useState<Card[]>([
    { title: '펀딩 제목 1', status: '펀딩 진행 중' },
    { title: '펀딩 제목 2', status: '펀딩 진행 중' },
    { title: '펀딩 제목 3', status: '심사 중' },
    { title: '펀딩 제목 4', status: '심사 완료' },
    { title: '펀딩 제목 5', status: '심사 완료' },
    { title: '펀딩 제목 6', status: '펀딩 진행 중' },
    { title: '펀딩 제목 7', status: '펀딩 진행 중' },
    { title: '펀딩 제목 8', status: '펀딩 진행 중' },
    { title: '펀딩 제목 9', status: '심사 완료' },
    { title: '펀딩 제목 10', status: '펀딩 진행 중' },
    { title: '펀딩 제목 11', status: '펀딩 진행 중' },
    { title: '펀딩 제목 12', status: '심사 완료' },
    { title: '펀딩 제목 13', status: '심사 완료' },
    { title: '펀딩 제목 14', status: '심사 중' },
    { title: '펀딩 제목 15', status: '심사 완료' },
    { title: '펀딩 제목 16', status: '심사 중' },
    { title: '펀딩 제목 17', status: '펀딩 진행 중' },
    { title: '펀딩 제목 18', status: '펀딩 진행 중' },
    { title: '펀딩 제목 19', status: '심사 중' },
    { title: '펀딩 제목 20', status: '펀딩 진행 중' },
    { title: '펀딩 제목 21', status: '펀딩 진행 중' },
    { title: '펀딩 제목 22', status: '심사 완료' },
    { title: '펀딩 제목 23', status: '심사 완료' },
    { title: '펀딩 제목 24', status: '심사 중' },
    { title: '펀딩 제목 25', status: '펀딩 진행 중' },
    { title: '펀딩 제목 26', status: '심사 완료' },
    { title: '펀딩 제목 27', status: '심사 완료' },
    { title: '펀딩 제목 28', status: '심사 중' },
    { title: '펀딩 제목 29', status: '심사 중' },
    { title: '펀딩 제목 30', status: '펀딩 진행 중' },
    { title: '펀딩 제목 31', status: '펀딩 진행 중' },
    { title: '펀딩 제목 32', status: '심사 완료' },
    { title: '펀딩 제목 33', status: '펀딩 진행 중' },
    { title: '펀딩 제목 34', status: '심사 완료' },
    { title: '펀딩 제목 35', status: '심사 중' },
    { title: '펀딩 제목 36', status: '심사 완료' },
    { title: '펀딩 제목 37', status: '펀딩 진행 중' },
    { title: '펀딩 제목 38', status: '심사 완료' },
    { title: '펀딩 제목 39', status: '펀딩 진행 중' },
  ]);
  const [waitingCards, setWaitingCards] = useState<Card[]>([]);
  const [doneCards, setDoneCards] = useState<Card[]>([]);
  const [inProgressCards, setInProgressCards] = useState<Card[]>([]);

  const [currentPageWaiting, setCurrentPageWaiting] = useState(1);
  const [currentPageDone, setCurrentPageDone] = useState(1);
  const [currentPageInProgress, setCurrentPageInProgress] = useState(1);
  const cardsPerPage = 6;

  // const totalPagesWaiting = Math.ceil(cards.filter(card => card.status === '심사 중').length / cardsPerPage);
  // const totalPagesDone = Math.ceil(cards.filter(card => card.status === '심사 완료').length / cardsPerPage);
  // const totalPagesInProgress = Math.ceil(cards.filter(card => card.status === '펀딩 진행 중').length / cardsPerPage);
  const totalPagesWaiting = Math.ceil(waitingCards.length / cardsPerPage);
  const totalPagesDone = Math.ceil(doneCards.length / cardsPerPage);
  const totalPagesInProgress = Math.ceil(inProgressCards.length / cardsPerPage);

  const getSlicedCards = (filteredCards: Card[], currentPage: number) => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  };

  // Filtered cards for each status
  // const waitingCards = getSlicedCards(cards.filter(card => card.status === '심사 중'), currentPageWaiting);
  // const doneCards = getSlicedCards(cards.filter(card => card.status === '심사 완료'), currentPageDone);
  // const inProgressCards = getSlicedCards(cards.filter(card => card.status === '펀딩 진행 중'), currentPageInProgress);
  const slicedWaitingCards = getSlicedCards(waitingCards, currentPageWaiting);
  const slicedDoneCards = getSlicedCards(doneCards, currentPageDone);
  const slicedInProgressCards = getSlicedCards(inProgressCards, currentPageInProgress);

  const adminApi = new Admin();
  const [fundingStateCount, setFundingStateCount] = useState({
    review: 0,
    reviewCompleted: 0,
    onGoing: 0,
  });

  useEffect(() => {
    handleFundingStateCount();
    handleFundingByState('REVIEW');
    handleFundingByState('REVIEW_COMPLETED');
    handleFundingByState('ONGOING');
  }, []);
  //펀딩 상태에 해당하는 개수 출력
  const handleFundingStateCount = () => {
    const params = Token.getHeaderParms;
    adminApi.getFundingStateCount(params)
    .then(response => {
      const data = response.data?.data;

      if (data) {
        setFundingStateCount({
          review: data.review ?? 0,              
          reviewCompleted: data.reviewCompleted ?? 0,
          onGoing: data.onGoing ?? 0,               
        });
      } else {
        console.error('Invalid response data');
        alert('펀딩 상태에 따른 개수 조회 실패: 데이터가 없습니다.');
      }
    })
    .catch(error => {
      //펀딩 상태에 따른 개수 조회 실패
      console.error('펀딩 상태에 따른 개수 조회 실패:', error);
      if (error.response) {
        alert(`펀딩 상태에 따른 개수 조회 실패: ${error.response.message}`);
      } else {
        alert('펀딩 상태에 따른 개수 조회 실패: 네트워크 오류');
      }
    })
  }
  //펀딩 상태에 해당하는 걸로 이동하게 ㄱ 그게 이거 인듯 getFundingByState; REVIEW: 심사 대기, REVIEW_COMPLETED: 심사 완료, ONGOING: 진행 중
  const handleFundingByState = (state: string, keyword: string = '', page: number = 0, size: number = 6) => {
    const query ={
      keyword,
      state,
      page,
      size,
    };
    const params = Token.getHeaderParms;
    adminApi.getFundingByState(query, params)
    .then(response =>{
      if (response.data && response.data.data) {
        console.log('펀딩 상태에 따른 게시물 리스트:', response.data.data);
        const fetchedCards = response.data.data.map((funding: any) => {
          let status: '펀딩 진행 중' | '심사 중' | '심사 완료';
          
          // Map the API state to the correct status
          switch (funding.state) {
            case 'REVIEW':
              status = '심사 중';
              break;
            case 'REVIEW_COMPLETED':
              status = '심사 완료';
              break;
            case 'ONGOING':
              status = '펀딩 진행 중';
              break;
            default:
              throw new Error(`Unknown funding state: ${funding.state}`);
          }

          return {
            title: funding.title,
            status
          };
        });

        if (state === 'REVIEW') {
          setWaitingCards(fetchedCards);
        } else if (state === 'REVIEW_COMPLETED') {
          setDoneCards(fetchedCards);
        } else if (state === 'ONGOING') {
          setInProgressCards(fetchedCards);
        }
      } else {
        console.log('No fundings found for this state');
      }
    })
    .catch(error => {
      console.log('펀딩상태 및 펀딩 조회 실패',error);
      if (error.response) {
        alert(`펀딩상태 및 펀딩 조회 실패: ${error.response.message}`);
      } else {
        alert('펀딩상태 및 펀딩 조회 실패: 네트워크 오류');
      }
    })
  }

  //펀딩 상태 변경=changeFundingState - 게시물 보는 곳애서 변경되게 ㄱ -> 태화가 만든 페이지로 이동되게 해야 함
  const handleChangeFundingState = (fundingId: number, state: string) => {
    const query = {
      state,
    };
    const params = Token.getHeaderParms;
  
    adminApi.changeFundingState(fundingId, query, params)
      .then((response) => {
        alert('펀딩 상태 변경 성공');
        console.log('펀딩 상태 변경 성공:', response);
      })
      .catch((error) => {
        console.error('펀딩 상태 변경 실패:', error);
        if (error.response) {
          alert(`펀딩 상태 변경 실패: ${error.response.data.message}`);
        } else {
          alert('펀딩 상태 변경 실패: 네트워크 오류');
        }
      });
  };  

  return (
    <div className={styles.admin_container}>
      <MenuBar />

      <div className={styles.posting_content}> 
        <div className={styles.posting_status}>
          <div className={styles.posting_status_title}>상태</div> 
          <div className={styles.title_verticle_line} />
          <div className={styles.posting_status_component}>
            <div className={styles.posting_status_container}>
              <div className={styles.waiting}>심사 대기</div>
              <div>{fundingStateCount.review}</div>
            </div> 
            <div className={styles.verticle_line} />
            <div className={styles.posting_status_container}>
              <div className={styles.done}>심사 완료</div>
              <div>{fundingStateCount.reviewCompleted}</div>
            </div> 
            <div className={styles.verticle_line} />
            <div className={styles.posting_status_container}>
              <div className={styles.ing}>펀딩 진행 중</div>
              <div>{fundingStateCount.onGoing}</div>
            </div> 
            <div className={styles.verticle_line} />
          </div>
        </div>

        <div className={styles.postmanage_container}>
          <div className={styles.container_title}>심사대기</div>
          <div className={styles.container_content}>
            <ChevronLeftIcon className={styles.left} onClick={() => setCurrentPageWaiting(currentPageWaiting > 1 ? currentPageWaiting - 1 : currentPageWaiting)} />
            
            <div className={styles.card_container}>
              {/* {waitingCards.map((card, index) => ( */}
              {slicedWaitingCards.map((card, index) => (
                <div key={index} className={styles.status_card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_img}></div>
                    <div className={styles.card_text}>
                      <div className={styles.card_title}>{card.title}</div>
                      <div className={card.status === '심사 중' ? styles.card_status_waiting : card.status === '심사 완료' ? styles.card_status_done : styles.card_status_ing}>
                        {card.status}
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className={styles.go_to_preview} />
                </div>
              ))}
            </div>

            <ChevronRightIcon className={styles.right} onClick={() => setCurrentPageWaiting(currentPageWaiting < totalPagesWaiting ? currentPageWaiting + 1 : currentPageWaiting)} />
          </div>
        </div>

        <div className={styles.postmanage_container}>
          <div className={styles.container_title}>심사완료</div>
          <div className={styles.container_content}>
            <ChevronLeftIcon className={styles.left} onClick={() => setCurrentPageDone(currentPageDone > 1 ? currentPageDone - 1 : currentPageDone)} />
            
            <div className={styles.card_container}>
              {doneCards.map((card, index) => (
                <div key={index} className={styles.status_card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_img}></div>
                    <div className={styles.card_text}>
                      <div className={styles.card_title}>{card.title}</div>
                      <div className={card.status === '심사 중' ? styles.card_status_waiting : card.status === '심사 완료' ? styles.card_status_done : styles.card_status_ing}>
                        {card.status}
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className={styles.go_to_preview} />
                </div>
              ))}
            </div>

            <ChevronRightIcon className={styles.right} onClick={() => setCurrentPageDone(currentPageDone < totalPagesDone ? currentPageDone + 1 : currentPageDone)} />
          </div>
        </div>

        <div className={styles.postmanage_container}>
          <div className={styles.container_title}>펀딩 진행 중</div>
          <div className={styles.container_content}>
            <ChevronLeftIcon className={styles.left} onClick={() => setCurrentPageInProgress(currentPageInProgress > 1 ? currentPageInProgress - 1 : currentPageInProgress)} />
            
            <div className={styles.card_container}>
              {inProgressCards.map((card, index) => (
                <div key={index} className={styles.status_card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_img}></div>
                    <div className={styles.card_text}>
                      <div className={styles.card_title}>{card.title}</div>
                      <div className={card.status === '심사 중' ? styles.card_status_waiting : card.status === '심사 완료' ? styles.card_status_done : styles.card_status_ing}>
                        {card.status}
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className={styles.go_to_preview} />
                </div>
              ))}
            </div>

            <ChevronRightIcon className={styles.right} onClick={() => setCurrentPageInProgress(currentPageInProgress < totalPagesInProgress ? currentPageInProgress + 1 : currentPageInProgress)} />
          </div>
        </div>

      </div>
    </div>    
  );
}

export default PostManage;
