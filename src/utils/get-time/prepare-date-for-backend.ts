import moment from 'moment';
import sortTimezones from '../sort-timezones/sort-timezones';
import formatTime from './format-time';

const prepareDateForBackend = (timeInSeconds: moment.MomentInput, timezone: string): string => {
    const dateToCurrentTimezone = moment(timeInSeconds, 'X').utcOffset(sortTimezones(timezone), true).utcOffset(0, false);
    return formatTime(dateToCurrentTimezone, 'X');
}

export default prepareDateForBackend;