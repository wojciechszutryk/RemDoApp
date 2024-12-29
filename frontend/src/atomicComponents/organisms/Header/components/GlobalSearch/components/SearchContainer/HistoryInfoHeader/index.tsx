import { Button } from "atomicComponents/atoms/Button";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useDeleteAllSearchHistoryMutation } from "../../../mutations/deleteAllSearchHistory.mutation";
import { StyledWrapper } from "./styles";

const HistoryInfoHeader = (): JSX.Element | null => {
  const { t } = useTranslation();
  const deleteAllSearchHistoryMutation = useDeleteAllSearchHistoryMutation();

  return (
    <StyledWrapper>
      <div>{t(TranslationKeys.LastSearches)}</div>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mr: 2 }}
        onClick={() => deleteAllSearchHistoryMutation.mutate()}
      >
        {t(TranslationKeys.ClearHistory)}
      </Button>
    </StyledWrapper>
  );
};

export default HistoryInfoHeader;
