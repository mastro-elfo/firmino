import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import User from '../../Actions/User';

class UserEdit extends Component {
	state = {
		name: '',
		surname: '',
		email: '',
		telephone: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new User).Read(id)
		.then(user => {
			this.setState({...user});
		})
		.catch(err => {
			console.error('Error loading user', id, err);
			enqueueSnackbar('Errore, utente non trovato', {
				variant: 'error'
			});
		})
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					user: this.state
				}}
				Content={Content}
				ContentProps={{
					user: this.state,
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

export default withSnackbar(withRouter(UserEdit));
