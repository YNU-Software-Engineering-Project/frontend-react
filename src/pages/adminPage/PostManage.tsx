import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuBar from 'components/adminPage/menuBar';
import styles from 'styles/adminPage/PostManage.module.css'; // Import CSS Module

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

  const [currentPageWaiting, setCurrentPageWaiting] = useState(1);
  const [currentPageDone, setCurrentPageDone] = useState(1);
  const [currentPageInProgress, setCurrentPageInProgress] = useState(1);
  const cardsPerPage = 6;

  const totalPagesWaiting = Math.ceil(cards.filter(card => card.status === '심사 중').length / cardsPerPage);
  const totalPagesDone = Math.ceil(cards.filter(card => card.status === '심사 완료').length / cardsPerPage);
  const totalPagesInProgress = Math.ceil(cards.filter(card => card.status === '펀딩 진행 중').length / cardsPerPage);

  // Helper function to get the sliced cards for each page
  const getSlicedCards = (filteredCards: Card[], currentPage: number) => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  };

  // Filtered cards for each status
  const waitingCards = getSlicedCards(cards.filter(card => card.status === '심사 중'), currentPageWaiting);
  const doneCards = getSlicedCards(cards.filter(card => card.status === '심사 완료'), currentPageDone);
  const inProgressCards = getSlicedCards(cards.filter(card => card.status === '펀딩 진행 중'), currentPageInProgress);

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
              <div>-</div>
            </div> 
            <div className={styles.verticle_line} />
            <div className={styles.posting_status_container}>
              <div className={styles.done}>심사 완료</div>
              <div>-</div>
            </div> 
            <div className={styles.verticle_line} />
            <div className={styles.posting_status_container}>
              <div className={styles.ing}>펀딩 진행 중</div>
              <div>-</div>
            </div> 
            <div className={styles.verticle_line} />
          </div>
        </div>

        <div className={styles.postmanage_container}>
          <div className={styles.container_title}>심사대기</div>
          <div className={styles.container_content}>
            <ChevronLeftIcon className={styles.left} onClick={() => setCurrentPageWaiting(currentPageWaiting > 1 ? currentPageWaiting - 1 : currentPageWaiting)} />
            
            <div className={styles.card_container}>
              {waitingCards.map((card, index) => (
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
