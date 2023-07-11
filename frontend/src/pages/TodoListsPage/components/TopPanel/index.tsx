import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledWrapper } from "./styles";

const TopPanel = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const { t } = useTranslation();

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  return (
    <StyledWrapper>
      <Button onClick={handleOpenCreateTodoListDialog}>
        {t(TranslationKeys.CreateNewTodoList)}
      </Button>
    </StyledWrapper>
  );
};

export default memo(TopPanel);
