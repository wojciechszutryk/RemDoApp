import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
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
import { RRule, Weekday, WeekdayStr, rrulestr } from "rrule";
import { StyledForm } from "../TodoListDialog/styles";
import {
  IBYMONTH,
  IBYMONTHDAY,
  IBYSETPOS,
  IEnderType,
} from "./components/DateForm/RecurranceForm/model";
import { createNotifySelectParams } from "./components/NotifyForm/helpers";
import TaskTabMenu from "./components/TaskTabMenu";
import { ITaskDialog } from "./models/taskDialog.model";

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

  const getDefaultFormValues = () => {
    const reccuranceEnabled =
      !!editTaskData?.recurrance && !!editTaskData?.recurrance;

    const defaultFormValues: ITaskDialog = {
      text: editTaskData?.text || "",
      description: editTaskData?.description || "",
      link: editTaskData?.link,
      startDate: editTaskData?.startDate || null,
      finishDate: editTaskData?.finishDate || null,
      minsAccordingToTimePoint:
        defaultSelectsValues?.minsAccordingToTimePoint || 15,
      beforeOrAfter: defaultSelectsValues?.beforeOrAfter || "Before",
      timePoint: defaultSelectsValues?.timePoint || "Start",
      notifyDate: editTaskData?.notifyDate || new Date(Date.now() + 85500000),
      important: editTaskData?.important,
      notify: !!editTaskData?.notifyDate,
      reccuranceEnabled,
    };

    if (reccuranceEnabled) {
      // we know that reccurance is not null as we checked it in the if statement
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reccuranceObj = rrulestr(editTaskData.recurrance!, {
        forceset: false,
      }) as RRule;

      console.log(
        "byweekday",
        reccuranceObj.origOptions?.byweekday,
        (reccuranceObj.origOptions?.byweekday as Weekday)
          ? Array.isArray(reccuranceObj.origOptions.byweekday)
            ? reccuranceObj.origOptions.byweekday
            : [reccuranceObj.origOptions.byweekday]
          : ""
      );

      defaultFormValues.reccuranceFormValues = {
        DTSTART:
          reccuranceObj.options.dtstart?.toISOString() ||
          new Date().toISOString(),
        INTERVAL: reccuranceObj.options.interval || 1,
        BYMONTH: reccuranceObj.options.bymonth?.[0] as IBYMONTH,
        BYMONTHDAY: reccuranceObj.options.bymonthday?.[0] as IBYMONTHDAY,
        BYSETPOS: reccuranceObj.options.bysetpos?.[0] as IBYSETPOS,
        COUNT: reccuranceObj.options.count || 1,
        BYDAY: (reccuranceObj.origOptions?.byweekday as Weekday)
          ? Array.isArray(reccuranceObj.origOptions.byweekday)
            ? reccuranceObj.origOptions.byweekday
            : [reccuranceObj.origOptions.byweekday]
          : "",
        endType: (reccuranceObj.options.count
          ? "count"
          : reccuranceObj.options.until
          ? "date"
          : "never") as IEnderType,
        FREQ: reccuranceObj.options.freq.toString() as "1" | "0" | "2" | "3",
        monthlyType: reccuranceObj.options?.byweekday ? "weekDay" : "day",
        yearlyType: reccuranceObj.options?.bysetpos
          ? "weekDayOfMonths"
          : "date",
      };

      defaultFormValues.startDate = reccuranceObj.options.dtstart;
      defaultFormValues.finishDate = reccuranceObj.options.until;
    } else {
      defaultFormValues.reccuranceFormValues = {
        FREQ: "1" as const,
        monthlyType: "day" as const,
        yearlyType: "date" as const,
        endType: "date" as const,
      };
    }

    return defaultFormValues;
  };

  const methods = useForm<ITaskDialog>({
    defaultValues: getDefaultFormValues(),
    mode: "onSubmit",
  });

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (formValues: ITaskDialog) => {
    debugger;
    const {
      FREQ,
      INTERVAL,
      BYMONTHDAY,
      BYSETPOS,
      BYDAY,
      BYMONTH,
      COUNT,
      endType,
      monthlyType,
      yearlyType,
    } = formValues.reccuranceFormValues || {};

    const data = {
      ...formValues,
      recurrance:
        formValues.reccuranceEnabled &&
        formValues.reccuranceFormValues &&
        formValues.startDate &&
        FREQ
          ? new RRule({
              freq: parseInt(FREQ),
              interval: INTERVAL,
              bymonthday:
                (FREQ === "1" && monthlyType === "day") ||
                (FREQ === "0" && yearlyType === "date")
                  ? BYMONTHDAY
                  : undefined,
              bysetpos:
                (FREQ === "1" && monthlyType === "weekDay") ||
                (FREQ === "0" && yearlyType === "weekDayOfMonths")
                  ? BYSETPOS
                  : undefined,
              byweekday:
                FREQ === "2" ||
                (FREQ === "1" && monthlyType === "weekDay") ||
                (FREQ === "0" && yearlyType === "weekDayOfMonths")
                  ? BYDAY?.split(",").map((day) =>
                      Weekday.fromStr(day as WeekdayStr)
                    )
                  : undefined,
              bymonth: FREQ === "0" ? BYMONTH : undefined,
              count: endType === "count" ? COUNT : undefined,
              until:
                endType === "date" && formValues.finishDate
                  ? new Date(formValues.finishDate)
                  : undefined,
              dtstart: new Date(formValues.startDate),
            }).toString()
          : null,
      notifyDate: formValues.notify ? formValues.notifyDate : null,
    };

    if (editTaskData)
      editTaskMutation.mutate({
        todoListId,
        taskId: editTaskData.id,
        data,
      });
    else
      createTaskMutation.mutate({
        todoListId,
        data,
      });
    onClose();
  };

  const { handleSubmit, control } = methods;

  useEffect(() => {
    taskRef.current?.focus();
  }, [taskRef.current]);

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
            inputRef={taskRef}
            name={"text"}
            rules={{
              required: {
                value: true,
                message: t(TranslationKeys.FieldRequired),
              },
            }}
            error={!!methods.formState.errors?.text}
            helperText={methods.formState.errors.text?.message}
            control={control}
            placeholder={t(TranslationKeys.TaskName)}
          />

          <TaskTabMenu control={methods.control} />

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
