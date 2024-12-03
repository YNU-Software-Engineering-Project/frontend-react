import { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Token } from 'apiTypes/Token';
import styles from 'styles/adminPage/chat.module.css';
import WebSocketService from 'components/adminPage/chat/WebsocketService';
import axios from 'axios';
import { ChatMessageResponse } from 'apiTypes/data-contracts';

function ChatPage({ chatRoom, onBackToRoomList }: { chatRoom: any; onBackToRoomList: () => void }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const webSocketService = WebSocketService.getInstance();

  const token = Token.getToken?.split(' ')[1];
  let loggedInUserId: number | null = null;

  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedToken = JSON.parse(jsonPayload);
      loggedInUserId = decodedToken.id;
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    //채팅방 내용 불러오기
    // const loadChatHistory = async () => {
    //     try {
    //       const response = await axios.get(
    //         `http://localhost:8080/api/v1/rooms/${chatRoom.chatRoomId}/messages`
    //       );
    //       const messages = response.data.data.messageList as ChatMessageResponse[];
    //       setMessages(messages);
    //       console.log("message 불러오기(chat page)",messages);
    //     } catch (error) {
    //       console.error("채팅 내역 로드 실패", error);
    //     }
    //   };
    //   loadChatHistory();
    // WebSocket 초기화
    webSocketService.initializeWebSocket(chatRoom.chatRoomId);

    // Add listener for when the WebSocket is ready
    const client = webSocketService.getClient();
    if (client) {
      client.onConnect = () => {
        console.log('WebSocket 연결 성공 - 구독 시작');

        // Subscribe only after connection
        client.subscribe(`/api/v1/rooms/${chatRoom.chatRoomId}/messages}`, (message) => {
            console.log('수신된 메시지(chatPage):', message);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      };

      client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };
    } else {
      console.error('STOMP client 초기화 실패');
    }
  }, [webSocketService, chatRoom.chatRoomId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !chatRoom.chatRoomId) {
      console.error("메시지가 비어있거나 채팅방이 선택되지 않았습니다.");
      return;
    }

    const client = webSocketService.getClient();
    console.log('메시지 전송 시도(chatPage):', newMessage);
    if (client && client.connected) {
        console.log('WebSocket 연결 상태 양호, 메시지 전송 중...(chatPage)');
      webSocketService.sendMessage(chatRoom.chatRoomId, newMessage);
      setMessages((prevMessages) => [...prevMessages, { roomId: chatRoom.chatRoomId, content: newMessage, senderId: loggedInUserId }]);
      setNewMessage('');
      console.log('메시지 전송 완료(chatPage)');
    } else {
      console.error('WebSocket이 열려있지 않습니다. 메시지를 보낼 수 없습니다.');
    }
  };

  return (
    <div className={styles.chat_room}>
      <div className={styles.chat_room_title}>
        <AccountCircleIcon className={styles.profile_icon}/>
             {chatRoom ? (
               <div>{chatRoom.senderId}</div>
             ) : (
               <div>채팅방 사용자를 찾을 수 없습니다</div>
             )}
      </div>
      <div className={styles.chat_room_content}>
        {messages.map((msg, index) => (
          <div key={index}
            className={`${styles.msg} ${msg.senderId === loggedInUserId ? styles.sent_message : styles.received_message}`}>
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
  );
}

export default ChatPage;