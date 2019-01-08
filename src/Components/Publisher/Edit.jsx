import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Publisher from '../../Actions/Publisher';

class PublisherEdit extends Component {
	state = {
		name: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Publisher).Read(id)
		.then(publisher => {
			this.setState({...publisher});
		})
		.catch(err => {
			console.error('Error loading publisher', id, err);
			enqueueSnackbar('Errore, editore non trovato', {
				variant: 'error'
			});
		})
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					publisher: this.state
				}}
				Content={Content}
				ContentProps={{
					publisher: this.state,
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

export default withSnackbar(withRouter(PublisherEdit));
