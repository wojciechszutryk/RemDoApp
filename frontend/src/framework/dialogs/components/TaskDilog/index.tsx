import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Autocomplete, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { Button } from "atomicComponents/atoms/Button";
import DateTimePicker from "atomicComponents/atoms/DateTimePicker";
import Dialog from "atomicComponents/atoms/Dialog";
import { Select } from "atomicComponents/atoms/Select";
import { TextField } from "atomicComponents/atoms/TextField";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useCreateTaskMutation } from "pages/SingleTodoListPage/mutations/createTask/createTask.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListDialog/styles";
import DateTimePickerWithIcon from "./components/DatePickerWithIcon";
import {
  ITaskDialog,
  NotifyDateCreatorFields,
} from "./models/taskDialog.model";
import { StyledCheckboxesWrapper, StyledNotifyInputsWrapper } from "./styles";

const createDateFromSelectValues = (
  params: NotifyDateCreatorFields,
  startDate?: Date | null,
  finishDate?: Date | null
): Date | null => {
  if (
    !params.minsAccordingToTimePoint ||
    !params.beforeOrAfter ||
    !params.timePoint
  )
    return null;

  if (params.timePoint === "Start") {
    if (params.beforeOrAfter === "Before") {
      return startDate
        ? new Date(
            startDate.getTime() - params.minsAccordingToTimePoint * 60 * 1000
          )
        : null;
    } else {
      return startDate
        ? new Date(
            startDate.getTime() + params.minsAccordingToTimePoint * 60 * 1000
          )
        : null;
    }
  }

  if (params.timePoint === "Finish") {
    if (params.beforeOrAfter === "Before") {
      return finishDate
        ? new Date(
            finishDate.getTime() - params.minsAccordingToTimePoint * 60 * 1000
          )
        : null;
    } else {
      return finishDate
        ? new Date(
            finishDate.getTime() + params.minsAccordingToTimePoint * 60 * 1000
          )
        : null;
    }
  }

  return null;
};

const createNotifySelectParams = (
  notifyDate?: Date,
  startDate?: Date | null,
  finishDate?: Date | null
): NotifyDateCreatorFields => {
  if (!notifyDate)
    return {
      minsAccordingToTimePoint: null,
      beforeOrAfter: undefined,
      timePoint: undefined,
    };

  if (startDate) {
    if (notifyDate < startDate) {
      // when notifyDate is before startDate return MINUTES BEFORE START
      return {
        minsAccordingToTimePoint:
          (startDate.getTime() - notifyDate.getTime()) / 1000 / 60,
        beforeOrAfter: "Before",
        timePoint: "Start",
      };
    }

    if (!finishDate) {
      // when notifyDate is after startDate and there is no finishDate return MINUTES AFTER START
      return {
        minsAccordingToTimePoint:
          (notifyDate.getTime() - startDate.getTime()) / 1000 / 60,
        beforeOrAfter: "After",
        timePoint: "Start",
      };
    }
  }

  if (finishDate) {
    // when notifyDate is after finishDate return MINUTES AFTER FINISH
    if (notifyDate > finishDate) {
      return {
        minsAccordingToTimePoint:
          (notifyDate.getTime() - finishDate.getTime()) / 1000 / 60,
        beforeOrAfter: "After",
        timePoint: "Finish",
      };
    }

    if (!startDate) {
      // when notifyDate is before finishDate and there is no startDate return MINUTES BEFORE FINISH
      return {
        minsAccordingToTimePoint:
          (finishDate.getTime() - notifyDate.getTime()) / 1000 / 60,
        beforeOrAfter: "Before",
        timePoint: "Finish",
      };
    }

    // when notifyDate is between startDate and finishDate return MINUTES BEFORE FINISH
    return {
      minsAccordingToTimePoint:
        (finishDate.getTime() - startDate.getTime()) / 1000 / 60,
      beforeOrAfter: "Before",
      timePoint: "Finish",
    };
  }

  return {
    minsAccordingToTimePoint: null,
    beforeOrAfter: undefined,
    timePoint: undefined,
  };
};

