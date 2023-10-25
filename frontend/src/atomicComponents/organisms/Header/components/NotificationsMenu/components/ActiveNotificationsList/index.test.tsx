import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import ActiveNotificationsList from ".";

// Mock the NotificationsList component
jest.mock("../NotificationsList", () => {
  return function MockNotificationsList() {
    return <div>notifications-list</div>;
  };
});

describe("ActiveNotificationsList", () => {
  it("renders ActiveNotificationsTopPanel", () => {
    const notificationsData: IUserNotificationsQueryData = {
      notifications: [
        {
          userNotificationId: "id1",
          state: UserNotificationState.Fresh,
          notificationId: "id1",
          action: EventName.CollaboartionAccepted,
          actionSubject: EventSubject.Collaboration,
          actionCreatorId: "id1",
          userId: "id1",
        },
      ],
      tasksMap: new Map(),
      creatorsMap: new Map(),
      todoListsMap: new Map(),
    };

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ActiveNotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={() => {}}
        />
      </QueryClientProvider>
    );
    const topPanel = screen.getByText("Notifications: 1");
    expect(topPanel).toBeInTheDocument();
  });

  it("renders only one NotificationsList for fresh notifications", () => {
    const notificationsData: IUserNotificationsQueryData = {
      notifications: [
        {
          userNotificationId: "id1",
          state: UserNotificationState.Fresh,
          notificationId: "id1",
          action: EventName.CollaboartionAccepted,
          actionSubject: EventSubject.Collaboration,
          actionCreatorId: "id1",
          userId: "id1",
        },
      ],
      tasksMap: new Map(),
      creatorsMap: new Map(),
      todoListsMap: new Map(),
    };

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ActiveNotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={() => {}}
        />
      </QueryClientProvider>
    );
    const notificationsList = screen.getByText("notifications-list");
    expect(notificationsList).toBeInTheDocument();
  });

  it("renders only one NotificationsList for read notifications", () => {
    const notificationsData: IUserNotificationsQueryData = {
      notifications: [
        {
          userNotificationId: "id1",
          state: UserNotificationState.Read,
          notificationId: "id1",
          action: EventName.CollaboartionAccepted,
          actionSubject: EventSubject.Collaboration,
          actionCreatorId: "id1",
          userId: "id1",
        },
      ],
      tasksMap: new Map(),
      creatorsMap: new Map(),
      todoListsMap: new Map(),
    };

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ActiveNotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={() => {}}
        />
      </QueryClientProvider>
    );
    const notificationsList = screen.getByText("notifications-list");
    expect(notificationsList).toBeInTheDocument();
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
  });

  it("renders a Divider between fresh and read notifications", () => {
    const notificationsData: IUserNotificationsQueryData = {
      notifications: [
        {
          userNotificationId: "id1",
          state: UserNotificationState.Read,
          notificationId: "id1",
          action: EventName.CollaboartionAccepted,
          actionSubject: EventSubject.Collaboration,
          actionCreatorId: "id1",
          userId: "id1",
        },
        {
          userNotificationId: "id1",
          state: UserNotificationState.Fresh,
          notificationId: "id1",
          action: EventName.CollaboartionAccepted,
          actionSubject: EventSubject.Collaboration,
          actionCreatorId: "id1",
          userId: "id1",
        },
      ],
      tasksMap: new Map(),
      creatorsMap: new Map(),
      todoListsMap: new Map(),
    };

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ActiveNotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={() => {}}
        />
      </QueryClientProvider>
    );

    const notificationsList = screen.queryAllByText("notifications-list");
    expect(notificationsList.length).toEqual(2);
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
  });
});
