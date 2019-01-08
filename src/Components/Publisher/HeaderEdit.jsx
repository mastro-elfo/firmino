import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import Publisher, {searchString} from '../../Actions/Publisher';
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
						Modifica editore
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
		const {history: {goBack}, publisher, match: {params: {id}}, enqueueSnackbar} = this.props;

		// Check validity
		if(publisher.name.trim() === '') {
			enqueueSnackbar('Inserisci un nome', {
				variant: 'warning'
			});
			return;
		}

		this.setState({
			loading: true
		});

		// Set search field
		publisher.search = searchString(publisher);

		(new Publisher).Update(publisher)
		.then(()=>(new Books).TriggerPublisher(publisher))
		.then(() => {
			console.info('Edit publisher', id);
			this.setState({
				loading: false
			});
			Session.set('SavedPublisher', publisher);
			goBack();
		})
		.catch(err => {
			console.error('Error editing publisher', id, err);
			enqueueSnackbar('Errore, editore non modificato', {
				variant: 'error'
			});
			this.setState({
				loading: false
			});
		})
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
