import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Loan from '../../Actions/Loan';

class LoanEdit extends Component {
	state = {
		datetime: 0,
		expire: 0,
		book: null,
		user: null,
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Loan).Read(id)
		.then(loan => this.setState({...loan}))
		.catch(err => {
			console.error('Error loading loan', id, err);
			enqueueSnackbar('Errore, prestito non trovato', {
				variant: 'error'
			});
		});
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					loan: this.state
				}}
				Content={Content}
				ContentProps={{
					loan: this.state,
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

export default withSnackbar(LoanEdit);
