import { Tab, Tabs } from "@mui/material";
import ResizableWrapper from "atomicComponents/atoms/ResizableWrapper";
import { StyledTabsWrapper } from "framework/dialogs/components/CollaborantsDrawer/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useState } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ITaskDialog } from "../../models/taskDialog.model";
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

  const handleChangeTabIndex = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <StyledTabsWrapper>
        <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
          <Tab label={"DETAILS"} value={0} id={"DETAILS"} />
          <Tab label={"DATES"} value={1} id={"Dates"} />
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
            <CollapsableReccuranceForm />
          </TabWrapper>
        )}
        {tabIndex === 2 && (
          <TabWrapper activeIndex={tabIndex} tabIndex={2}>
            <NotifyForm control={control} />
          </TabWrapper>
        )}
      </ResizableWrapper>
    </>
  );
};

export default memo(TaskTabMenu);
