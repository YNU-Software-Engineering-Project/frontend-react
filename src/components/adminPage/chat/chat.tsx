import { useEffect, useState } from 'react';
import ChatRoomPage from 'components/adminPage/chat/ChatRoomPage';
import ChatPage from 'components/adminPage/chat/ChatPage';
import MenuBar from 'components/adminPage/menuBar';
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/adminPage/chatting.module.css';

import { Token } from 'apiTypes/Token';

function Chat() {
  const storedRole = localStorage.getItem('userRole');
  const [currentChatRoom, setCurrentChatRoom] = useState<number | null>(null);

  const handleSelectChatRoom = (chatRoom: any) => {
    setCurrentChatRoom(chatRoom);
  };

  const handleBackToRoomList = () => {
    setCurrentChatRoom(null);
  };

  //debuf
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
        console.log("userId",loggedInUserId);
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
  })

  return (
    <div className={styles.chat_container}>
    {storedRole === 'ADMIN' ? <MenuBar /> : <ProfileMenuBar />}
    <div className={styles.chat_main_content}>
      <div className={styles.chat_room_list1}>
        <ChatRoomPage onSelectChatRoom={handleSelectChatRoom} />
      </div>
      <div className={styles.chat_room1}>
        {currentChatRoom !== null && (
          <ChatPage chatRoom={currentChatRoom} onBackToRoomList={handleBackToRoomList} />
        )}
      </div>
    </div>
  </div>
  );
}

export default Chat;