import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";

const DetailsForm = (): JSX.Element => {
  const { control, formState } = useFormContext<ITaskDialog>();
  const { t } = useTranslation();
  
  return (
    <>
      <ControlledTextField
        name={"description"}
        multiline
        control={control}
        sx={{
          marginBottom: "10px",
        }}
        placeholder={t(TranslationKeys.Description)}
      />
      <ControlledTextField
        rules={{
          pattern: {
            value: /^https?:\/\/.*/,
            message: t(TranslationKeys.LinkValidation),
          },
        }}
        error={!!formState.errors?.link}
        helperText={formState.errors.link?.message}
        name={"link"}
        control={control}
        placeholder={t(TranslationKeys.Link)}
      />
    </>
  );
};

export default memo(DetailsForm);
