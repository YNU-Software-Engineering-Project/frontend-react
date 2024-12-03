import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import axios from "axios";
import styles from 'styles/adminPage/chat.module.css';
import { ChatMessage, ChatMessageResponse } from "apiTypes/data-contracts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Token } from "apiTypes/Token";

function ChatPage({ chatRoomId }:{ chatRoomId: number; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const formattedDate = new Date(Date.now()).toLocaleDateString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      });
  //보내는 사람인지 받는 사람인지 구분
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
        console.log("현재 사용자 id:",loggedInUserId);
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
      
  useEffect(() => {
    if (chatRoomId === 0) return;

    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/rooms/${chatRoomId}/messages`
        );
        console.log("특정 채팅방 조회 결과:", response);
        const messages = response.data.data as ChatMessageResponse[] || []; //messages의 초기값이 undefined일 수 있기에
        setMessages(messages);
        console.log("그전 메세지",messages);
      } catch (error) {
        console.error("채팅 내역 로드 실패", error);
      }
    };

    loadChatHistory();
    const client = new Client({
      brokerURL: "ws://localhost:8080/chat",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/public/rooms/${chatRoomId}`, (message: IMessage) => {
          const msg: ChatMessageResponse = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => {
      client.deactivate();
    };
  }, [chatRoomId]);

  const sendMessage = () => {
    if (stompClient && newMessage) {
      const chatMessage: ChatMessage = {
        senderId: loggedInUserId ?? 0,
        content: newMessage,
        chatMessageId: chatRoomId,
        createdAt: formattedDate,
      };
      stompClient.publish({
        destination: `/app/chat/rooms/${chatRoomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      console.log(messages);
      setNewMessage("");
    }
  };
  //엔터키 누르고 계속 채팅창에 커서 존재하게 하기
  useEffect(() => {
     if (inputRef.current) {
       inputRef.current.focus();
     }
   }, []);

  return (
    <div className={styles.chat_room}>

      <div className={styles.chat_room_title}>
        <AccountCircleIcon className={styles.profile_icon} />
        {chatRoomId ? (
          <div>채팅방 {chatRoomId}</div> //보내는 사람(채팅을 받는 사람으로 수정)
        ) : (
          <div>상대방 이름</div>
        )}
      </div>

      <div className={styles.chat_room_content}>   
        {chatRoomId === 0 ? (
            <div>채팅 기록이 없습니다.</div>
            ) : (
            messages.map((msg, idx) => (
            <div key={idx}
            className={`${styles.msg} ${msg.senderId === loggedInUserId ? styles.sent_message : styles.received_message}`}>
                {msg.senderId}: {msg.content}
            </div>
            ))
        )}
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
        <button className={styles.send_button} onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatPage;