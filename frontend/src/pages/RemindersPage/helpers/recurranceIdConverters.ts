export const reccuranceIdPostfix = "_reccurance_";

/**
 * reccuring reminders have a unique id that is a combination of the task id and "_reccurance_{index}" postfix
 */
export const stripRecurranceId = (recurranceId?: string) => {
  if (!recurranceId) return undefined;
  return recurranceId.split(reccuranceIdPostfix)[0];
};
