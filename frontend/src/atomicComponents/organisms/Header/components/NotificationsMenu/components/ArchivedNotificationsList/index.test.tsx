import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IUserNotificationsQueryData } from "framework/notifications/queries/getUserNotifications.query";
import ArchivedNotificationsList from "./";

// Mock the NotificationsList component
jest.mock("../NotificationsList", () => {
  return function MockNotificationsList() {
    return <div>notifications-list</div>;
  };
});

describe("ArchivedNotificationsList Component", () => {
  it("should expand and collapse when clicking on the top panel", async () => {
    const notificationsData: IUserNotificationsQueryData = {
      notifications: [],
      todoListsMap: new Map(),
      tasksMap: new Map(),
      creatorsMap: new Map(),
    };
    const hideNotificationMenu = jest.fn();

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ArchivedNotificationsList
          notificationsData={notificationsData}
          hideNotificationMenu={hideNotificationMenu}
        />
      </QueryClientProvider>
    );

    const topPanel = screen.getByText("ArchivedNotifications : 0");
    const notificationList = screen.queryAllByText("notifications-list");

    // Initially, the collapse should not be visible
    expect(notificationList.length).toEqual(0);

    // Simulate a click on the top panel
    fireEvent.click(topPanel);

    // After clicking, the collapse should be visible
    const notificationListAfterClick =
      screen.queryAllByText("notifications-list");
    expect(notificationListAfterClick.length).toEqual(1);

    // Click again to collapse
    const topPanelAfterClick = screen.getByText("ArchivedNotifications : 0");
    fireEvent.click(topPanelAfterClick);

    // After clicking, the collapse should not be visible again (after the animation is finished and unmounting is done)
    await waitFor(() => {
      const notificationListAfterSecondClick =
        screen.queryAllByText("notifications-list");
      expect(notificationListAfterSecondClick.length).toEqual(0);
    });
  });
});
