/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import * as useCurrentUserModule from "framework/authentication/useCurrentUser";
import { IUserAttached } from "linked-models/user/user.model";
import { Header } from "./";

jest.mock("@mui/icons-material/Event", () => () => (
  <div data-testid={"event-icon"}>EventIcon</div>
));
jest.mock("@mui/icons-material/FactCheck", () => () => (
  <div>FactCheckIcon</div>
));
jest.mock("framework/authentication/useCurrentUser");
jest.mock("framework/routing/pages");
jest.mock("framework/translations/translatedTexts/translationKeys");
jest.mock("react-i18next");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: () => ({
    pathname: "/some/path",
  }),
}));
jest.mock("./components/SettingsMenu", () => () => <div>SettingsMenu</div>);
jest.mock("./components/LogoButton", () => () => <div>LogoButton</div>);
jest.mock("./components/NotificationsMenu", () => () => (
  <div>NotificationsMenu</div>
));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Header", () => {
  it("renders the header for an authenticated user", () => {
    jest.spyOn(useCurrentUserModule, "useCurrentUser").mockReturnValue({
      currentUser: {} as IUserAttached,
      setCurrentUser: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("SettingsMenu")).toBeInTheDocument();
    expect(screen.getByText("LogoButton")).toBeInTheDocument();
    expect(screen.getByText("NotificationsMenu")).toBeInTheDocument();
  });

  it("renders the header for an unauthenticated user", () => {
    jest
      .spyOn(useCurrentUserModule, "useCurrentUser")
      .mockReturnValue({ currentUser: undefined, setCurrentUser: jest.fn() });

    render(<Header />);

    expect(screen.getByText("LogoButton")).toBeInTheDocument();
    expect(
      screen.getByText("LoginButtonText / RegisterButtonText")
    ).toBeInTheDocument();
    expect(screen.getByText("SettingsMenu")).toBeInTheDocument();
  });
});
