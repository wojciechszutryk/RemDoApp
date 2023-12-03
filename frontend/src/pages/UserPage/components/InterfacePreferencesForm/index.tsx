import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useChangePreferencesMutation } from "pages/UserPage/mutations/useChangePreferences.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  StyledForm,
  StyledSubmitButton,
} from "../NotificationsSettings/styles";

interface InterfacePreferencesForm {
  disableBgcAnimations: boolean;
}

const InterfacePreferencesForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const changePreferencesMutation = useChangePreferencesMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      disableBgcAnimations:
        currentUser?.preferences.disableBgcAnimations || false,
    },
  });

  const onSubmit = (data: InterfacePreferencesForm) => {
    changePreferencesMutation.mutate(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex" }}>
        <ControlledCheckbox
          name={"disableBgcAnimations"}
          control={control}
          label={t(TranslationKeys.DisableBackgroundAnimation)}
        />
      </div>
      <StyledSubmitButton type="submit">
        {t(TranslationKeys.Save)}
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default memo(InterfacePreferencesForm);
