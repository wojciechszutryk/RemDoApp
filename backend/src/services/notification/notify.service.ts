import { inject, injectable } from "inversify";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { CreatorScopedEventPayload } from "linked-models/event/event.handler.interface";
import { AppLanguages } from "linked-models/language/languages.enum";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { ITaskAttached } from "linked-models/task/task.model";
import { URL_TASK, URL_TASKS } from "linked-models/task/task.urls";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import {
  IUserAttached,
  NotificationPreference,
} from "linked-models/user/user.model";
import { URL_USER } from "linked-models/user/user.urls";
import { INotificationsTexts } from "models/notification.text.model";
import { UserService } from "services/user/user.service";
import { EmailNotificationService } from "./email.notification.service";
import { NotificationService } from "./notification.service";
import { PushNotificationService } from "./push.notification.service";
import { SocketNotificationService } from "./socket.notification.service";

/**
 * for collaboration - IUserPublicDataDTO
 * for reminders - IReminderAttached or CreatorScopedEventPayload<IReminderAttached>
 * for todoList - ITodoListDTO or ITodoListWithMembersDto
 * for tasks - ITaskAttached or CreatorScopedEventPayload<ITaskAttached>
 */
type TExtendsType =
  | ITodoListWithMembersDto
  | ITodoListAttached
  | CreatorScopedEventPayload<ITaskAttached | IReminderAttached>
  | IUserPublicDataDTO
  | IReminderAttached
  | ITaskAttached;

@injectable()
export class NotifyService {
  constructor(
    @inject(NotificationService)
    private readonly notificationService: NotificationService,
    @inject(SocketNotificationService)
    private readonly socketNotificationService: SocketNotificationService,
    @inject(EmailNotificationService)
    private readonly emailNotificationService: EmailNotificationService,
    @inject(PushNotificationService)
    private readonly pushNotificationService: PushNotificationService,
    @inject(UserService)
    private readonly userService: UserService
  ) {}

  private getUsersToNotiftByPreference(
    users: IUserAttached[],
    preferenceScope: EventName,
    preference: NotificationPreference
  ) {
    return users.filter(
      (u) =>
        u.preferences.notificationPreferences[preferenceScope].includes(
          preference
        ) ||
        u.preferences.notificationPreferences[preferenceScope] ===
          NotificationPreference.ALL
    );
  }

  private getEventCreatorFromPayload<T extends TExtendsType>(payload: T) {
    let creatorFromPayload = null;

    if ("eventCreator" in payload) {
      creatorFromPayload = (
        payload as CreatorScopedEventPayload<ITaskAttached | IReminderAttached>
      ).eventCreator;
    } else if ("displayName" in payload) {
      creatorFromPayload = payload;
    }

    return creatorFromPayload;
  }

