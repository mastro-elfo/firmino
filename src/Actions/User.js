import Record from './Record';

export default class Author extends Record {
	constructor(){
		super('users');
	}
}

export function searchString (user) {
	return [user.name, user.surname, user.email, user.telephone].join(' ');
}
