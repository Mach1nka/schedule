import { timeZones } from '../../config';

const sortTimezones = (value: string): number => timeZones.find((el) => el.TITLE === value)?.VALUE || 3;

export default sortTimezones;
