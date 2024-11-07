import TuneIcon from "@mui/icons-material/Tune";
import { Divider, ListItemIcon } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledMenuItem } from "../styles";
import PrefferedSettingsMenuOptions from "./PrefferedSettingsMenuOptions";

interface Props {
  handleClose: () => void;
}

const MenuContent = ({ handleClose }: Props): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <PrefferedSettingsMenuOptions />
      {currentUser && [
        <Divider key={"divider"} />,
        <StyledMenuItem
          key={"userSettings"}
          onClick={() => {
            handleClose();
            navigate(Pages.UserPage.path);
          }}
        >
          <ListItemIcon>
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          {t(TranslationKeys.PageTitleUserSettings)}
        </StyledMenuItem>,
      ]}
    </>
  );
};

export default memo(MenuContent);
