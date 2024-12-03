// import { useState, useEffect, useRef } from 'react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MenuBar from 'components/adminPage/menuBar';
// import styles from 'styles/adminPage/chat.module.css';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Api } from 'apiTypes/Api';
// import { Token } from 'apiTypes/Token';
// import WebSocketService from 'components/adminPage/chat/WebsocketService';

// function Chat() {
//   // const chat = Array(20).fill({ title: '상대방 이름', content: 'content', time: 'time' });
//   const [chat, setChat] = useState<any[]>([]);
//   const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(null);
//   const [newMessage, setNewMessage] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const api = new Api();
//   const currentChatRoom = chat.find(room => room.chatRoomId === currentChatIndex);
//   const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
//   const webSocketService = WebSocketService.getInstance();
//   const token = Token.getToken?.split(' ')[1];
//   let loggedInUserId: number | null = null;
//     if (token) {
//       try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(
//           atob(base64)
//             .split('')
//             .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//             .join('')
//         );
//         const decodedToken = JSON.parse(jsonPayload);
//         console.log(decodedToken);
//         loggedInUserId = decodedToken.id;
//       } catch (error) {
//         console.error('토큰 디코딩 실패:', error);
//       }
//     }
//     console.log("token",token);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   // 채팅방 목록 불러오기
//   useEffect(() => {
//     const params = Token.getHeaderParms;
//     api.getChatRoomList({page:0, size:10}, params)
//       .then(response => {
//         console.log('chat rooms:', response.data);
//         setChat(response.data.data)
//       })
//       .catch(error => {
//         console.error('채팅방 목록 조회 실패:', error);
//         if (error.response) {
//           alert(`채팅방 목록 조회 실패: ${error.response.data.message}`);
//         } else {
//           alert('채팅방 목록 조회 실패: 네트워크 오류');
//         }
//       });
//   }, []);

//   // WebSocket 초기화
//   // useEffect(() => {
//   //   webSocketService.initializeWebSocket();
//   //   const socket = webSocketService.getSocket();

//   //   console.log("useEffect 초기화 시점 WebSocket 객체 확인:", socket);

//   //   if (socket) {
//   //     setIsWebSocketOpen(socket.readyState === WebSocket.OPEN);

//   //     socket.addEventListener('open', () => {
//   //       setIsWebSocketOpen(true);
//   //       console.log('WebSocket 연결 성공(handler)');
//   //     });

//   //     socket.addEventListener('close', () => {
//   //       setIsWebSocketOpen(false);
//   //       console.log('WebSocket 연결 종료(handler)');
//   //     });

//   //     socket.addEventListener('error', () => {
//   //       setIsWebSocketOpen(false);
//   //       console.error('WebSocket 에러 발생(handler)');
//   //     });
//   //   } else {
//   //     console.error('WebSocket 초기화 실패(handler)');
//   //   }
//   // }, [webSocketService]);

//   const handleChatRoomClick = (chatRoomId: number) => {
//     setCurrentChatIndex(chatRoomId);
//     const params = Token.getHeaderParms;
//     // 특정 채팅방의 메시지 목록 불러오기
//     api.getChatMessages(chatRoomId, { page: 0, size: 10 }, params)
//       .then((response) => {
//         setMessages(response.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching chat messages:', error);
//       });
//   };

//   //메세지 전송
//   const handleSendMessage = () => {
//     console.log("handleSendMessage start")
//     if (newMessage.trim() === '' || currentChatIndex === null) {
//       console.error("메시지가 비어있거나 채팅방이 선택되지 않았습니다.");
//       return;
//     }
//     console.log(isWebSocketOpen);
//   if (!isWebSocketOpen) {
//     console.error('WebSocket is not open(handle error)');
//     return;
//   }

//   // const socket = api.getSocket();
//   // const socket = webSocketService.getSocket();
//   // console.log("handleSendMessage socket",socket);
//   // if (!socket || socket.readyState !== WebSocket.OPEN) {
//   //   console.error('WebSocket is not open (소켓 에러)');
//   //   alert('WebSocket 연결이 열려 있지 않습니다. 잠시 후 다시 시도하세요.');
//   //   return;
//   // }

//     const chatMessageRequest = {
//       content: newMessage,
//       senderId: 3, // 임시로 사용자 ID 설정
//     };

//     try {
//       console.log("보낼 메세지",newMessage);
//       console.log("이전 메세지",messages);
//       // api.sendMessage(currentChatIndex, chatMessageRequest);
//       webSocketService.sendMessage(currentChatIndex, newMessage);
//       setMessages((prevMessages) => [...prevMessages, chatMessageRequest]);
//       setNewMessage('');
//       console.log("메시지 전송 완료:", chatMessageRequest);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div className={styles.admin_container}>
//       <MenuBar />

