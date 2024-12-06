import { useEffect, useState } from "react";
import { Token } from 'apiTypes/Token';
import { Api } from 'apiTypes/Api';
import styles from 'styles/adminPage/chat.module.css';
import { ChatMessageResponse, ChatRoom } from "apiTypes/data-contracts";
import { Admin } from 'apiTypes/Admin';

// interface ChatRoomItem extends ChatRoom {
//   counterpartName : string;
// }

function ChatRoomPage({ onSelectChatRoom }: { onSelectChatRoom: (chatRoomId: number) => void }) {
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
  const api = new Api();
  const adminApi = new Admin();

  useEffect(() => {
    const loadChatRoomHistory = async () => {
      try {
        const params = Token.getHeaderParms;
        // console.log("Token: ", params);
        const response = await api.getChatRoomList({ page: 0, size: 10 }, params); //then-catch로 변경
        console.log("room api result:",response);
        const chatRoomList: ChatRoom[] = response.data.data.map((item: any) => {
            console.log("chatRoomList",response.data.data);
          return { chatRoomId: item.chatRoomId } as ChatRoom;
        });

        console.log("chatRoomList out for",chatRoomList);
        // 각 채팅방에 대해 최신 메시지 로드
        for (let chatRoom of chatRoomList) {
          const messageResponse = await api.getChatMessages(chatRoom.chatRoomId, { page: 0, size: 10 }, params);
          const latestMessages: ChatMessageResponse[] = messageResponse.data.data || [];
          if (latestMessages.length > 0) {
            // 최신 메시지를 배열에서 마지막 메시지로 설정
            chatRoom.latestMessage = latestMessages[latestMessages.length - 1];
          }

          //상대방 누구인지 파악
          const userRole = localStorage.getItem('userRole');
          // console.log(userRole);
          if (userRole === "ADMIN") {
            try {
              const userProfile = await adminApi.getUserList1(chatRoom.counterpartId, params);
              console.log("상대방 정보",userProfile);
              // chatRoom.counterpartName = userProfile?.data?.data?.nickname || userProfile?.data?.data?.id || 'Unknown';
            } catch (err) {
              console.error('Failed to fetch counterpart info:', err);
            }
          } else {
            // chatRoom.counterpartName ="admin";
          }
        }      
        setChatRoomList(chatRoomList);
      } catch (error) {
        console.error("채팅 내역 로드 실패", error);
      }
    };
    loadChatRoomHistory();
  }, []);
  return (
    <div className={styles.admin_container}>

      <div className={styles.chat_room_list}>
        <div className={styles.chat_room_list_title}>대화방</div>

        <div className="chatRoomList">
          {chatRoomList.map((chatRoom, idx) => (
            <div key={idx} 
            className={styles.chat_room_list_container}
            onClick={() => onSelectChatRoom(chatRoom.chatRoomId)}>
                <div className={styles.chat_room_list_profile}>
                    {chatRoom.counterpartProfile}
                </div>
                {chatRoom.latestMessage ? (
                    <div className={styles.chat_room_list_content}>
                        {/* <div>{chatRoom.counterpartId}</div> */}
                        <div>{chatRoom.latestMessage.senderId}</div> 
                        {/* <div>{chatRoom.counterpartName}</div> */}
                        <div className={styles.chat_room_list_preview}>
                        {chatRoom.latestMessage.content}
                        </div>
                    </div>
                ) : (
                    <div className={styles.chat_room_list_preview}>최근 메시지가 없습니다</div>
                )}
                <div className={styles.chat_room_list_time}>
                    {chatRoom.latestMessage ? chatRoom.latestMessage.createdAt : "새로운 채팅방"}
                </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default ChatRoomPage;