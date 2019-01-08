import Record from './Record';

export default class Position extends Record {
	constructor(){
		super('positions');
	}
}

export function searchString (position) {
	return position.name;
}
