import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledHeader, StyledWrapper } from "./styles";

const TopPanel = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const { t } = useTranslation();

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  return (
    <StyledWrapper>
      <StyledHeader variant="h4">
        {t(TranslationKeys.PageTitleTodoLists)}
      </StyledHeader>
      <Button onClick={handleOpenCreateTodoListDialog}>
        {t(TranslationKeys.CreateNewTodoList)}
      </Button>
    </StyledWrapper>
  );
};

export default memo(TopPanel);
