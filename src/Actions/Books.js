import Collection from './Collection';

import {searchString} from './Book';

export default class Books extends Collection {
	constructor(){
		super('books');
	}

	TriggerAuthor = author => {
		return (
			this.Read()
			.then(books => (
				books.map(book => {
					if(book.archived){
						return book;
					}
					const index = book.authors.findIndex(item => item.id === author.id);
					if(index !== -1){
						book.authors[index] = author;
						book.search = searchString(book);
					}
					return book;
				})
			))
			.then(books => this.Update(books))
		);
	}

	TriggerGenre = genre => {
		return (
			this.Read()
			.then(books => (
				books.map(book => {
					if(book.archived){
						return book;
					}
					const index = book.genres.findIndex(item => item.id === genre.id);
					if(index !== -1){
						book.genres[index] = genre;
						book.search = searchString(book);
					}
					return book;
				})
			))
			.then(books => this.Update(books))
		);
	}

	TriggerPublisher = publisher => {
		return (
			this.Read()
			.then(books => (
				books.map(book => {
					if(book.archived){
						return book;
					}
					if(book.publisher.id === publisher.id){
						book.publisher = publisher;
						book.search = searchString(book);
					}
					return book;
				})
			))
			.then(books => this.Update(books))
		);
	}

	TriggerPosition = position => {
		return (
			this.Read()
			.then(books => (
				books.map(book => {
					if(book.archived){
						return book;
					}
					if(book.position.id === position.id){
						book.position = position;
						book.search = searchString(book);
					}
					return book;
				})
			))
			.then(books => this.Update(books))
		);
	}
}
