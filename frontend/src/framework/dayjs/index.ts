import dayjs from "dayjs";
import "dayjs/locale/en";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

export { dayjs };
