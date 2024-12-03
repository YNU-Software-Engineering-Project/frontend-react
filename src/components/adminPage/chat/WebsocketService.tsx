//채팅방 페이지(채탕벙 목록)
import { Client, IMessage } from "@stomp/stompjs";

class WebSocketService {
    private static instance: WebSocketService;
    private client: Client | null = null;
  
    private constructor() {}
  
    public static getInstance(): WebSocketService {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    initializeWebSocket(chatRoomId: number) {
      console.log('WebSocketService - 초기화 시작');
      if (this.client && this.client.active) {
        console.log('WebSocket이 이미 연결되어 있습니다(service)');
        return;
      }
  
      this.client = new Client({
        brokerURL: 'ws://localhost:8080/chat',
        reconnectDelay: 5000,
        onConnect: () => {
          console.log('WebSocket 연결 성공(WebSocketService)');
  
          // 특정 채널에 대한 메시지 조회
          this.client?.subscribe(`/api/v1/rooms/${chatRoomId}/messages}`, (message) => {
            console.log('새 메시지 수신(WebSocketService):', JSON.parse(message.body));
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error(WebSocketService): ' + frame.headers['message']);
          console.error('Additional details(WebSocketService): ' + frame.body);
        },
      });
      console.log('WebSocketService - WebSocket 객체 생성됨:', this.client);

      this.client.activate();
    }
  
    sendMessage(roomId: number, content: string) {
        console.log("sendMessage:",roomId, content)
        if (this.client && this.client.active) {
          const message = { roomId, content };
          this.client.publish({
            destination: `/chat/rooms/${roomId}/send`, // 서버로 전송
            body: JSON.stringify(message),
          });
        } else {
          console.error('WebSocket이 열려있지 않습니다. 메시지를 보낼 수 없습니다.(service)');
        }
      }
  
    getClient() {
      return this.client;
    }
  }
  
  export default WebSocketService;
  