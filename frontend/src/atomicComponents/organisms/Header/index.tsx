import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { useMediaQuery } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsMenu from "./components/NotificationsMenu";
import SettingsMenu from "./components/SettingsMenu";
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

  return (
    <StyledHeaderWrapper>
      <StyledHeaderContentWrapper>
        <StyledHeaderButton
          onClick={() => navigate(Pages.HomePage.path)}
          disabled={!currentPagePath}
        >
          {isMobile ? <MapsHomeWorkIcon /> : t(TranslationKeys.PageTitleHome)}
        </StyledHeaderButton>
        {currentUser ? (
          <>
            <StyledHeaderButton
              onClick={() => navigate(Pages.RemindersPage.path)}
              disabled={
                currentPagePath === Pages.RemindersPage.path.substring(1)
              }
            >
              {isMobile ? <EventIcon /> : t(TranslationKeys.PageTitleReminders)}
            </StyledHeaderButton>
            <StyledHeaderButton
              onClick={() => navigate(Pages.TodoListsPage.path)}
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
            <NotificationsMenu />
          </>
        ) : (
          <StyledHeaderButton
            onClick={() => navigate(Pages.LoginPage.path)}
            disabled={currentPagePath === Pages.LoginPage.path.substring(1)}
          >
            {t(TranslationKeys.LoginButtonText) +
              " / " +
              t(TranslationKeys.RegisterButtonText)}
          </StyledHeaderButton>
        )}

        <SettingsMenu />
      </StyledHeaderContentWrapper>
      <StyledHeaderBottomAnimation className="aaaa" />
    </StyledHeaderWrapper>
  );
};
