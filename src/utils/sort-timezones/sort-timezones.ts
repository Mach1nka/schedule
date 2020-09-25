import { timeZones } from '../../config';

const sortTimezones = (value: string): number => timeZones.find((e) => e.TITLE === value)?.VALUE || 3;

export default sortTimezones;
