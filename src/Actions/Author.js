import Record from './Record';

export default class Author extends Record {
	constructor(){
		super('authors');
	}
}

export function searchString (author) {
	return ([
		author.name, author.surname
	].join(' '));
}
