import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminder } from "linked-models/reminder/reminder.dto";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditReminderMutation } from "pages/RemindersPage/mutations/editReminder/editReminder.mutation";
import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AccessChoose from "./components/AccessChoose";
import DeleteSection from "./components/DeleteSection";
import GeneralInfo from "./components/GeneralInfo";
import NotifySetup from "./components/NotifySetup";
import ScopesChoose from "./components/ScopesChoose";
import useCreateDefaultReminderDialogData from "./hooks/useCreateDefaultReminderDialogData";
import { IReminderDialog } from "./models/reminderDialog.model";
import { IReminderDialogState } from "./models/reminderDialogState.model";

const ReminderDialog = (): JSX.Element => {
  const {
    dialogsState: {
      reminderDialog: { editReminderData, visible, defaultData },
    },
    dialogsActions: { updateReminderDialog },
  } = useDialogs();
  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateReminderDialog(initialTaskDialog)
  );
  const [expandedAccordion, setExpandedAccordion] = useState("general");

  const handleAccordionChange = (panel: string) => () => {
    if (expandedAccordion === panel) setExpandedAccordion("");
    else {
      setExpandedAccordion(panel);
    }
  };

  const defaultFormValues = useCreateDefaultReminderDialogData(
    defaultData,
    editReminderData
  );

  const methods = useForm<IReminderDialog>({
    defaultValues: defaultFormValues,
  });

  const onSubmit = (data: IReminderDialogState) => {
    const ownerEmails = data.assignedOwners.map((owner) => owner.email);
    const userEmails = data.assignedUsers.map((user) => user.email);

    if (editReminderData) {
      editReminderMutation.mutate({
        todoListId: editReminderData.todoListId,
        taskId: editReminderData.taskId,
        data: {
          ...data,
          assignedOwners: ownerEmails,
          assignedUsers: userEmails,
        },
      });
    } else {
      if (!data.startDate || !data.finishDate || !data.text || !data.icon)
        return;
      const createReminderData: IReminder = {
        ...data,
        assignedOwners: ownerEmails,
        assignedUsers: userEmails,
        text: data.text,
        name: data.text,
        icon: data.icon,
        startDate: data.startDate,
        finishDate: data.finishDate,
      };
      createReminderMutation.mutate(createReminderData);
    }

    updateReminderDialog(initialTaskDialog);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...methods}>
        <GeneralInfo
          expandedAccordion={expandedAccordion}
          handleAccordionChange={handleAccordionChange}
          editReminderData={editReminderData}
          onSubmit={onSubmit}
        />
        {!editReminderData && (
          <ScopesChoose
            expandedAccordion={expandedAccordion}
            handleAccordionChange={handleAccordionChange}
          />
        )}
        <AccessChoose
          expandedAccordion={expandedAccordion}
          handleAccordionChange={handleAccordionChange}
          defaultFormValues={defaultFormValues}
        />
        <NotifySetup
          expandedAccordion={expandedAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        {!!editReminderData && (
          <DeleteSection
            expandedAccordion={expandedAccordion}
            onClose={onClose}
            handleAccordionChange={handleAccordionChange}
            defaultFormValues={defaultFormValues}
            editReminderData={editReminderData}
          />
        )}
        <Button
          onClick={methods.handleSubmit(onSubmit)}
          sx={{ margin: "0 auto" }}
        >
          {editReminderData
            ? t(TranslationKeys.Save)
            : t(TranslationKeys.CreateReminder)}
        </Button>
      </FormProvider>
    </Dialog>
  );
};

export default memo(ReminderDialog);
