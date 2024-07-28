import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MiniprojectService } from './miniproject.service';

@WebSocketGateway(3008, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  },
})
export class MiniprojectGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private miniProjectService: MiniprojectService) {}

  @WebSocketServer() server: Server;

  private clients = new Map<string, string>();

  handleConnection(client: Socket) {
    const { name, documentId } = client.handshake.query;
    this.clients.set(`${documentId}_${name}`, `${name}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.updateOnlineUsers();
  }

  @SubscribeMessage('saveDocument')
  async handleSaveDocument(client: Socket, data) {
    await this.miniProjectService.updateDocumentContent(
      data.documentId,
      JSON.stringify(data.delta),
    );
  }

  @SubscribeMessage('onLeaveDocument')
  handleDocumentLeave(
    client: Socket,
    data: { documentId: number; username: string },
  ) {
    this.clients.delete(`${data.documentId}_${data.username}`);
    this.updateOnlineUsers(`${data.documentId}`);
  }

  @SubscribeMessage('updateDocument')
  handleUpdateDocument(client: Socket, data) {
    client.broadcast.to(data.documentId).emit('receivedChanges', data.delta);
  }

  @SubscribeMessage('getDocument')
  async handleGetDocument(
    client: Socket,
    dat: { documentId: number; username: string },
  ) {
    const data = await this.miniProjectService.getDocument(dat.documentId);
    client.join(`${dat.documentId}`);
    this.clients.set(`${dat.documentId}_${dat.username}`, dat.username);
    this.updateOnlineUsers(`${dat.documentId}`);
    if (data) {
      client.emit('loadDocument', {
        delta: JSON.parse(data.data),
        connectedUsers: this.getDocumentActiveUsers(`${dat.documentId}`),
      });
    }
  }

  getDocumentActiveUsers(documentId: string) {
    console.log(this.clients);

    const users = Array.from(this.clients)
      .filter(([key]) => key.split('_')[0] === documentId)
      .map(([, value]) => value);
    return users;
  }

  updateOnlineUsers(docId?: string): void {
    const onlineUsers = this.getDocumentActiveUsers(docId);
    if (docId) {
      this.server.to(docId).emit('onlineUsers', onlineUsers);
    }
  }
}
