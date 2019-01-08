import Record from './Record';
import {dehyphenate} from 'beautify-isbn';

export default class Loan extends Record {
	constructor(){
		super('loans');
	}
}

export function searchString (loan) {
	return ([
		loan.book.title,
		loan.user.name, loan.user.surname,
		loan.book.isbn, dehyphenate(loan.book.isbn),
		loan.book.isbn.split('-').slice(1,4).join('-'),
		loan.book.isbn.split('-').slice(1,4).join('')
	].join(' '));
}
