import { fireEvent, render } from "@testing-library/react";
import ActiveNotificationsTopPanel from "./ActiveNotificationsTopPanel";

// Mock the i18next translation function
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the useEditUserNotificationsMutation hook
const mutate = jest.fn();
jest.mock(
  "framework/notifications/mutations/editUserNotification.mutation",
  () => ({
    useEditUserNotificationsMutation: jest.fn(() => ({
      mutate: () => mutate(),
    })),
  })
);

// Mock the TranslationKeys module
jest.mock("framework/translations/translatedTexts/translationKeys", () => ({
  TranslationKeys: {
    Notifications: "Notifications",
    ArchiveAll: "ArchiveAll",
  },
}));

// Mock the mutation function
const mockMutate = jest.fn();
jest.mock(
  "framework/notifications/mutations/editUserNotification.mutation",
  () => ({
    useEditUserNotificationsMutation: () => ({
      mutate: mockMutate,
    }),
  })
);

describe("ActiveNotificationsTopPanel", () => {
  it("renders correctly", () => {
    const notificationIDs = ["id1", "id2"];
    const { getByText, getByTestId } = render(
      <ActiveNotificationsTopPanel notificationIDs={notificationIDs} />
    );

    // Ensure that the component renders with the correct text
    expect(getByText("Notifications: 2")).toBeInTheDocument();

    // Ensure that the "Archive" button is rendered
    const archiveButton = getByTestId("archive-button");
    expect(archiveButton).toBeInTheDocument();
  });

  it("handles button click", () => {
    const notificationIDs = ["id1", "id2"];
    const { getByTestId } = render(
      <ActiveNotificationsTopPanel notificationIDs={notificationIDs} />
    );

    // Click the "Archive" button
    const archiveButton = getByTestId("archive-button");
    fireEvent.click(archiveButton);

    // Ensure that the mutation function is called with the correct parameters
    expect(mockMutate).toHaveBeenCalledWith(
      notificationIDs.map((id) => ({
        editedUserNotificationId: id,
        state: "ARCHIVED",
      }))
    );
  });
});
