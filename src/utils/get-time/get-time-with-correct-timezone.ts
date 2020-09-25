import moment from 'moment';
import sortTimezones from '../sort-timezones/sort-timezones';

const getTimeWithCorrectTimeZone = (timeInSeconds, timezone) => {
    return moment(timeInSeconds, 'X').utcOffset(sortTimezones(timezone), false);
};

export default getTimeWithCorrectTimeZone;