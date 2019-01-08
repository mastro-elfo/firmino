import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';

import Position from '../../Actions/Position';

class PositionEdit extends Component {
	state = {
		name: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Position).Read(id)
		.then(position => {
			this.setState({...position});
		})
		.catch(err => {
			console.error('Error loading position', id, err);
			enqueueSnackbar('Errore, collocazione non trovata', {
				variant: 'error'
			});
		})
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					position: this.state
				}}
				Content={Content}
				ContentProps={{
					position: this.state,
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

export default withSnackbar(withRouter(PositionEdit));
