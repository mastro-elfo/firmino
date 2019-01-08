import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Author from '../../Actions/Author';

class AuthorView extends Component {
	state = {
		name: '',
		surname: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Author).Read(id)
		.then(author => {
			this.setState({...author});
		})
		.catch(err => {
			console.error('Error loading author', id, err);
			enqueueSnackbar('Errore, autore non trovato', {
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
					author: this.state
				}}/>
		);
	}
}

export default withSnackbar(AuthorView);
