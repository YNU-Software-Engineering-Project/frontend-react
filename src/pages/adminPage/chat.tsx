import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBar from 'components/adminPage/menuBar';
import styles from 'styles/adminPage/chat.module.css';

function Chat() {
  const chat = Array(20).fill({ title: '상대방 이름', content: 'content', time: 'time' });
  const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(null);
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
    <div className={styles.admin_container}>
      <MenuBar />

      <div className={styles.chat_content}> 
        <div className={styles.chat_room_list}>
          <div className={styles.chat_room_list_title}>대화방</div>

          {chat.map((room, index) => (
            <div
              key={index}
              className={`${styles.chat_room_list_container} ${currentChatIndex === index ? styles.selected : ''}`} 
              onClick={() => handleChatClick(index)}
            >
              <div className={styles.chat_room_list_profile}></div>
              <div className={styles.chat_room_list_content}>
                <div>{room.title}</div>
                <div className={styles.chat_room_list_preview}>{room.content}</div>
              </div>
              <div className={styles.chat_room_list_time}>{room.time}</div>
            </div>
          ))}
        </div>

        <div className={styles.chat_room}>
          <div className={styles.chat_room_title}>
            <AccountCircleIcon className={styles.profile_icon}/>
            {currentChatIndex !== null && <div>{chat[currentChatIndex].title}</div>}
          </div>
          <div className={styles.chat_room_content}>
            <div className={styles.msg}>
              내용 불러오기
            </div>
          </div>
          <div className={styles.chat_room_input}>
            <button className={styles.plus_button}>+</button>
            <input className={styles.chat_room_input_box}  
              ref={inputRef}
              type="text" 
              value={newChat}
              onChange={(e) => setNewchat(e.target.value)}
            />
            <button className={styles.send_button} onClick={sendChat}>전송</button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default Chat;
