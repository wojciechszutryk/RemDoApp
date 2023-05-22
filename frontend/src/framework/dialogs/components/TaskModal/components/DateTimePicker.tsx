import dayjs from "dayjs";
import { StyledDatePicker } from "./styles";

/**coverts number to dayjs date  */
const dayjsDate = (value: number) => dayjs(new Date(value));

const DatePicker = () => {
  const handleChange = (dayjsVlue: dayjs.Dayjs | null) => {
    if (!dayjsVlue) return;

    const newValue = new Date(dayjsVlue.valueOf());

    // if (isStartDate) {
    //   if (+newValue > endDate) {
    //     showToast("Set date later than the end date");
    //   } else dispatch(setStartDate(+newValue));
    // }
  };

  return (
    <StyledDatePicker label={"Start date and Time"} onChange={handleChange} />
  );
};

export default DatePicker;
