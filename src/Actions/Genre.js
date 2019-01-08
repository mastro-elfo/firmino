import Record from './Record';

export default class Genre extends Record {
	constructor(){
		super('genres');
	}
}

export function searchString (genre) {
	return genre.name;
}
