import { useResendVerificationEmailMutation } from "framework/authentication/mutations/resendVerificationEmail.mutation";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { UseFormSetError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ILoginFormValues } from "../LoginForm";
import { StyledAlertWrapper } from "./styles";

interface Props {
  email: string;
  setError: UseFormSetError<ILoginFormValues>;
}

const VerifyAccountAlert = ({ email, setError }: Props): JSX.Element => {
  const resendVerificationEmailMutation = useResendVerificationEmailMutation();
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();

  const handleResendVerificationEmail = () => {
    if (!email) {
      setError("email", { message: t(TranslationKeys.EmailRequired) });
      return;
    }

    resendVerificationEmailMutation.mutate(email, {
      onSuccess: () => {
        setSnackbar({ message: t(TranslationKeys.EmailSent) });
      },
    });
  };

  return (
    <StyledAlertWrapper>
      {t(TranslationKeys.EmailNotVerified)}
      <strong onClick={handleResendVerificationEmail}>
        {" "}
        {t(TranslationKeys.ResendVerificationEmail)}
      </strong>
    </StyledAlertWrapper>
  );
};

export default memo(VerifyAccountAlert);
