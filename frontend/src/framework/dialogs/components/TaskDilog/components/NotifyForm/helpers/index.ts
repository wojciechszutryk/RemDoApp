import { NotifyDateCreatorFields } from "../models";

export const createDateFromSelectValues = (
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

export const createNotifySelectParams = (
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
