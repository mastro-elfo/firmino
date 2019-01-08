import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Book from '../../Actions/Book';
import {anyToIsbn13} from '../../Utils/isbn';
import {Session} from '../../Utils/Storage';

class BookEdit extends Component {
	state = {
		isbn: '',
		title: '',
		description: '',
		language: '',
		position: null,
		publisher: null,
		authors: null,
		genres: null,
		archived: false
	}

	componentDidMount(){
		let previous = Session.get('Book');
		if(previous) {
			previous = this.consumeSession(previous);
			this.setState({...previous});
			Session.set('Book', null);
		}
		else {
			const {match: {params: {id}}, enqueueSnackbar} = this.props;
			(new Book).Read(id)
			.then(book => this.setState({...book}))
			.catch(err => {
				console.error('Error loading book', id, err);
				enqueueSnackbar('Errore, libro non trovato', {
					variant: 'error'
				});
			});
		}
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					book: this.state
				}}
				Content={Content}
				ContentProps={{
					book: this.state,
					onChange: this.handleChange,
					onSet: this.handleSet,
					onChangeIsbn: this.handleChangeIsbn
				}}/>
		);
	}

	handleChange = field => ({target: {value}}) => {
		this.setState({
			[field]: value
		});
	}

	handleSet = (field, value) => {
		this.setState({
			[field]: value
		});
	}

	handleChangeIsbn = ({target: {value}}) => {
		this.setState({
			isbn: anyToIsbn13(value)
		});
	}

	consumeSession = (previous) => {
		const bookAdd = Session.get('BookAdd');
		let saved;
		if(bookAdd === 'position' && (saved = Session.get('SavedPosition'))) {
			previous.position = saved;
			Session.set('SavedPosition', null);
		}
		else if(bookAdd === 'publisher' && (saved = Session.get('SavedPublisher'))) {
			previous.publisher = saved;
			Session.set('SavedPublisher', null);
		}
		else if(bookAdd === 'author' && (saved = Session.get('SavedAuthor'))) {
			previous.authors.push(saved);
			Session.set('SavedAuthor', null);
		}
		else if(bookAdd === 'genre' && (saved = Session.get('SavedGenre'))) {
			previous.genres.push(saved);
			Session.set('SavedGenre', null);
		}
		Session.set('BookAdd', null);
		return previous;
	}
}

export default withSnackbar(withRouter(BookEdit));
