import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SettingsMenu from "./components/SettingsMenu";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const currentPagePath = location.pathname.split("/")[1];

  return (
    <StyledHeaderWrapper>
      <StyledHeaderContentWrapper>
        <Button
          onClick={() => navigate(Pages.HomePage.path)}
          disabled={!currentPagePath}
        >
          {t(TranslationKeys.PageTitleHome)}
        </Button>
        {currentUser ? (
          <>
            <Button
              onClick={() => navigate(Pages.RemindersPage.path)}
              disabled={
                currentPagePath === Pages.RemindersPage.path.substring(1)
              }
            >
              {t(TranslationKeys.PageTitleReminders)}
            </Button>
            <Button
              onClick={() => navigate(Pages.TodoListsPage.path)}
              disabled={
                currentPagePath === Pages.TodoListsPage.path.substring(1)
              }
            >
              {t(TranslationKeys.PageTitleTodoLists)}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate(Pages.LoginPage.path)}
            disabled={currentPagePath === Pages.LoginPage.path.substring(1)}
          >
            {t(TranslationKeys.LoginButtonText) +
              " / " +
              t(TranslationKeys.RegisterButtonText)}
          </Button>
        )}

        <SettingsMenu />
      </StyledHeaderContentWrapper>
      <StyledHeaderBottomAnimation />
    </StyledHeaderWrapper>
  );
};
