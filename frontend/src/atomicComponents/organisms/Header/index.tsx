import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useMediaQuery } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LogoButton from "./components/LogoButton";
import NotificationsMenu from "./components/NotificationsMenu";
import SettingsMenu from "./components/SettingsMenu";
import { LAST_PAGE_LS_KEY } from "./helpers/LS.keys.const.helper";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderButton,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const currentPagePath = location.pathname.split("/")[1];
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleNavigate = (path: string) => () => {
    localStorage.setItem(LAST_PAGE_LS_KEY, path);
    navigate(path);
  };

  return (
    <StyledHeaderWrapper>
      <StyledHeaderContentWrapper>
        {currentUser ? (
          <>
            <StyledHeaderButton
              onClick={handleNavigate(Pages.RemindersPage.path)}
              disabled={
                currentPagePath === Pages.RemindersPage.path.substring(1)
              }
            >
              {isMobile ? <EventIcon /> : t(TranslationKeys.PageTitleReminders)}
            </StyledHeaderButton>
            <SettingsMenu />
            <LogoButton />
            <NotificationsMenu />
            <StyledHeaderButton
              onClick={handleNavigate(Pages.TodoListsPage.path)}
              disabled={
                currentPagePath === Pages.TodoListsPage.path.substring(1)
              }
            >
              {isMobile ? (
                <FactCheckIcon />
              ) : (
                t(TranslationKeys.PageTitleTodoLists)
              )}
            </StyledHeaderButton>
          </>
        ) : (
          <>
            <LogoButton />
            <StyledHeaderButton
              onClick={handleNavigate(Pages.LoginPage.path)}
              disabled={currentPagePath === Pages.LoginPage.path.substring(1)}
            >
              {`${t(TranslationKeys.LoginButtonText)} / ${t(
                TranslationKeys.RegisterButtonText
              )}`}
            </StyledHeaderButton>
            <SettingsMenu />
          </>
        )}
      </StyledHeaderContentWrapper>
      <StyledHeaderBottomAnimation />
    </StyledHeaderWrapper>
  );
};
