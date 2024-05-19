import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReccuranceFormValues } from "../../models/taskDialog.model";
import DatesPickers from "./DatesPickers";
import CollapsableReccuranceForm from "./RecurranceForm/CollapsableReccuranceForm";

const DateForm = (): JSX.Element => {
  const { register } = useFormContext<ReccuranceFormValues>();
  const { t } = useTranslation();

  return (
    <>
      <DatesPickers />
      <ControlledCheckbox
        {...register("reccuranceEnabled")}
        label={t(TranslationKeys.Week)}
      />
      <CollapsableReccuranceForm />
    </>
  );
};

export default memo(DateForm);
