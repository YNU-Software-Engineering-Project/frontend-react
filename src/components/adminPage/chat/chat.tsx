import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import ChatRoomPage from "./ChatRoomPage";
import styles from 'styles/adminPage/chatting.module.css';
import { Token } from "apiTypes/Token";
import MenuBar from "../menuBar";
import ProfileMenuBar from "components/myPage/profileMenuBar";

function Chat() {
  const storedRole = localStorage.getItem('userRole');
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number | null>(null);
   //debug 및 메뉴바 선택을 위함
  useEffect(() => {
    const token = Token.getToken?.split(' ')[1];
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
        const loggedInUserId = decodedToken.id;
        // console.log("userId",loggedInUserId);
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
  })
  //채탕방 선택
  const handleSelectChatRoom = (chatRoomId: number) => {
    setCurrentChatRoomId(chatRoomId);
    console.log("chat.tsx - roomId",chatRoomId);
  };

  return (
    <div className={styles.chat_container}>
      {storedRole === 'ADMIN' ? <MenuBar /> : <ProfileMenuBar />}
      <div className={styles.chat_main_content}>
        <div className={styles.chat_room_list1}>
          <ChatRoomPage onSelectChatRoom={handleSelectChatRoom}/>
        </div>

        <div className={styles.chat_room1}>
          <ChatPage chatRoomId={currentChatRoomId ?? 0}/>
        </div>
      </div>
      

    </div>
  );
}

export default Chat;