import { useState, useEffect } from 'react';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import styles from 'styles/adminPage/chat.module.css';
import { ChatRoom } from 'apiTypes/data-contracts';

function ChatRoomPage({ onSelectChatRoom }: { onSelectChatRoom: (chatRoomId: number) => void }) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const api = new Api();
  const formattedDate = new Date(Date.now()).toLocaleDateString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const params = Token.getHeaderParms;
    api.getChatRoomList({ page: 0, size: 10 }, params)
      .then(response => {
        console.log('chat rooms(chatroompage):', response.data);
        setChatRooms(response.data.data);
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

  return (
    <div className={styles.admin_container}>
      
      <div className={styles.chat_room_list}>
        <div className={styles.chat_room_list_title}>대화방</div>

        {chatRooms.map((room) => (
          <div
            key={room.chatRoomId}
            className={styles.chat_room_list_container}
            onClick={() => onSelectChatRoom(room.chatRoomId)}
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
            <div className={styles.chat_room_list_time}>
            {room.latestMessage ? room.latestMessage.createdAt : formattedDate}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoomPage;