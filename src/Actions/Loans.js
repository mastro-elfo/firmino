import Collection from './Collection';

import {searchString} from './Loan';

export default class Loans extends Collection {
	constructor(){
		super('loans');
	}

	TriggerBook = book => {
		return (
			this.Read()
			.then(loans => (
				loans.map(loan => {
					if(loan.archived){
						return loan;
					}
					if(loan.book.id === book.id){
						loan.book = book;
						loan.search = searchString(loan);
					}
					return loan;
				})
			))
			.then(loans => this.Update(loans))
		);
	}

	TriggerUser = user => {
		return (
			this.Read()
			.then(loans => (
				loans.map(loan => {
					if(loan.archived){
						return loan;
					}
					if(loan.user.id === user.id){
						loan.user = user;
						loan.search = searchString(loan);
					}
					return loan;
				})
			))
			.then(loans => this.Update(loans))
		);
	}
}
