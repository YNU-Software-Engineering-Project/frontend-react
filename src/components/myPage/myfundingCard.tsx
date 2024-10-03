import 'styles/myPage/myfundingCard.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

function MyfundingCard() {
    const cards = Array(13).fill({ title: '펀딩 제목', status: '심사 중' });
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
  return (
    <div className='myfunding_card_container'>
          
          <div className='container_content'>
            <ChevronLeftIcon  className='left' onClick={prevPage} style={{ cursor: 'pointer' }}/>
            
            <div className="card_container">
              {currentCards.map((card, index) => (
                  <div key={index} className="status_card">
                      <div className="card_content">
                          <div className="card_img"></div>
                          <div className="card_text">
                              <div className="card_title">{card.title}</div>
                              <div className={
                                  card.status === '심사 중' ? 'card_status_waiting' :
                                  card.status === '심사 완료' ? 'card_status_done' :
                                  card.status === '펀딩 진행 중' ? 'card_status_ing' :
                                  ''}>
                                {card.status}</div>
                          </div>
                      </div>
                      <ChevronRightIcon className='go_to_preview' style={{ cursor: 'pointer' }}/>
                  </div>
              ))}
            </div>

            <ChevronRightIcon className='right' onClick={nextPage} style={{ cursor: 'pointer' }}/>
          </div>
        </div>
  );
}

export default MyfundingCard;