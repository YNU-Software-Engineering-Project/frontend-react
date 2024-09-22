import React, { useState } from 'react';
import './PostManage.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function PostManage() {
  const cards = Array(13).fill({ title: '펀딩 제목', status: '심사 중' });
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // 페이지에 따라 표시할 카드 데이터 추출
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // 총 페이지 수
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // 페이지 변경 함수
  const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  return (
    <div className='admin_container'>
      <div className='menu_bar'>
        <div>관리자 로그인 상태</div>
        <div>summary</div>
        <div>회원관리</div>
        <div>게시물 관리</div>
        <div>채팅</div>
      </div>

      <div className='posting_content'> 
        <div className='posting_status'>
          <div className='posting_status_title'>상태</div> <div className='title_verticle_line'/>
          <div className='posting_status_component'>
            <div className='posting_status_container'>
              <div className='waiting'>심사 대기</div>
              <div>-</div>
            </div> <div className='verticle_line'/>
            <div className='posting_status_container'>
              <div className='done'>심사 완료</div>
              <div>-</div>
            </div> <div className='verticle_line'/>
            <div className='posting_status_container'>
              <div className='ing'>펀딩 진행 중</div>
              <div>-</div>
            </div> <div className='verticle_line'/>
          </div>
        </div>

        <div className='postmanage_container'>
          <div className='container_title'>title</div>
          <div className='container_content'>
            <ChevronLeftIcon  className='left' onClick={prevPage} style={{ cursor: 'pointer' }}/>
            
            <div className="card_container">
              {currentCards.map((card, index) => (
                  <div key={index} className="status_card">
                      <div className="card_content">
                          <div className="card_img"></div>
                          <div className="card_text">
                              <div className="card_title">{card.title}</div>
                              <div className="card_status">{card.status}</div>
                          </div>
                      </div>
                      <ChevronRightIcon />
                  </div>
              ))}
            </div>

            <ChevronRightIcon className='right' onClick={nextPage} style={{ cursor: 'pointer' }}/>
          </div>
        </div>

        <div className='wait'>
          <div>심사대기</div>
          <div className='waitingAPI'></div>
        </div>
        <div className='confirm'>
          <div>심사대기</div>
          <div className='confirmAPI'></div>
        </div>
        <div className='running'>
          <div>펀딩 진행 중</div>
          <div className='runningAPI'></div>
        </div>
      </div>
    </div>    
  );
}

export default PostManage;
