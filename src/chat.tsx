import './chat.css';
import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Chat() {
  const chat = Array(20).fill({ title: '상대방 이름', content: 'content', time: 'time' });
  const [currentChatIndex, setCurrentChatIndex] =useState<number | null>(null);
  const [messages, setMessages] = useState([]);
  const [newChat, setNewchat] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChatClick = (index: number) => {
    setCurrentChatIndex(index); 
  };
  const sendChat = () => {
    if (newChat === "") return;
    // 서버에 보내기
    setNewchat("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

      <div className='chat_content'> 
        <div className='chat_room_list'>
          <div className='chat_room_list_title'>대화방</div>

          {chat.map((room, index) => (
            <div
              key={index}
              className={`chat_room_list_container ${currentChatIndex === index ? 'selected' : ''}`} 
              onClick={() => handleChatClick(index)}
            >
              <div className='chat_room_list_profile'></div>
              <div className='chat_room_list_content'>
                <div>{room.title}</div>
                <div className='chat_room_list_preview'>{room.content}</div>
              </div>
              <div className='chat_room_list_time'>{room.time}</div>
            </div>
          ))}
        </div>

        <div className='chat_room'>
          <div className='chat_room_title'>
            <AccountCircleIcon className='profile_icon'/>
            {currentChatIndex !== null && <div>{chat[currentChatIndex].title}</div>}
          </div>
          <div className='chat_room_content'>
            <div className='msg'>
            내용 불러오기
            </div>
          </div>
          <div className='chat_room_input'>
            <button className='plus_button'>+</button>
            <input className='chat_room_input_box'  
              ref={inputRef}
              type="text" 
              value={newChat}
              onChange={(e) => {
                setNewchat(e.target.value);
              }}
            />
            <button className='send_button' onClick={sendChat}>전송</button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default Chat;
