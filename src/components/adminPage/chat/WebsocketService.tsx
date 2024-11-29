// WebSocketService.ts
class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;
  
    private constructor() {}
  
    public static getInstance(): WebSocketService {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    initializeWebSocket() {
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        console.log('WebSocket이 이미 연결되어 있습니다(service)');
        return;
      }
  
      this.socket = new WebSocket('ws://localhost:8080/chat');
      console.log('WebSocket 객체 생성됨(service)', this.socket);
  
      this.socket.onopen = () => {
        console.log('WebSocket 연결 성공(service)');
      };
  
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('새 메시지 수신(service):', message);
      };
  
      this.socket.onclose = (event) => {
        console.log('WebSocket 연결이 종료되었습니다(service)',event);
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket 에러(service):', error);
      };
    }
  
    sendMessage(roomId: number, content: string) {
        console.log("sendMessage:",roomId, content)
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const message = { roomId, content };
        this.socket.send(JSON.stringify(message));
      } else {
        console.error('WebSocket이 열려있지 않습니다. 메시지를 보낼 수 없습니다.(service)');
      }
    }
  
    getSocket() {
      return this.socket;
    }
  }
  
  export default WebSocketService;
  