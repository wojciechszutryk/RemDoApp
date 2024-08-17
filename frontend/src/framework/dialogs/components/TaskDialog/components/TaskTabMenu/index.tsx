import { Tabs } from "@mui/material";
import ResizableWrapper from "atomicComponents/atoms/ResizableWrapper";
import Tab from "atomicComponents/atoms/Tab";
import { StyledTabsWrapper } from "framework/dialogs/components/CollaborantsDrawer/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useState } from "react";
import { Control, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";
import DatesPickers from "../DateForm/DatesPickers";
import CollapsableReccuranceForm from "../DateForm/RecurranceForm/CollapsableReccuranceForm";
import DetailsForm from "../DetailsForm";
import NotifyForm from "../NotifyForm";
import TabWrapper from "./TabWrapper";

interface Props {
  control: Control<ITaskDialog, any>;
}

const TaskTabMenu = ({ control }: Props): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext<ITaskDialog>();

  const handleChangeTabIndex = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <StyledTabsWrapper>
        <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
          <Tab
            label={t(TranslationKeys.Details)}
            value={0}
            id={"DETAILS"}
            error={!!errors.link?.message}
          />
          <Tab
            label={t(TranslationKeys.Date)}
            value={1}
            id={"Dates"}
            error={
              !!errors.finishDate?.message ||
              !!errors.reccuranceFormValues?.COUNT?.message
            }
          />
          <Tab label={t(TranslationKeys.NotifyMe)} value={2} id={"Notify"} />
        </Tabs>
      </StyledTabsWrapper>
      <ResizableWrapper>
        {tabIndex === 0 && (
          <TabWrapper activeIndex={tabIndex} tabIndex={0}>
            <DetailsForm />
          </TabWrapper>
        )}
        {tabIndex === 1 && (
          <TabWrapper activeIndex={tabIndex} tabIndex={1}>
            <DatesPickers />
            <CollapsableReccuranceForm />
          </TabWrapper>
        )}
        {tabIndex === 2 && (
          <TabWrapper activeIndex={tabIndex} tabIndex={2}>
            <NotifyForm control={control as any} noDateWarning />
          </TabWrapper>
        )}
      </ResizableWrapper>
    </>
  );
};

export default memo(TaskTabMenu);
