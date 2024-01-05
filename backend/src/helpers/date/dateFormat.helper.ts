export function formatDateTime(
  date: Date,
  locale: string,
  hour12: boolean = true
): string {
  const formatDateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatTimeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12,
  };

  const formattedDate = new Intl.DateTimeFormat(
    locale,
    formatDateOptions
  ).format(date);
  const formattedTime = new Intl.DateTimeFormat(
    locale,
    formatTimeOptions
  ).format(date);

  return `${formattedDate} at ${formattedTime}`;
}
