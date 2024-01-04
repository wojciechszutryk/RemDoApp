import { Skeleton, Typography } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useVerifyAccountMutation } from "./mutations/useVerifyAccount.mutation";
import { StyledAlert } from "./styles";

const VerifyAccountPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const verifyAccountmutation = useVerifyAccountMutation();

  const handleVerifyAccount = () => {
    if (verifyAccountmutation.isLoading) return;
    verifyAccountmutation.mutate(undefined);
  };

  return (
    <StyledAlert>
      <Typography variant="h2">
        {t(TranslationKeys.VerifyAccountTitle)}
      </Typography>
      {verifyAccountmutation.isSuccess ? (
        <p>{t(TranslationKeys.VerifyAccountSuccess)}</p>
      ) : (
        <>
          <p>{t(TranslationKeys.VerifyAccountDescription)} </p>
          {verifyAccountmutation.isLoading ? (
            <Skeleton width={70} height={22} />
          ) : (
            <strong onClick={handleVerifyAccount}>
              {t(TranslationKeys.VerifyAccountTitle)}
            </strong>
          )}
        </>
      )}
    </StyledAlert>
  );
};

export default memo(VerifyAccountPanel);
