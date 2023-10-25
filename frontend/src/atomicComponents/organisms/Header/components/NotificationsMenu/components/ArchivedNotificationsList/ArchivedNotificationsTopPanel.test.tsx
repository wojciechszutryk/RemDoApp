import { fireEvent, render } from "@testing-library/react";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import ArchivedNotificationsTopPanel from "./ArchivedNotificationsTopPanel";

// Mock the i18next translation function
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the useEditUserNotificationsMutation hook
const editUserMutate = jest.fn();
jest.mock(
  "framework/notifications/mutations/editUserNotification.mutation",
  () => ({
    useEditUserNotificationsMutation: jest.fn(() => ({
      mutate: editUserMutate,
    })),
  })
);

// Mock the useDeleteUserNotificationsMutation hook
const deleteNotificationsMutate = jest.fn();
jest.mock(
  "framework/notifications/mutations/deleteUserNotification.mutation",
  () => ({
    useDeleteUserNotificationsMutation: jest.fn(() => ({
      mutate: deleteNotificationsMutate,
    })),
  })
);

// Mock the TranslationKeys module
jest.mock("framework/translations/translatedTexts/translationKeys", () => ({
  TranslationKeys: {
    ArchivedNotifications: "ArchivedNotifications",
    UnarchiveAll: "UnarchiveAll",
    DeleteAllArchived: "DeleteAllArchived",
  },
}));

describe("NewNotificationsTopPanel", () => {
  it("renders correctly", () => {
    const notificationIDs = ["id1", "id2"];
    const { getByText, getByTestId } = render(
      <ArchivedNotificationsTopPanel
        notificationIDs={notificationIDs}
        expanded={true}
        setExpanded={() => {}}
      />
    );

    // Ensure that the component renders with the correct text
    expect(getByText("ArchivedNotifications : 2")).toBeInTheDocument();

    // Ensure that the "UnarchiveAll" button and "DeleteAllArchived" button are rendered
    const unarchiveButton = getByTestId("unarchive-button");
    const deleteButton = getByTestId("delete-button");
    expect(unarchiveButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("handles UnarchiveAll button click", () => {
    const notificationIDs = ["id1", "id2"];
    const { getByTestId } = render(
      <ArchivedNotificationsTopPanel
        notificationIDs={notificationIDs}
        expanded={true}
        setExpanded={() => {}}
      />
    );

    // Click the "UnarchiveAll" button
    const unarchiveButton = getByTestId("unarchive-button");
    fireEvent.click(unarchiveButton);

    // Ensure that the mutation function for unarchiving is called with the correct parameters
    expect(editUserMutate).toHaveBeenCalledWith(
      notificationIDs.map((id) => ({
        editedUserNotificationId: id,
        state: UserNotificationState.Read,
      }))
    );
  });

  it("handles DeleteAllArchived button click", () => {
    const notificationIDs = ["id1", "id2"];
    const { getByTestId } = render(
      <ArchivedNotificationsTopPanel
        notificationIDs={notificationIDs}
        expanded={true}
        setExpanded={() => {}}
      />
    );

    // Click the "DeleteAllArchived" button
    const deleteButton = getByTestId("delete-button");
    fireEvent.click(deleteButton);

    // Ensure that the mutation function for deleting is called with the correct parameters
    expect(deleteNotificationsMutate).toHaveBeenCalledWith(notificationIDs);
  });
});
