import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import Author, {searchString} from '../../Actions/Author';
import Books from '../../Actions/Books';
import {Session} from '../../Utils/Storage';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

class Header extends Component {
	state = {
		loading: false
	}

	render(){
		const {classes, history: {goBack}} = this.props;
		const {loading} = this.state;

		return (
			<AppBar
				position="static">
				<Toolbar>
					<IconButton
						color="inherit"
						title="Torna indietro"
						onClick={() => goBack()}>
						<ArrowBack/>
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						className={classes.grow}>
						Modifica autore
					</Typography>
					<IconButton
						color="inherit"
						title=""
						onClick={this.handleSave}>
						<Save/>
						{
							loading &&
							<CircularProgress
								color="secondary"
								className={classes.Absolute}/>
						}
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}

	handleSave = () => {
		const {history: {goBack}, match: {params: {id}}, author, enqueueSnackbar} = this.props;

		// Check validity
		if(author.name.trim() === '' && author.surname.trim() === '') {
			enqueueSnackbar('Inserisci Nome o Cognome', {
				variant: 'warning'
			});
			return;
		}

		this.setState({
			loading: true
		});

		// Set search field
		author.search = searchString(author);

		(new Author).Update(author)
		.then(()=>(new Books).TriggerAuthor(author))
		.then(() => {
			console.info('Edit author', id);
			this.setState({
				loading: false
			});
			Session.set('SavedAuthor', author);
			goBack();
		})
		.catch(err => {
			console.error('Error updating author', id, err);
			enqueueSnackbar('Errore, autore non modificato', {
				variant: 'error'
			});
			this.setState({
				loading: false
			});
		});
	}
}

const styles = theme => ({
	grow: {
		flexGrow: 1
	},
	Absolute: {
		position: 'absolute'
	}
});

export default withSnackbar(withRouter(withStyles(styles)(Header)));
