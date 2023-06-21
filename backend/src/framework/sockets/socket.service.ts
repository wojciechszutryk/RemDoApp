import * as http from "http";
import { injectable } from "inversify";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { USER_PARAM } from "linked-models/user/user.urls";
import { Server } from "socket.io";

@injectable()
export class SocketService {
  private readonly io: Server;

  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, {
      transports: ["websocket"],
      cors: {
        origin: "*",
      },
    });

    this.initialize();
  }

  initialize() {
    this.io.on("connect", (socket) => {
      const userParam = socket.handshake.query[USER_PARAM];

      if (userParam && !Array.isArray(userParam)) {
        socket.join(this.getUserUrlRoom(userParam));
      }
    });
  }

  private getUserUrlRoom(userId: string) {
    return USER_PARAM + ": " + userId;
  }

  public notifyUsers<T>(notifications: INotificationDto[], payload: T) {
    notifications.forEach((notification) => {
      this.io
        .in(this.getUserUrlRoom(notification.userId))
        .emit(notification.action, { notification, payload });
    });
  }
}
