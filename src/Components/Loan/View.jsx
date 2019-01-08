import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Loan from '../../Actions/Loan';

class LoanView extends Component {
	state = {
		datetime: 0,
		expire: 0,
		book: '',
		user: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Loan).Read(id)
		.then(loan => {
			this.setState({...loan});
		})
		.catch(err => {
			console.error('Error loading loan', id, err);
			enqueueSnackbar('Errore, prestito non trovato', {
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
					loan: this.state
				}}/>
		);
	}
}

export default withSnackbar(LoanView);
