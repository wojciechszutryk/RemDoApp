import { WeekdayStr } from "rrule";

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

export type IFreq = "0" | "1" | "2" | "3";

export type IMonthlyType = "day" | "weekDay";

export type IYearlyType = "date" | "weekDayOfMonths";

export interface RecurranceFormCreatorFields {
  /**
   * YEARLY - 0 | MONTHLY - 1 | WEEKLY - 2 | DAILY - 3
   */
  FREQ: IFreq;
  /**
   * how often the event should occur
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
   * e.g. BYDAY=[WE,TH] or BYDAY=[MO,WE,FR] or BYDAY=[MO]
   */
  BYDAY?: WeekdayStr[];
  /**
   * only for FREQ=YEARLY (both yearlyType = 'date' and yearlyType = 'weekDayOfMonths') - which months the event should occur
   */
  BYMONTH?: IBYMONTH;
  /**
   * only for endType=count - how many times the event should occur
   */
  COUNT?: number;

  /**
   * only for endType=date - when the event should stop occurring
   */
  UNTILL?: Date | null;
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
  monthlyType?: IMonthlyType;

  /**
   * Do not include in rrule
   * only for FREQ=YEARLY - how the event should occur
   * date: on the 12th of March every year
   * weekDayOfMonths: on the second Tuesday of March every year
   */
  yearlyType?: IYearlyType;
}
