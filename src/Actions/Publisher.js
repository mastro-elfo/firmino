import Record from './Record';

export default class Publisher extends Record {
	constructor(){
		super('publishers');
	}
}

export function searchString (publisher) {
	return publisher.name;
}
