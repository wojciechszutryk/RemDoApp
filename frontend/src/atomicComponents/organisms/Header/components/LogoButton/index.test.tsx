import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogoButton from "./";

const mockedUsedNavigate = jest.fn();

// 2- Mock the library
jest.mock("react-router-dom", () => ({
  // 3- Import non-mocked library and use other functionalities and hooks
  ...jest.requireActual("react-router-dom"),

  // 4- Mock the required hook
  useNavigate: () => mockedUsedNavigate,
}));

describe("LogoButton", () => {
  it("renders the LogoButton component", () => {
    render(
      <BrowserRouter>
        <LogoButton />
      </BrowserRouter>
    );

    const logoButton = screen.getByTestId("logo-wrapper");
    expect(logoButton).toBeInTheDocument();

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("navigates to the homepage when clicked", () => {
    render(
      <BrowserRouter>
        <LogoButton />
      </BrowserRouter>
    );

    const logoWrapper = screen.getByTestId("logo-wrapper");

    // Click the LogoButton
    fireEvent.click(logoWrapper);

    // Ensure that the navigate function is called with the correct path
    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/"); // Adjust the path as needed
  });
});
