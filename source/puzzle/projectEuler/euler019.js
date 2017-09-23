// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

const JAN = 31;
const MAR = 31;
const APR = 30;
const MAY = 31;
const JUN = 30;
const JUL = 31;
const AUG = 31;
const SEP = 30;
const OCT = 31;
const NOV = 30;
const DEC = 31;

function isLeapYear(year) {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 === 0) {
    return year % 400 === 0;
  } else {
    return true;
  }
}

function getMonthLengths(year) {
  const FEB = isLeapYear(year) ? 29 : 28;
  return [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC];
}

function isSunday(dayVal) {
  return dayVal % 7 === 0;
}

export default function euler019() {
  // sun = 0, mon = 1, etc.
  // add 365 b/c the given info is for 1900, but the first year considered is 1901
  let dayVal = 1 + 365;
  let firstSundays = isSunday(dayVal) ? 1 : 0;

  for (let year = 1901; year <= 2000; year++) {
    const monthLengths = getMonthLengths(year);
    for (let month in monthLengths) {
      dayVal += monthLengths[month];
      isSunday(dayVal) ? firstSundays++ : null;
    }
  }

  return firstSundays;
}
