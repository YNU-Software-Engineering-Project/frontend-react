// import { useState, useEffect, useRef } from 'react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Token } from 'apiTypes/Token';
// import styles from 'styles/adminPage/chat.module.css';
// import WebSocketService from 'components/adminPage/chat/WebsocketService';
// import axios from 'axios';
// import { ChatMessageResponse } from 'apiTypes/data-contracts';

// function ChatPage({ chatRoom, onBackToRoomList }: { chatRoom: any; onBackToRoomList: () => void }) {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const webSocketService = WebSocketService.getInstance();

//   const token = Token.getToken?.split(' ')[1];
//   let loggedInUserId: number | null = null;

//   if (token) {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
//       const decodedToken = JSON.parse(jsonPayload);
//       loggedInUserId = decodedToken.id;
//     } catch (error) {
//       console.error('토큰 디코딩 실패:', error);
//     }
//   }

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//     //채팅방 내용 불러오기
//     // const loadChatHistory = async () => {
//     //     try {
//     //       const response = await axios.get(
//     //         `http://localhost:8080/api/v1/rooms/${chatRoom.chatRoomId}/messages`
//     //       );
//     //       const messages = response.data.data.messageList as ChatMessageResponse[];
//     //       setMessages(messages);
//     //       console.log("message 불러오기(chat page)",messages);
//     //     } catch (error) {
//     //       console.error("채팅 내역 로드 실패", error);
//     //     }
//     //   };
//     //   loadChatHistory();
//     // WebSocket 초기화
//     webSocketService.initializeWebSocket(chatRoom.chatRoomId);

//     // Add listener for when the WebSocket is ready
//     const client = webSocketService.getClient();
//     if (client) {
//       client.onConnect = () => {
//         console.log('WebSocket 연결 성공 - 구독 시작');

//         // Subscribe only after connection
//         client.subscribe(`/api/v1/rooms/${chatRoom.chatRoomId}/messages}`, (message) => {
//             console.log('수신된 메시지(chatPage):', message);
//           const newMessage = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });
//       };

//       client.onStompError = (frame) => {
//         console.error('Broker reported error: ' + frame.headers['message']);
//         console.error('Additional details: ' + frame.body);
//       };
//     } else {
//       console.error('STOMP client 초기화 실패');
//     }
//   }, [webSocketService, chatRoom.chatRoomId]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === '' || !chatRoom.chatRoomId) {
//       console.error("메시지가 비어있거나 채팅방이 선택되지 않았습니다.");
//       return;
//     }

//     const client = webSocketService.getClient();
//     console.log('메시지 전송 시도(chatPage):', newMessage);
//     if (client && client.connected) {
//         console.log('WebSocket 연결 상태 양호, 메시지 전송 중...(chatPage)');
//       webSocketService.sendMessage(chatRoom.chatRoomId, newMessage);
//       setMessages((prevMessages) => [...prevMessages, { roomId: chatRoom.chatRoomId, content: newMessage, senderId: loggedInUserId }]);
//       setNewMessage('');
//       console.log('메시지 전송 완료(chatPage)');
//     } else {
//       console.error('WebSocket이 열려있지 않습니다. 메시지를 보낼 수 없습니다.');
//     }
//   };

//   return (
//     <div className={styles.chat_room}>
//       <div className={styles.chat_room_title}>
//         <AccountCircleIcon className={styles.profile_icon}/>
//              {chatRoom ? (
//                <div>{chatRoom.senderId}</div>
//              ) : (
//                <div>채팅방 사용자를 찾을 수 없습니다</div>
//              )}
//       </div>
//       <div className={styles.chat_room_content}>
//         {messages.map((msg, index) => (
//           <div key={index}
//             className={`${styles.msg} ${msg.senderId === loggedInUserId ? styles.sent_message : styles.received_message}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className={styles.chat_room_input}>
//         <div className={styles.plus_button}>
//           <AddCircleOutlineIcon />
//         </div>
//         <input className={styles.chat_room_input_box}
//           ref={inputRef}
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button className={styles.send_button} onClick={handleSendMessage}>전송</button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from 'styles/adminPage/chat.module.css';
import { ChatMessage, ChatMessageResponse } from "apiTypes/data-contracts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ChatPage() {
  const { chatRoomId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [writer, setWriter] = useState<number>(0);
  const [newMessage, setNewMessage] = useState<string>("");
  const formattedDate = new Date(Date.now()).toLocaleDateString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      });

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/rooms/${chatRoomId}/messages`
        );
        const messages = response.data.data.messageList as ChatMessageResponse[];
        setMessages(messages);
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
        senderId: writer,
        content: newMessage,
        chatMessageId: chatRoomId ? parseInt(chatRoomId) : 0,
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
        {messages.length === 0 && chatRoomId ? (
            <div>채팅 기록이 없습니다.</div>
            ) : (
            messages.map((msg, idx) => (
            <div key={idx}>
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