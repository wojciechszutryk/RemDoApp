import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Button } from "atomicComponents/atoms/Button";
import { Pages } from "framework/routing/pages";
import { useTheme } from "framework/theme/useTheme";
import { TranslationKeys } from "framework/translations/translationKeys";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HideOnScroll from "./components/HideOnScroll";
import UserMenu from "./components/UserMenu";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeTheme } = useTheme();

  return (
    <HideOnScroll>
      <StyledHeaderWrapper>
        <StyledHeaderContentWrapper>
          <Button onClick={() => navigate(Pages.RemindersPage.path)}>
            {t(TranslationKeys.PageTitleReminders)}
          </Button>
          <Button onClick={() => navigate(Pages.TodoListsPage.path)}>
            {t(TranslationKeys.PageTitleTodoLists)}
          </Button>
          <Button onClick={changeTheme}>
            <DarkModeOutlinedIcon />
          </Button>
          <UserMenu />
        </StyledHeaderContentWrapper>
        <StyledHeaderBottomAnimation />
      </StyledHeaderWrapper>
    </HideOnScroll>
  );
};
