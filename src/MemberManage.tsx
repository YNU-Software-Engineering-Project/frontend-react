import './MemberManage.css';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function MemberMange() {
  const[search, setSearch]=useState('');
  return (
    <div className='admin_container'>
      <div className='menu_bar'>
        <div>관리자 로그인 상태</div>
        <div>summary</div>
        <div>회원관리</div>
        <div>게시물 관리</div>
        <div>채팅</div>
      </div>

      <div className='customer_management_content'> 
        <div className='search'>
            <input type='text' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} /><SearchIcon />
            <span>g icon</span>
        </div>
        <div className='horizontal_line_CAC4D0'></div>
        <div className='member_status'>
            <div className='member_status_bar'>
                <div>NO</div>
                <div>ID</div>
                <div>닉네임</div>
                <div>학교 이메일</div>
                <div>주소</div>
                <div>전화번호</div>
                <div>가입일</div>
            </div>
            <div className='member_status_content'>api result to "thread"</div>
        </div>
        <div className='page_manage'>
            <div>left</div>
            <div>Previous</div>
            <div className='page_number'></div>
            <div>Next</div>
            <div>right</div>
        </div>
      </div>

      <div className='userState_popup'>
        <div className='userState_popup_top'>
            <div>회원 정보 수정</div>
            <div >X</div> {/* onClick으로 원래 화면으로 돌아가기  */}
        </div>
        <div className='userState_popup_content'>
            <div>ID</div>
            <input></input>
            <div>닉네임</div>
            <input></input>
            <div>학교 이메일</div>
            <input></input>
            <div>pw</div>
            <input></input>
            <div>전화번호</div>
            <input></input>
            <div>비밀번호 변경</div>
            <input type='text' placeholder='Value'></input>
            <div>adress</div>
            <input></input>
            <div className='member_statue'>normal/정지회원</div>
        </div>
        <div className='userState_popup_bottom'>
            <button className='cancel_button'>cancel</button>
            <button className='save_button'>save</button>
        </div>
      </div>
    </div>    
  );
}

export default MemberMange;
