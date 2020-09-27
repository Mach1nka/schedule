import { typeEvents } from '../../data/typeEvents';

const sortEventTypes = (value: string): string => typeEvents.find((el) => el.name === value)?.color;

export default sortEventTypes;