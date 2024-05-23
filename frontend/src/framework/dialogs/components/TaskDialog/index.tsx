import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useCreateTaskMutation } from "pages/SingleTodoListPage/mutations/createTask/createTask.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { memo, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RRule, rrulestr } from "rrule";
import { StyledForm } from "../TodoListDialog/styles";
import CollapsableNotifyForm from "./components/CollapsableNotifyForm";
import CollapsableReccuranceForm from "./components/DateForm/RecurranceForm/CollapsableReccuranceForm";
import {
  IBYMONTH,
  IBYMONTHDAY,
  IBYSETPOS,
  IEnderType,
  RecurranceFormCreatorFields,
} from "./components/DateForm/RecurranceForm/model";
import { createNotifySelectParams } from "./components/NotifyForm/helpers";
import { ITaskDialog } from "./models/taskDialog.model";
import { StyledCheckboxesWrapper } from "./styles";

const TaskDialog = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { editTaskData, todoListId, visible },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const taskRef = useRef<HTMLInputElement | null>(null);

  const [open, onClose] = useAppDialogState(visible, () =>
    updateTaskDialog(initialTaskDialog)
  );

  const defaultSelectsValues =
    editTaskData?.notifyDate &&
    createNotifySelectParams(
      new Date(editTaskData?.notifyDate),
      editTaskData?.startDate && new Date(editTaskData?.startDate),
      editTaskData?.finishDate && new Date(editTaskData?.finishDate)
    );

  const getDefaultReccuranceFormValues = (
    reccurance: string
  ): RecurranceFormCreatorFields => {
    const reccuranceObj = rrulestr(reccurance, { forceset: false }) as RRule;
    return {
      DTSTART:
        reccuranceObj.options.dtstart?.toISOString() ||
        new Date().toISOString(),
      INTERVAL: reccuranceObj.options.interval || 1,
      BYMONTH: reccuranceObj.options.bymonth[0] as IBYMONTH,
      BYMONTHDAY: reccuranceObj.options.bymonthday[0] as IBYMONTHDAY,
      BYSETPOS: reccuranceObj.options.bysetpos[0] as IBYSETPOS,
      endType: (reccuranceObj.options.count
        ? "count"
        : reccuranceObj.options.until
        ? "date"
        : "never") as IEnderType,
      FREQ: reccuranceObj.options.freq.toString() as "1" | "0" | "2" | "3",
    };
  };

  const defaultFormValues = {
    text: editTaskData?.text || "",
    startDate: editTaskData?.startDate,
    finishDate: editTaskData?.finishDate || null,
    minsAccordingToTimePoint:
      defaultSelectsValues?.minsAccordingToTimePoint || 15,
    beforeOrAfter: defaultSelectsValues?.beforeOrAfter || "Before",
    timePoint: defaultSelectsValues?.timePoint || "Start",
    notifyDate: editTaskData?.notifyDate || new Date(Date.now() + 85500000),
    important: editTaskData?.important,
    notify: !!editTaskData?.notifyDate,
    recurranceFormVisible:
      !!editTaskData?.recurrance && editTaskData?.recurrance.length > 0,
    reccuranceFormValues: editTaskData?.recurrance
      ? getDefaultReccuranceFormValues(editTaskData.recurrance[0])
      : {
          DTSTART: new Date().toISOString(),
          FREQ: "1" as const,
          endType: "date" as const,
        },
  };

  const methods = useForm<ITaskDialog>({
    defaultValues: defaultFormValues,
  });

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITaskDialog) => {
    if (!data.notify) data.notifyDate = null;

    if (editTaskData)
      editTaskMutation.mutate({ todoListId, taskId: editTaskData.id, data });
    else createTaskMutation.mutate({ todoListId, data });
    onClose();
  };

  const { handleSubmit, control, setFocus } = methods;

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">
            {editTaskData
              ? `${t(TranslationKeys.EditTask)}: ${editTaskData.text}`
              : t(TranslationKeys.AddTask)}
          </Typography>
          <ControlledTextField
            autoFocus
            ref={taskRef}
            name={"text"}
            error={!!methods.formState.errors?.text}
            helperText={
              methods.formState.errors.text?.type === "required" &&
              t(TranslationKeys.FieldRequired)
            }
            control={control}
            placeholder={t(TranslationKeys.TaskName)}
          />

          <CollapsableReccuranceForm />

          <StyledCheckboxesWrapper>
            <ControlledCheckbox
              name={"notify"}
              control={control}
              label={t(TranslationKeys.NotifyMe)}
            />
            <ControlledCheckbox
              name={"important"}
              control={control}
              label={t(TranslationKeys.TaskImportant)}
            />
          </StyledCheckboxesWrapper>
          <CollapsableNotifyForm control={methods.control} />
          <Button type="submit">
            {editTaskData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.AddTask)}
          </Button>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default memo(TaskDialog);