  private createNotificationTexts<T extends TExtendsType>(
    eventName: EventName,
    payload: T,
    eventCreatorName?: string
  ): INotificationsTexts {
    let titleEN = "";
    let titlePL = "";
    let descriptionEN = "";
    let descriptionPL = "";

    let taskText = null;
    let todoListName = null;
    let plannedStartDate = null;
    let plannedFinishDate = null;

    if ("name" in payload && "id" in payload) {
      //todoList case (ITodoListWithMembersDto| ITodoListAttached)
      todoListName = payload.name;
    } else if ("name" in payload) {
      // reminder case (IReminderAttached)
      todoListName = payload.name;
      taskText = payload.text;
      plannedStartDate = payload.startDate;
      plannedFinishDate = payload.finishDate;
    } else if ("text" in payload && "id" in payload) {
      //task case (ITaskAttached)
      taskText = payload.text;
      plannedStartDate = payload.startDate;
      plannedFinishDate = payload.finishDate;
    } else if ("payload" in payload && "name" in payload.payload) {
      //task case (CreatorScopedEventPayload<IReminderAttached>)
      todoListName = payload.payload.name;
      taskText = payload.payload.text;
      plannedStartDate = payload.payload.startDate;
      plannedFinishDate = payload.payload.finishDate;
    } else if ("payload" in payload && "id" in payload.payload) {
      //task case (CreatorScopedEventPayload<ITaskAttached>)
      taskText = payload.payload.text;
      plannedStartDate = payload.payload.startDate;
      plannedFinishDate = payload.payload.finishDate;
    }

    const todoListNamePart = todoListName ? ` (${todoListName})` : "";
    const taskTitlePart = taskText ? ` (${taskText})` : "";
    const byUserPLPart = ` przez ${eventCreatorName}`;
    const byUserENPart = ` by ${eventCreatorName}`;
    const plannedStartDatePLPart = plannedStartDate
      ? ` Rozpocznie się ono: ${plannedStartDate}.`
      : "";
    const plannedStartDateENPart = plannedStartDate
      ? ` It will start at ${plannedStartDate}.`
      : "";
    const plannedFinishDatePLPart = plannedFinishDate
      ? ` Będzie trwać do ${plannedFinishDate}.`
      : "";
    const plannedFinishDateENPart = plannedFinishDate
      ? ` It will last until ${plannedFinishDate}.`
      : "";

    switch (eventName) {
      case EventName.TodoListCreated:
        titlePL = "Zaproszenie do nowej listy zadań";
        descriptionPL = `Zostałeś/aś zaproszony/a do nowej listy zadań${todoListNamePart}${byUserPLPart}`;
        titleEN = "Invitation to new todo list";
        descriptionEN = `You have been invited to new todo list${todoListNamePart}${byUserENPart}`;
        break;
      case EventName.TodoListUpdated:
        titlePL = "Zmiana listy zadań";
        descriptionPL = `Lista zadań${todoListNamePart} została zaktualizowana${byUserPLPart}`;
        titleEN = "Todo list was updated";
        descriptionEN = `Todo list ${todoListNamePart} was updated${byUserENPart}`;
        break;
      case EventName.TodoListDeleted:
        titlePL = "Usunięto listę zadań";
        descriptionPL = `Lista zadań${todoListNamePart} została usunięta${byUserPLPart}`;
        titleEN = "Todo list was deleted";
        descriptionEN = `Todo list${todoListNamePart} was deleted${byUserENPart}`;
        break;
      case EventName.TodoListMemberAdded:
        titlePL = "Nowy członek listy zadań";
        descriptionPL = `Do listy zadań${todoListNamePart} dodano nowego członka${byUserPLPart}`;
        titleEN = "New member in todo list";
        descriptionEN = `New member was added to todo list${todoListNamePart}${byUserENPart}`;
        break;
      case EventName.TodoListMemberRemoved:
        titlePL = "Usunięto członka listy zadań";
        descriptionPL = `Z listy zadań${todoListNamePart} usunięto członka${byUserPLPart}`;
        titleEN = "Member removed from todo list";
        descriptionEN = `Member was removed from todo list${todoListNamePart}${byUserENPart}`;
        break;
      case EventName.TaskCreated:
        titlePL = "Nowe zadanie";
        descriptionPL = `Do listy zadań${todoListNamePart} dodano nowe zadanie ${taskTitlePart}${byUserPLPart}.${plannedStartDatePLPart}${plannedFinishDatePLPart}`;
        titleEN = "New task";
        descriptionEN = `New task${taskTitlePart} was added to todo list${todoListNamePart}${byUserENPart}.${plannedStartDateENPart}${plannedFinishDateENPart}`;
        break;
      case EventName.TaskUpdated:
        titlePL = "Zaktualizowano zadanie";
        descriptionPL = `Zadanie${taskTitlePart} zostało zaktualizowane w liście zadań${todoListNamePart}${byUserPLPart}${plannedStartDatePLPart}${plannedFinishDatePLPart}`;
        titleEN = "Task was updated";
        descriptionEN = `Task${taskTitlePart} was updated in todo list${todoListNamePart}${byUserENPart}${plannedStartDateENPart}${plannedFinishDateENPart}}`;
        break;
      case EventName.TaskDeleted:
        titlePL = "Usunięto zadanie";
        descriptionPL = `Zadanie${taskTitlePart} zostało usunięte z listy zadań${todoListNamePart}${byUserPLPart}`;
        titleEN = "Task was deleted";
        descriptionEN = `Task${taskTitlePart} was deleted from todo list${todoListNamePart}${byUserENPart}`;
        break;
      case EventName.CollaboartionRequested:
        titlePL = "Zaproszenie do współpracy";
        descriptionPL = `Zostałeś/aś zaproszony/a do współpracy${byUserPLPart}`;
        titleEN = "Collaboration request";
        descriptionEN = `You have been invited to collaboration${byUserENPart}`;
        break;
      case EventName.CollaboartionAccepted:
        titlePL = "Akceptacja zaproszenia do współpracy";
        descriptionPL = `Zaproszenie do współpracy zostało zaakceptowane${byUserPLPart}`;
        titleEN = "Collaboration request accepted";
        descriptionEN = `Collaboration request was accepted${byUserENPart}`;
        break;
      case EventName.CollaboartionReOpened:
        titlePL = "Wznowienie zaproszenia do współpracy";
        descriptionPL = `Zaproszenie do współpracy zostało wznowione${byUserPLPart}`;
        titleEN = "Collaboration request reopened";
        descriptionEN = `Collaboration request was reopened${byUserENPart}`;
        break;
      case EventName.CollaboartionRejected:
        titlePL = "Odrzucenie zaproszenia do współpracy";
        descriptionPL = `Zaproszenie do współpracy zostało odrzucone${byUserPLPart}`;
        titleEN = "Collaboration request rejected";
        descriptionEN = `Collaboration request was rejected${byUserENPart}`;
        break;
      case EventName.CollaboartionBlocked:
        titlePL = "Zablokowanie współpracy";
        descriptionPL = `Współpraca została zablokowana${byUserPLPart}`;
        titleEN = "Collaboration blocked";
        descriptionEN = `Collaboration was blocked${byUserENPart}`;
        break;
      case EventName.ScheduleTaskNotification:
        titlePL = "Zaplanowano zadanie";
        descriptionPL = `Zaplanowane zadanie.${taskTitlePart}${plannedStartDatePLPart}${plannedFinishDatePLPart}`;
        titleEN = "Task was scheduled";
        descriptionEN = `Task${taskTitlePart}was scheduled.${plannedStartDateENPart}${plannedFinishDateENPart}`;
        break;
      case EventName.ScheduleReminderNotification:
        titlePL = "Zaplanowano przypomnienie";
        descriptionPL = `Zaplanowane przypomnienie${taskTitlePart}.${plannedStartDatePLPart}${plannedFinishDatePLPart}`;
        titleEN = "Reminder was scheduled";
        descriptionEN = `Reminder${taskTitlePart}was scheduled.${plannedStartDatePLPart}${plannedFinishDatePLPart}`;
        break;
    }

    return {
      title: {
        [AppLanguages.en]: titleEN,
        [AppLanguages.pl]: titlePL,
      },
      description: {
        [AppLanguages.en]: descriptionEN,
        [AppLanguages.pl]: descriptionPL,
      },
    };
  }

