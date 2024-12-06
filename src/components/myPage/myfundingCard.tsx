import 'styles/myPage/myfundingCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

function MyfundingCard({ cards }:{ cards: { title?: string; mainImage?: string; state?: string; fundingId?: number }[] }) {
    // const cards = Array(13).fill({ title: '펀딩 제목', status: '심사 중' });
    // const cards = title ? [{ title, mainImage, state, fundingId }] : [];
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4;
  
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const getStatusLabel = (status?: string) => {
      switch (status) {
          case 'review':
              return '심사 중';
          case 'reviewCompleted':
              return '심사 완료';
          case 'onGoing':
              return '펀딩 진행 중';
          default:
              return status;
      }
  };

  return (
    <div className='myfunding_card_container'>
          
          <div className='container_content'>
            <ChevronLeftIcon  className='left' onClick={prevPage} style={{ cursor: 'pointer' }}/>
            
            <div className="card_container">
            {currentCards.length > 0 ? (
              currentCards.map((card, index) => (
                  <div key={index} className="status_card">
                      <div className="card_content">
                          <div className="card_img"
                          style={{ backgroundImage: `url(${card.mainImage})` }}></div>
                          <div className="card_text">
                              <div className="card_title">{card.title}</div>
                              <div className={
                                  card.state === 'review' ? 'card_status_waiting' :
                                  card.state === 'reviewCompleted' ? 'card_status_done' :
                                  card.state === 'onGoing' ? 'card_status_ing' :
                                  ''}>
                                {getStatusLabel(card.state)}</div>
                          </div>
                      </div>
                      <ChevronRightIcon className='go_to_preview' style={{ cursor: 'pointer' }}
                      onClick={() => window.location.href = `/post/${card.fundingId}`}/>
                  </div>
              ))
            ) : (
              <div className="empty_card_message">내 펀딩 항목이 없습니다.</div>
            )}
            </div>

            <ChevronRightIcon className='right' onClick={nextPage} style={{ cursor: 'pointer' }}/>
          </div>
        </div>
  );
}

export default MyfundingCard;