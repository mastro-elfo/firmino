import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Position from '../../Actions/Position';

class PositionView extends Component {
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
				Content={Content}
				ContentProps={{
					position: this.state
				}}/>
		);
	}
}

export default withSnackbar(PositionView);
