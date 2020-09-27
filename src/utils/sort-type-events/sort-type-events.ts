import {ScheduleMockTypesEvents} from '../../data/typeEvents';

const sortEventTypes = (value: string, typeEvents:Array<ScheduleMockTypesEvents>): string | undefined => typeEvents.find((el) => el.name === value)?.color;

export default sortEventTypes;