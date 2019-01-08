import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Publisher from '../../Actions/Publisher';

class PublisherView extends Component {
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
				Content={Content}
				ContentProps={{
					publisher: this.state
				}}/>
		);
	}
}

export default withSnackbar(PublisherView);
