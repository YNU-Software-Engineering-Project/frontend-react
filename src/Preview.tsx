// import './App.css';

function App() {
  return (
    <div className='preview_container'>
      <div className='preview_menu_bar'>
        <div>이미지</div>
        <div>미리보기</div>
        <div>프로젝트 서류</div>
        <div>상태 변경하기</div>
      </div>

      <div className='preview_content'> 
        <div className='preview_management'>
          <div>스토리</div>
          <div>커뮤니티</div>
          <div>환불정책</div>
          <div>리워드 정보</div>
        </div>
        <div className='preview_story'>content</div>

        <div className='preview_community'>
          <button>글쓰기</button>
        </div>

        <div className='preview_refund'>
            내용 복붙
        </div>

        <div className='preview_reward'>
            내용 복붙
        </div>
      </div>

      <div className='preview_'>
        <div>목표 금액</div> <div>api</div>
        <div>모인 금액</div> <div>api</div>
        <div>달성률</div> <div>api</div>
        <div>남은 시간</div> <div>api</div>
        <div>후원자</div> <div>api</div>
        <div>
            <div>문의하기</div>
            <div>좋아요</div>
            <div>후원하기</div>
        </div>
      </div>

    </div>    
  );
}

export default App;
