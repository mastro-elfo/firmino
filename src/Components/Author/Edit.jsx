import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Author from '../../Actions/Author';

class AuthorEdit extends Component {
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
				HeaderProps={{
					author: this.state
				}}
				Content={Content}
				ContentProps={{
					author: this.state,
					onChange: this.handleChange,
					onSet: this.handleSet
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
}

export default withSnackbar(withRouter(AuthorEdit));