  private createNotificationLink<T extends TExtendsType>(
    eventName: EventName,
    payload: T
  ): string | null {
    if (eventName === EventName.TodoListDeleted) return null;

    const baseUrl = process.env.CLIENT_URL?.includes("#")
      ? process.env.CLIENT_URL
      : process.env.CLIENT_URL + "/#";

    let todoListId: string | null = null;
    let taskId = null;

    if ("displayName" in payload) {
      //user case (IUserPublicDataDTO)
      return `${baseUrl}${URL_COLLABORANTS}${URL_USER(payload.id)}`;
    } else if ("name" in payload && "id" in payload) {
      //todoList case (ITodoListWithMembersDto| ITodoListAttached)
      todoListId = payload.id;
    } else if ("name" in payload) {
      // reminder case (IReminderAttached)
      todoListId = payload.todoListId;
      taskId = payload.taskId;
    } else if ("text" in payload && "id" in payload) {
      //task case (ITaskAttached)
      todoListId = payload.todoListId;
      taskId = payload.id;
    } else if ("payload" in payload && "name" in payload.payload) {
      //task case (CreatorScopedEventPayload<IReminderAttached>)
      todoListId = payload.payload.todoListId;
      taskId = payload.payload.taskId;
    } else if ("payload" in payload && "id" in payload.payload) {
      //task case (CreatorScopedEventPayload<ITaskAttached>)
      todoListId = payload.payload.todoListId;
      taskId = payload.payload.id;
    }

    if (!todoListId) return null;

    if (
      eventName === EventName.TaskDeleted ||
      eventName === EventName.ReminderDeleted
    ) {
      taskId = null;
    }

    const link = `${baseUrl}${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}`;

    if (!!taskId) {
      return `${link}${URL_TASKS}${URL_TASK(taskId)}`;
    }

    return link;
  }

