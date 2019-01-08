import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import User from '../../Actions/User';

class UserView extends Component {
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
				Content={Content}
				ContentProps={{
					user: this.state
				}}/>
		);
	}
}

export default withSnackbar(UserView);
