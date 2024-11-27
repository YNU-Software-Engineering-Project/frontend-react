import { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBar from 'components/adminPage/menuBar';
import styles from 'styles/adminPage/chat.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

function Chat() {
  // const chat = Array(20).fill({ title: '상대방 이름', content: 'content', time: 'time' });
  const [chat, setChat] = useState<any[]>([]);
  const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const api = new Api();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 채팅방 목록 불러오기
  useEffect(() => {
    const params = Token.getHeaderParms;
    api.getChatRoomList({page:0, size:10}, params)
      .then(response => {
        console.log('chat rooms:', response.data);
        setChat(response.data.data)
      })
      .catch(error => {
        console.error('채팅방 목록 조회 실패:', error);
        if (error.response) {
          alert(`채팅방 목록 조회 실패: ${error.response.data.message}`);
        } else {
          alert('채팅방 목록 조회 실패: 네트워크 오류');
        }
      });
  }, []);

  useEffect(() => {
    // WebSocket 초기화
    api.initializeWebSocket();
  }, []);

  const handleChatRoomClick = (chatRoomId: number) => {
    setCurrentChatIndex(chatRoomId);
    const params = Token.getHeaderParms;
    // 특정 채팅방의 메시지 목록 불러오기
    api.getChatMessages(chatRoomId, { page: 0, size: 10 }, params)
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching chat messages:', error);
      });
  };

  const handleSendMessage = () => {
    console.log("handleSendMessage start")
    if (newMessage.trim() === '' || currentChatIndex === null) return;

    const chatMessageRequest = {
      content: newMessage,
      senderId: 3, // 임시로 사용자 ID 설정
    };

    try {
      api.sendMessage(currentChatIndex, chatMessageRequest);
      setMessages((prevMessages) => [...prevMessages, chatMessageRequest]);
      setNewMessage('');
      console.log("메세지",messages);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={styles.admin_container}>
      <MenuBar />

      <div className={styles.chat_content}> 
        <div className={styles.chat_room_list}>
          <div className={styles.chat_room_list_title}>대화방</div>

          {/* {chat.map((room, index) => (
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
          ))} */}
          {chat.map((room) => (
            <div
              key={room.chatRoomId}
              className={`${styles.chat_room_list_container} ${currentChatIndex === room.chatRoomId ? styles.selected : ''}`} 
              onClick={() => handleChatRoomClick(room.chatRoomId)}
            >
              <div className={styles.chat_room_list_profile}>{room.counterpartProfile}</div>
              {room.latestMessage ? (
              <div className={styles.chat_room_list_content}>
                <div>{room.latestMessage.senderId}</div>
                <div className={styles.chat_room_list_preview}>{room.latestMessage.content}</div>
              </div>
              ) : (
                <div className={styles.chat_room_list_preview}>최근 메시지가 없습니다</div>
              )}
              <div className={styles.chat_room_list_time}>{room.latestMessage ? room.latestMessage.createdAt: Date.now}</div>
            </div>
          ))}
        </div>

        <div className={styles.chat_room}>
          <div className={styles.chat_room_title}>
            <AccountCircleIcon className={styles.profile_icon}/>
            {currentChatIndex !== null && chat.find(room => room.chatRoomId === currentChatIndex) ? (
              <div>{chat.find(room => room.chatRoomId === currentChatIndex)?.senderId}</div>
            ) : (
              <div>채팅방 제목을 찾을 수 없습니다</div>
            )}
          </div>
          <div className={styles.chat_room_content}>
            <div className={styles.msg}>
              내용 불러오기
            </div>
            {messages.map((msg, index) => (
              <div key={index} className={styles.msg}>
                {msg.content}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className={styles.send_button} onClick={handleSendMessage}>전송</button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default Chat;