const TaskDialog = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { editTaskData, todoListId, visible, editNotifyData },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateTaskDialog(initialTaskDialog)
  );

  const defaultSelectsValues = createNotifySelectParams(
    editNotifyData,
    editTaskData?.startDate,
    editTaskData?.finishDate
  );

  const defaultFormValues = {
    text: editTaskData?.text || "",
    startDate: editTaskData?.startDate || null,
    finishDate: editTaskData?.finishDate || null,
    minsAccordingToTimePoint:
      defaultSelectsValues.minsAccordingToTimePoint || 15,
    beforeOrAfter: defaultSelectsValues.beforeOrAfter || "Before",
    timePoint: defaultSelectsValues.timePoint || "Start",
    important: editTaskData?.important,
  };

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    watch, //TODO: move to useWatch
  } = useForm<ITaskDialog>({
    defaultValues: defaultFormValues,
  });

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITaskDialog) => {
    if (editTaskData)
      editTaskMutation.mutate({ todoListId, taskId: editTaskData.id, data });
    else createTaskMutation.mutate({ todoListId, data });
    onClose();
  };

  //TODO: move somewhere else
  const timePointOptions = watch("startDate")
    ? watch("finishDate")
      ? ["Start", "Finish"]
      : ["Start"]
    : watch("finishDate")
    ? ["Finish"]
    : ["Start"];

  const disableSelects =
    !watch("notify") || (!watch("startDate") && !watch("finishDate"));

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          {editTaskData
            ? `${t(TranslationKeys.EditTask)}: ${editTaskData.text}`
            : t(TranslationKeys.AddTask)}
        </Typography>
        <ControlledTextField
          name={"text"}
          control={control}
          placeholder={t(TranslationKeys.TaskName)}
        />
        {[
          {
            Icon: <PlayCircleOutlineIcon />,
            tooltipTitle: t(TranslationKeys.StartDate),
            name: "startDate" as keyof ITaskDialog,
            control,
            maxDate: dayjs(getValues("startDate")),
          },
          {
            Icon: <FlagCircleIcon />,
            tooltipTitle: t(TranslationKeys.FinishDate),
            name: "finishDate" as keyof ITaskDialog,
            control,
            minDate: dayjs(getValues("finishDate")),
          },
        ].map((props, index) => (
          <DateTimePickerWithIcon key={index} {...props} />
        ))}

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
        <Collapse in={watch("notify")} timeout="auto" unmountOnExit>
          <StyledNotifyInputsWrapper>
            <Controller
              control={control}
              name={"minsAccordingToTimePoint"}
              render={({ field: { ref, onChange, value } }) => (
                <Autocomplete
                  ref={ref}
                  disabled={disableSelects}
                  onChange={(event, value) => {
                    const mins = parseInt(value as string);
                    const newDate = createDateFromSelectValues(
                      {
                        minsAccordingToTimePoint: mins,
                        beforeOrAfter: watch("beforeOrAfter"),
                        timePoint: watch("timePoint"),
                      },
                      watch("startDate"),
                      watch("finishDate")
                    );

                    setValue("notifyDate", newDate || undefined);

                    onChange(mins);
                  }}
                  value={value ? value.toString() : null}
                  freeSolo
                  options={["5", "10", "15", "30"]}
                  renderInput={(params) => {
                    return <TextField {...params} disabled={disableSelects} />;
                  }}
                />
              )}
            />
            <span> min</span>
            <Controller
              control={control}
              name={"beforeOrAfter"}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={["Before", "After"]}
                  disabled={disableSelects}
                  onChange={(event) => {
                    const newBeforeOrAfterValue = event.target.value as
                      | "Before"
                      | "After"
                      | undefined;
                    const newDate = createDateFromSelectValues(
                      {
                        minsAccordingToTimePoint: watch(
                          "minsAccordingToTimePoint"
                        ),
                        beforeOrAfter: newBeforeOrAfterValue,
                        timePoint: watch("timePoint"),
                      },
                      watch("startDate"),
                      watch("finishDate")
                    );

                    setValue("notifyDate", newDate || undefined);

                    onChange(newBeforeOrAfterValue);
                  }}
                  // onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name={"timePoint"}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={timePointOptions}
                  disabled={disableSelects}
                  defaultValue={"Start"}
                  placeholder={"Time point"}
                  onChange={(event) => {
                    const newTimePoint = event.target.value as
                      | "Start"
                      | "Finish"
                      | undefined;
                    const newDate = createDateFromSelectValues(
                      {
                        minsAccordingToTimePoint: watch(
                          "minsAccordingToTimePoint"
                        ),
                        beforeOrAfter: watch("beforeOrAfter"),
                        timePoint: newTimePoint,
                      },
                      watch("startDate"),
                      watch("finishDate")
                    );

                    setValue("notifyDate", newDate || undefined);

                    onChange(newTimePoint);
                  }}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name={"notifyDate"}
              render={({ field: { ref, onChange, value } }) => (
                <DateTimePicker
                  disabled={!watch("notify")}
                  onChange={(date) => {
                    const selectParams = createNotifySelectParams(
                      date?.toDate(),
                      watch("startDate"),
                      watch("finishDate")
                    );

                    if (selectParams) {
                      setValue(
                        "minsAccordingToTimePoint",
                        selectParams.minsAccordingToTimePoint
                      );
                      setValue("beforeOrAfter", selectParams.beforeOrAfter);
                      setValue("timePoint", selectParams.timePoint);
                    }

                    onChange(date?.toDate());
                  }}
                  value={dayjs(value)}
                  inputRef={ref}
                />
              )}
            />
          </StyledNotifyInputsWrapper>
        </Collapse>
        {/* END */}
        <Button type="submit">
          {editTaskData ? t(TranslationKeys.Save) : t(TranslationKeys.AddTask)}
        </Button>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TaskDialog);
