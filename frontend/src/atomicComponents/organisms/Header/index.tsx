import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useMediaQuery } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalSearch from "./components/GlobalSearch";
import LogoButton from "./components/LogoButton";
import NotificationsMenu from "./components/NotificationsMenu";
import SettingsMenu from "./components/SettingsMenu";
import UserMenu from "./components/UserMenu";
import { LAST_PAGE_LS_KEY } from "./helpers/LS.keys.const.helper";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderButton,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

interface Props {
  disableBgcAnimation?: boolean;
}

export const Header = ({ disableBgcAnimation }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, isAutoLoginLoading } = useCurrentUser();
  const location = useLocation();
  const currentPagePath = location.pathname.split("/")[1];
  const isMobile = useMediaQuery("(max-width:800px)");

  const handleNavigate = (path: string) => () => {
    localStorage.setItem(LAST_PAGE_LS_KEY, path);
    navigate(path);
  };

  useEffect(() => {
    if (currentUser) {
      // redirect to last page after login
      //TODO - move to a separate hook and other location
      const lastPage = localStorage.getItem(LAST_PAGE_LS_KEY);

      if (lastPage) {
        navigate(lastPage);
      } else {
        navigate("/");
      }
    }
  }, [currentUser]);

  let content: JSX.Element | null = null;
  if (isAutoLoginLoading)
    content = (
      <div style={{ height: 100, width: "100%" }}>
        <LogoButton small={isMobile} />
      </div>
    );
  else if (currentUser)
    content = (
      <>
        <SettingsMenu />
        <UserMenu />
        <StyledHeaderButton
          onClick={handleNavigate(Pages.RemindersPage.path)}
          disabled={currentPagePath === Pages.RemindersPage.path.substring(1)}
        >
          {isMobile ? <EventIcon /> : t(TranslationKeys.PageTitleReminders)}
        </StyledHeaderButton>
        <LogoButton small={isMobile} />
        <StyledHeaderButton
          onClick={handleNavigate(Pages.TodoListsPage.path)}
          disabled={currentPagePath === Pages.TodoListsPage.path.substring(1)}
        >
          {isMobile ? <FactCheckIcon /> : t(TranslationKeys.PageTitleTodoLists)}
        </StyledHeaderButton>
        <GlobalSearch />
        <NotificationsMenu />
      </>
    );
  else
    content = (
      <>
        <LogoButton />
        <Button
          onClick={handleNavigate(Pages.LoginPage.path)}
          disabled={currentPagePath === Pages.LoginPage.path.substring(1)}
        >
          {t(TranslationKeys.LoginButtonText)}
        </Button>
        <SettingsMenu />
      </>
    );

  return (
    <StyledHeaderWrapper>
      <StyledHeaderContentWrapper>{content}</StyledHeaderContentWrapper>
      <StyledHeaderBottomAnimation disableBgcAnimation={disableBgcAnimation} />
    </StyledHeaderWrapper>
  );
};
