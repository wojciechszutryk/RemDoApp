import HistoryIcon from "@mui/icons-material/History";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import { useDeleteAllSearchHistoryMutation } from "../../../mutations/deleteAllSearchHistory.mutation";
import { ClearHistoryWrapper, StyledWrapper } from "./styles";

const HistoryInfoHeader = (): JSX.Element | null => {
  const { t } = useTranslation();
  const deleteAllSearchHistoryMutation = useDeleteAllSearchHistoryMutation();

  return (
    <StyledWrapper>
      <div>
        <HistoryIcon />
        {t(TranslationKeys.LastSearches)}
      </div>
      <ClearHistoryWrapper
        onClick={() => deleteAllSearchHistoryMutation.mutate()}
      >
        {t(TranslationKeys.ClearHistory)}
      </ClearHistoryWrapper>
    </StyledWrapper>
  );
};

export default HistoryInfoHeader;
