import { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBar from 'components/adminPage/menuBar';
import styles from 'styles/adminPage/chat.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Chat() {
  // const chat = Array(20).fill({ title: '상대방 이름', content: 'content', time: 'time' });
  const [chat, setChat] = useState<any[]>([]);
  const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(null);
  const [newChat, setNewchat] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // WebSocket 연결 설정
    socket.current = new WebSocket('ws://localhost:8080/chat');
    socket.current.onopen = () => {
      console.log('WebSocket 연결 성공');
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.current.onclose = () => {
      console.log('WebSocket 연결이 종료되었습니다');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const handleChatClick = (index: number) => {
    setCurrentChatIndex(index); 
    // TODO: 선택된 채팅방의 과거 메시지 불러오기 (REST API 호출)
    fetch(`/api/chat/rooms/${index}/messages`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching chat messages:', error));
  };

  const sendChat = () => {
    if (newChat === "") return;
    // 서버에 보내기
    // WebSocket을 통해 메시지 전송
    if (socket.current) {
      const message = {
        chatRoomId: currentChatIndex,
        content: newChat,
        sender: '사용자',
        timestamp: new Date().toISOString(),
      };
      socket.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
    }
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
            {messages.map((msg, idx) => (
              <div key={idx} className={styles.msg}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div className={styles.chat_room_input}>
            <div className={styles.plus_button}>
              <AddCircleOutlineIcon />
            </div>
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
