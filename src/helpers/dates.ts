const MS_TO_DAYS = 1000 * 3600 * 24;
const MS_TO_SECS = 1000 * 60;

export type DateAndTime = {
  date: string;
  dateTime: Date;
  time: string;
  militaryTime: string;
};

const getOffset = (date?: Date): number => {
  const now = date || new Date();
  const offsetInMS = now.getTimezoneOffset();

  return offsetInMS * MS_TO_SECS;
};

export function getZuluDateAndTime(dt?: Date | string): DateAndTime {
  let zuluDate: Date = new Date();

  if (dt) {
    if (typeof dt === 'string') {
      zuluDate = new Date(dt);
    } else {
      zuluDate = dt as Date;
    }
  }

  const offset = getOffset(zuluDate);
  const dateTimeTz = new Date(zuluDate.getTime() - offset);
  const dateTimeISOArr = dateTimeTz.toISOString().split('T');
  const [datePart, timePart] = dateTimeISOArr;
  const date = datePart;
  const time = timePart.slice(0, 5);
  const militaryTime = time.replace(':', '');

  return {
    date,
    dateTime: dateTimeTz,
    militaryTime,
    time,
  };
}

export function daysBetweenDates(date1: Date, date2: Date): number {
  // To calculate the time difference of two dates
  const differenceInTime = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  return differenceInTime / MS_TO_DAYS;
}
