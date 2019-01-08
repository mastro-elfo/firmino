import Record from './Record';
import {dehyphenate} from 'beautify-isbn';

export default class Book extends Record {
	constructor(){
		super('books');
	}
}

export function searchString (book) {
	return ([
		book.title,
		book.authors.map(item => `${item.name} ${item.surname}`).join(' '),
		book.genres.map(item => item.name).join(' '),
		book.publisher.name, book.position.name, book.language,
		book.isbn, dehyphenate(book.isbn),
		book.isbn.split('-').slice(1,4).join('-'),
		book.isbn.split('-').slice(1,4).join('')
	].join(' '));
}
