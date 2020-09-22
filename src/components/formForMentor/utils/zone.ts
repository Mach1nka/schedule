import { timeZones } from '../../../config';

const zone = (value: string): number => timeZones.find((e) => e.TITLE === value)?.VALUE || 3;
export default zone;
