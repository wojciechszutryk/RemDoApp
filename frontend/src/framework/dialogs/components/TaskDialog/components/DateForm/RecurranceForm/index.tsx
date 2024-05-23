import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { ControlledSelect } from "atomicComponents/molecules/ControlledSelect";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReccuranceFormValues } from "../../../models/taskDialog.model";

const RecurranceForm = (): JSX.Element => {
  const { t } = useTranslation();
  const watch = useWatch<ReccuranceFormValues>();
  const { control } = useFormContext<ReccuranceFormValues>();

  const watchFields = watch.reccuranceFormValues;

  const FREQ = watchFields?.FREQ;
  const monthlyType = watchFields?.monthlyType;
  const yearlyType = watchFields?.yearlyType;
  const endType = watchFields?.endType;

  return (
    <div>
      <ControlledSelect
        label="Frequency"
        id="frequency"
        options={[
          { label: "Daily", value: "3" },
          { label: "Weekly", value: "2" },
          { label: "Monthly", value: "1" },
          { label: "Yearly", value: "0" },
        ]}
        control={control}
        name={"reccuranceFormValues.FREQ"}
      />
      {/* //INTERVAL */}
      {FREQ === "3" || FREQ === "2" || FREQ === "1" ? (
        <>
          every{" "}
          {
            <ControlledTextField
              placeholder="Interval"
              control={control}
              name={"reccuranceFormValues.INTERVAL"}
            />
          }
          {FREQ === "3" ? "day(s)" : null}
          {FREQ === "2" ? "week(s)" : null}
          {FREQ === "1" ? "month(s)" : null}
        </>
      ) : null}
      {/* //FREQ weekly */}
      {FREQ === "2" ? (
        <div>
          on{" "}
          <ControlledSelect
            placeholder="Weekdays"
            multiple
            control={control}
            options={[
              { label: "Monday", value: "MO" },
              { label: "Tuesday", value: "TU" },
              { label: "Wednesday", value: "WE" },
              { label: "Thursday", value: "TH" },
              { label: "Friday", value: "FR" },
              { label: "Saturday", value: "SA" },
              { label: "Sunday", value: "SU" },
            ]}
            name={"reccuranceFormValues.BYDAY"}
          />
        </div>
      ) : null}
      {/* // monthly day */}
      {FREQ === "1" && monthlyType === "day" ? (
        <>
          on the{" "}
          {
            <ControlledSelect
              placeholder="Day of the month"
              control={control}
              name={"reccuranceFormValues.BYMONTHDAY"}
            />
          }
          day of the month
        </>
      ) : null}
      {/* // monthly weekDay */}
      {FREQ === "1" && monthlyType === "weekDay" ? (
        <>
          on the{" "}
          <ControlledSelect
            placeholder="Weekday of the month"
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            placeholder="Weekday"
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
        </>
      ) : null}
      {/* //yearly type selection */}
      {FREQ === "0" ? (
        <ControlledSelect
          placeholder="Yearly type"
          control={control}
          name={"reccuranceFormValues.yearlyType"}
        />
      ) : null}
      {/* // yearly weekDayOfMonths */}
      {FREQ === "0" && yearlyType === "weekDayOfMonths" ? (
        <div>
          on the{" "}
          <ControlledSelect
            placeholder="Weekday of the month"
            control={control}
            name={"reccuranceFormValues.BYSETPOS"}
          />
          <ControlledSelect
            placeholder="Weekday"
            control={control}
            name={"reccuranceFormValues.BYDAY"}
          />
          of{" "}
          <ControlledSelect
            placeholder="Month"
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
        </div>
      ) : null}

      {/* // yearly date */}
      {FREQ === "0" && yearlyType === "date" ? (
        <div>
          <ControlledSelect
            label="Month"
            id="yearlyMonth"
            control={control}
            name={"reccuranceFormValues.BYMONTH"}
          />
          <ControlledSelect
            label="Day of the month"
            id={"yearlyDayOfMonth"}
            control={control}
            name={"reccuranceFormValues.BYMONTHDAY"}
          />
        </div>
      ) : null}
      <ControlledSelect
        options={[
          { label: "End by date", value: "date" },
          { label: "End after", value: "count" },
          { label: "Never", value: "never" },
        ]}
        control={control}
        label="End Type"
        id="endType"
        name={"reccuranceFormValues.endType"}
      />

      {/* // endType = date */}
      {endType === "count" ? (
        <>
          after{" "}
          <ControlledTextField
            control={control}
            name={"reccuranceFormValues.COUNT"}
          />{" "}
          occurrences
        </>
      ) : null}
    </div>
  );
};

export default memo(RecurranceForm);