//       <div className={styles.chat_content}> 
//         <div className={styles.chat_room_list}>
//           <div className={styles.chat_room_list_title}>대화방</div>
//           {chat.map((room) => (
//             <div
//               key={room.chatRoomId}
//               className={`${styles.chat_room_list_container} ${currentChatIndex === room.chatRoomId ? styles.selected : ''}`} 
//               onClick={() => handleChatRoomClick(room.chatRoomId)}
//             >
//               <div className={styles.chat_room_list_profile}>{room.counterpartProfile}</div>
//               {room.latestMessage ? (
//               <div className={styles.chat_room_list_content}>
//                 <div>{room.latestMessage.senderId}</div>
//                 <div className={styles.chat_room_list_preview}>{room.latestMessage.content}</div>
//               </div>
//               ) : (
//                 <div className={styles.chat_room_list_preview}>최근 메시지가 없습니다</div>
//               )}
//               <div className={styles.chat_room_list_time}>{room.latestMessage ? room.latestMessage.createdAt: Date.now}</div>
//             </div>
//           ))}
//         </div>

//         <div className={styles.chat_room}>
//           <div className={styles.chat_room_title}>
//             <AccountCircleIcon className={styles.profile_icon}/>
//             {currentChatRoom ? (
//               <div>{currentChatRoom.senderId}</div>
//             ) : (
//               <div>채팅방 제목을 찾을 수 없습니다</div>
//             )}
//           </div>
//           {/* admin과 user 채팅 구분 필요 */}
//           <div className={styles.chat_room_content}> 
//             {messages.map((msg, index) => (
//               <div key={index} 
//               className={`${styles.msg} ${msg.senderId === loggedInUserId ? styles.sent_message : styles.received_message}`}>
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <div className={styles.chat_room_input}>
//             <div className={styles.plus_button}>
//               <AddCircleOutlineIcon />
//             </div>
//             <input className={styles.chat_room_input_box}  
//               ref={inputRef}
//               type="text" 
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button className={styles.send_button} onClick={handleSendMessage}>전송</button>
//           </div>
//         </div>
//       </div>
//     </div>    
//   );
// }

// export default Chat;

//////// 2 step
// import { useEffect, useState } from 'react';
// import ChatRoomPage from 'components/adminPage/chat/ChatRoomPage';
// import ChatPage from 'components/adminPage/chat/ChatPage';
// import MenuBar from 'components/adminPage/menuBar';
// import ProfileMenuBar from 'components/myPage/profileMenuBar';
// import styles from 'styles/adminPage/chatting.module.css';

// import { Token } from 'apiTypes/Token';

// function Chat() {
//   const storedRole = localStorage.getItem('userRole');
//   const [currentChatRoom, setCurrentChatRoom] = useState<number | null>(null);

//   const handleSelectChatRoom = (chatRoom: any) => {
//     setCurrentChatRoom(chatRoom);
//   };

//   const handleBackToRoomList = () => {
//     setCurrentChatRoom(null);
//   };

//   //debuf
//   useEffect(() => {
//     const token = Token.getToken?.split(' ')[1];
//     if (token) {
//       try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(
//           atob(base64)
//             .split('')
//             .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//             .join('')
//         );
//         const decodedToken = JSON.parse(jsonPayload);
//         const loggedInUserId = decodedToken.id;
//         console.log("userId",loggedInUserId);
//       } catch (error) {
//         console.error('토큰 디코딩 실패:', error);
//       }
//     }
//   })

//   return (
//     <div className={styles.chat_container}>
//     {storedRole === 'ADMIN' ? <MenuBar /> : <ProfileMenuBar />}
//     <div className={styles.chat_main_content}>
//       <div className={styles.chat_room_list1}>
//         {/* <ChatRoomPage onSelectChatRoom={handleSelectChatRoom} /> */}
//         <ChatRoomPage />
//       </div>
//       <div className={styles.chat_room1}>
//         {currentChatRoom !== null && (
//           <ChatPage chatRoom={currentChatRoom} onBackToRoomList={handleBackToRoomList} />
//         )}
//       </div>
//     </div>
//   </div>
//   );
// }

// export default Chat;


import ChatPage from "./ChatPage";
import ChatRoomPage from "./ChatRoomPage";
import styles from 'styles/adminPage/chatting.module.css';

function Chat() {
  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_main_content}>
        <div className={styles.chat_room_list1}>
          <ChatRoomPage/>
        </div>
      </div>
      
      <div className={styles.chat_room1}>
        <ChatPage/>
      </div>
    </div>
  );
}

export default Chat;