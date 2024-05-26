export type IBYMONTHDAY =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type IBYSETPOS = 1 | 2 | 3 | 4 | -1;

export type IBYMONTH = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type IEnderType = "never" | "count" | "date";

export interface RecurranceFormCreatorFields {
  FREQ: /** Yearly */
  | "0"
    /** Monthly */
    | "1"
    /** Weekly */
    | "2"
    /** Daily */
    | "3";
  /**
   * only for FREQ=DAILY or FREQ=WEEKLY or FREQ=MONTHLY - how often the event should occur
   * (every 3 days, every 2 weeks, etc.)
   */
  INTERVAL?: number;
  /**
   * only for FREQ=MONTHLY (monthlyType = 'day') or FREQ=YEARLY (yearlyType = 'date') - which days of the month the event should occur
   * e.g. BYMONTHDAY=12
   */
  BYMONTHDAY?: IBYMONTHDAY;
  /**
   * only for FREQ=MONTHLY (monthlyType = 'weekDay') - which days of the month the event should occur
   * or FREQ=YEARLY (yearlyType = 'weekDayOfMonths') - which days of the month the event should occur
   */
  BYSETPOS?: IBYSETPOS;
  /**
   * only for FREQ=WEEKLY (optional) or FREQ=MONTHLY (monthlyType = 'weekDay')
   * or FREQ=YEARLY (yearlyType = 'weekDayOfMonths')
   *  - which days of the week or month the event should occur
   * e.g. BYDAY=WE,TH or BYDAY=MO,WE,FR or BYDAY=MO
   */
  BYDAY?: string[];
  /**
   * only for FREQ=YEARLY (both yearlyType = 'date' and yearlyType = 'weekDayOfMonths') - which months the event should occur
   */
  BYMONTH?: IBYMONTH;
  /**
   * only for endType=count - how many times the event should occur
   */
  COUNT?: number;
  /**
   * Do not include in rrule
   */
  endType: IEnderType;

  /**
   * Do not include in rrule
   * only for FREQ=MONTHLY - how the event should occur
   * day: on the 12th of every month
   * weekDay: on the second Tuesday of every month
   */
  monthlyType?: "day" | "weekDay";

  /**
   * Do not include in rrule
   * only for FREQ=YEARLY - how the event should occur
   * date: on the 12th of March every year
   * weekDayOfMonths: on the second Tuesday of March every year
   */
  yearlyType?: "date" | "weekDayOfMonths";
}
