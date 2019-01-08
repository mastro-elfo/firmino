import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Genre from '../../Actions/Genre';

class GenreEdit extends Component {
	state = {
		name: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Genre).Read(id)
		.then(genre => {
			this.setState({...genre});
		})
		.catch(err => {
			console.error('Error loading author', id, err);
			enqueueSnackbar('Errore, genere non trovato', {
				variant: 'error'
			});
		});
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					genre: this.state
				}}
				Content={Content}
				ContentProps={{
					genre: this.state,
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

export default withSnackbar(withRouter(GenreEdit));
