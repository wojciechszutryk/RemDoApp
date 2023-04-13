import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Button } from "atomicComponents/atoms/Button";
import { changeTheme } from "framework/theme/changeTheme";
import { TranslationKeys } from "framework/translations/translationKeys";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HideOnScroll from "./components/HideOnScroll";
import {
  StyledHeaderBottomAnimation,
  StyledHeaderContentWrapper,
  StyledHeaderWrapper,
} from "./styles";

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HideOnScroll>
      <StyledHeaderWrapper>
        <StyledHeaderContentWrapper>
          <Button onClick={() => navigate("/reminders")}>
            {t(TranslationKeys.PageTitleReminders)}
          </Button>
          <Button onClick={() => navigate("/todoLists")}>
            {t(TranslationKeys.PageTitleTodoLists)}
          </Button>
          <Button onClick={changeTheme}>
            <DarkModeOutlinedIcon />
          </Button>
        </StyledHeaderContentWrapper>
        <StyledHeaderBottomAnimation />
      </StyledHeaderWrapper>
    </HideOnScroll>
  );
};
