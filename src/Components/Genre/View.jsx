import React, {Component} from 'react';
import {withSnackbar} from 'notistack';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

import Genre from '../../Actions/Genre';

class GenreView extends Component {
	state = {
		name: '',
		surname: '',
		archived: false
	}

	componentDidMount(){
		const {match: {params: {id}}, enqueueSnackbar} = this.props;
		(new Genre).Read(id)
		.then(genre => {
			this.setState({...genre});
		})
		.catch(err => {
			console.error('Error loading genre', id, err);
			enqueueSnackbar('Errore, autore non trovato', {
				variant: 'error'
			});
		});
	}

	render(){
		return (
			<Page
				Header={Header}
				Content={Content}
				ContentProps={{
					genre: this.state
				}}/>
		);
	}
}

export default withSnackbar(GenreView);
