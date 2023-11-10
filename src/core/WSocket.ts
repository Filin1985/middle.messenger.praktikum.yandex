import { Message, STATE, WebSocketData } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
class Socket {
  private socket: WebSocket;
  protected timeout: number = 0;
  protected callbackMessages: (data: any) => void;

  chatId: number;

  constructor({ userId, chatId, token, callbackMessages }: WebSocketData) {
    this.chatId = chatId;
    this.callbackMessages = callbackMessages;
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    this.socket.onmessage = this.message.bind(this);
    this.socket.onopen = this.open.bind(this);
    this.socket.onclose = this.close.bind(this);
    this.timeout = 0;
  }

  send(message: Message) {
    this.socket.send(JSON.stringify(message));
  }

  protected ping() {
    if (this.socket?.readyState === STATE.OPEN) {
      this.send({ content: "ping", type: "ping" });
      this.timeout = window.setTimeout(this.ping.bind(this), 15000);
    }
  }

  open(event: Event) {
    console.log("Connection is open", event);
    this.ping();
    this.socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      })
    );
  }

  close(event: CloseEvent) {
    event.wasClean
      ? console.log("Connection is closed")
      : console.log("Connection failed");

    console.log(`${event.code} - ${event.reason}`);
  }

  message(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (data.type !== "user connected" && data.type !== "pong") {
      this.callbackMessages(data);
    }
  }

  closeConnect() {
    this.socket?.close(1000, "Connection closing");
  }
}

export default Socket;
