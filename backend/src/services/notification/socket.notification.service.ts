import * as http from "http";
import { injectable } from "inversify";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { USER_PARAM } from "linked-models/user/user.urls";
import { INotificationsTexts } from "models/notification.text.model";
import { Server } from "socket.io";

@injectable()
export class SocketNotificationService {
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

  public notifyUsers<T>(
    notifications: INotificationDto[],
    payload: T,
    notificationTexts: INotificationsTexts,
    usersToNotify: IUserAttached[]
  ) {
    const usersMap = usersToNotify.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, IUserAttached>);

    notifications.forEach((notification) => {
      const userLang =
        usersMap[notification.userId]?.preferences?.language || "en";
      this.io
        .in(this.getUserUrlRoom(notification.userId))
        .emit(notification.action, {
          notification,
          payload,
          message: notificationTexts.description[userLang],
        });
    });
  }
}
