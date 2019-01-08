import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Book from '../../Actions/Book';

class BookView extends Component {
	state = {
		isbn: '',
		title: '',
		description: '',
		language: '',
		position: '',
		publisher: '',
		authors: [],
		genres: [],
		archived: false
	}

	componentDidMount(){
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

	render(){
		return (
			<Page
				Header={Header}
				Content={Content}
				ContentProps={{
					book: this.state
				}}/>
		);
	}
}

export default withSnackbar(BookView);