  public async notifyUsers<T extends TExtendsType>(
    /** potential users to notify - e.g. todoList members or owners */
    memberUsers: IUserAttached[],
    eventCreatorId: string,
    eventName: EventName,
    eventSubject: EventSubject,
    payload: T,
    notificationScopes?: {
      todoListId?: string;
      taskId?: string;
    },
    includeEventCreator?: boolean
  ): Promise<void> {
    //for now we create notification for all users
    //TODO: handle NotificationPreference.NONE and do not create notification for those users
    const usersToNotify = includeEventCreator
      ? memberUsers
      : memberUsers.filter((u) => u.id !== eventCreatorId);
    const usersToNotifyIDs = memberUsers.map((u) => u.id);

    let eventCreator = this.getEventCreatorFromPayload(payload);

    const [createdNotifications, fetchedCreator] = await Promise.all([
      this.notificationService.createNotificationForUsers(
        usersToNotifyIDs,
        eventName,
        eventSubject,
        eventCreatorId,
        notificationScopes?.todoListId,
        notificationScopes?.taskId
      ),
      !eventCreator && this.userService.getUsersByIDs([eventCreatorId]),
    ]);

    if (!eventCreator && !!fetchedCreator) {
      eventCreator = fetchedCreator?.[0];
    }

    /** SOCKET START */
    const usersToNotifyBySocket = this.getUsersToNotiftByPreference(
      usersToNotify,
      eventName,
      NotificationPreference.SOCKET
    );
    const notificationsToSendBySocket = createdNotifications.filter((n) =>
      usersToNotifyBySocket.some((u) => u.id === n.userId)
    );
    this.socketNotificationService.notifyUsers(
      notificationsToSendBySocket,
      payload
    );
    /** SOCKET END */

    const notificationTexts = this.createNotificationTexts(
      eventName,
      payload,
      eventCreator?.displayName
    );

    const notificationLink = this.createNotificationLink(eventName, payload);

    /** PUSH START */
    const usersToNotifyByPush = this.getUsersToNotiftByPreference(
      usersToNotify,
      eventName,
      NotificationPreference.PUSH
    );
    this.pushNotificationService.notifyUsers(
      notificationTexts,
      notificationLink,
      usersToNotifyByPush,
      eventCreator?.avatarUrl
    );
    /** PUSH END */

    /** EMAIL START */
    const usersToNotifyByEmail = this.getUsersToNotiftByPreference(
      usersToNotify,
      eventName,
      NotificationPreference.EMAIL
    );
    this.emailNotificationService.sendEmailNotifications(
      notificationTexts,
      notificationLink,
      usersToNotifyByEmail,
      eventCreator?.avatarUrl
    );
    /** EMAIL END */
  }
}
