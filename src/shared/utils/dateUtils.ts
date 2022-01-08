interface CustomDateForm {
  year: string,
  month: string,
  date: string,
  hours: string,
  minutes: string,
  seconds: string
}

// yyyyMMddhhmmss
export function getNowDateString(): string {
  const now = convertToCustomDate(new Date());

  return now.year + now.month + now.date + now.hours + now.minutes + now.seconds;
}

/**
 * example: '2021-10-30T12:44:53.539076+09:00' -> '2021-10-30 12:44:53'
 */
export function convertDateTimeString(dateTimeString: string) {
  const date = convertToCustomDate(new Date(dateTimeString));

  return date.year + '-' + date.month + '-' + date.date +
    ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
}

/**
 * example: '2021-10-30T12:44:53.539076+09:00' -> '2021-10-30'
 */
export function convertDateString(dateString: string) {
  const date = convertToCustomDate(new Date(dateString));

  return date.year + '-' + date.month + '-' + date.date;
}

function convertToCustomDate(date: Date): CustomDateForm {
  return {
    year: date.getFullYear().toString(),
    month: pad(date.getMonth() + 1, 2),
    date: pad(date.getDate(), 2),
    hours: pad(date.getHours(), 2),
    minutes: pad(date.getMinutes(), 2),
    seconds: pad(date.getSeconds(), 2),
  };
}

function pad(number: number, length: number) {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
