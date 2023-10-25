import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogoButton from "./";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
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
    
    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
