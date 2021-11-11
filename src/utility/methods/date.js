import moment from "moment-timezone";
import { capitalize } from "./string";

// moment.tz.setDefault("Asia/Tokyo");

const formatDate = (date) => date && moment(date).format("DD/MM/YYYY");

const formatDateBySpecifiedFormat = (date, format) =>
  date && format && moment(date).format(format);

const formatTime = (time) => time && moment(time).format("hh:mm A");

const fromNow = (date) => moment(date).fromNow();

const timeTo = (date) => {
  let returnValue = "-";
  if (date) {
    const today = moment();
    const checkingDate = moment(date);
    const diff = moment.duration(checkingDate.diff(today));

    const hoursDiff = parseInt(diff.asHours(), 10);

    const minutesDiff = parseInt(diff.asMinutes(), 10) % 60;

    if (hoursDiff > 24) {
      returnValue = capitalize(moment(date).toNow(true));
    } else {
      returnValue = `${hoursDiff} ${
        hoursDiff > 1 ? "hours" : "hour"
      } ${minutesDiff} ${minutesDiff > 1 ? "minutes" : "minute"}`;
    }
  }
  return returnValue;
};

export {
  formatDate,
  formatDateBySpecifiedFormat,
  formatTime,
  fromNow,
  moment,
  timeTo,
};
