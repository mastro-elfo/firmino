import React, {Component} from 'react';

import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';

import explode from '../../Utils/ExplodeSearch';
import {Session} from '../../Utils/Storage';
import {anyToIsbn13} from '../../Utils/isbn';

export default class BookNew extends Component {
	state = {
		isbn: '',
		title: '',
		description: '',
		language: '',
		position: null,
		publisher: null,
		authors: null,
		genres: null
	}

	componentDidMount(){
		let previous = Session.get('Book');
		if(previous) {
			previous = this.consumeSession(previous);
			this.setState({...previous});
			Session.set('Book', null);
		}
		else {
			const {location: {search}} = this.props;
			const {title, isbn} = explode(search);
			if(title) {
				this.setState({title});
			}
			if(isbn) {
				this.setState({isbn});
			}
			this.setState({
				position: '',
				publisher: '',
				authors: [],
				genres: []
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
