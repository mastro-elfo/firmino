import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Collection from '../../Actions/Collection';

import {shell, remote} from 'electron';

import Email from '@material-ui/icons/Email';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	state = {
		authors: 0,
		books: 0,
		genres: 0,
		loans: 0,
		positions: 0,
		publishers: 0,
		users: 0
	}

	componentDidMount(){
		'authors books genres loans positions publishers users'
		.split(' ')
		.forEach(item => {
			(new Collection(item)).Read()
			.then(response => this.setState({[item]: response.length}))
			.catch(err => console.error(err));
		})
	}

	render(){
		const {classes} = this.props;
		const {authors, books, genres, loans, publishers, positions, users} = this.state;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List
						subheader={
							<ListSubheader
								className={classes.ListSubheader}>
								Applicazione
							</ListSubheader>
						}>
						<ListItem>
							<ListItemText
								primary="Firmino"
								secondary="Utility per la gestione della libreria personale e dei prestiti"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={remote.app.getVersion()}
								secondary="Versione"/>
						</ListItem>
					</List>
					<Divider/>
					<List
						subheader={
							<ListSubheader
								className={classes.ListSubheader}>
								Sviluppo
							</ListSubheader>
						}>
						<ListItem>
							<ListItemText
								primary="Francesco Michienzi"
								secondary="Sviluppatore"/>
						</ListItem>
						<ListItem
							button
							title="Clicca per inviare un'email allo sviluppatore"
							onClick={()=>shell.openExternal(`mailto:francesco.209@gmail.com?subject=Firmino%20${remote.app.getVersion()}`)}>
							<ListItemText
								primary="francesco.209@gmail.com"
								secondary="Email"/>
							<ListItemIcon>
								<Email/>
							</ListItemIcon>
						</ListItem>
					</List>
					<Divider/>
					<List
						subheader={
							<ListSubheader
								className={classes.ListSubheader}>
								Database
							</ListSubheader>
						}>
						<ListItem>
							<ListItemText
								primary={authors}
								secondary={authors === 1 ? 'Autore' : 'Autori'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={books}
								secondary={books === 1 ? 'Libro' : 'Libri'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={genres}
								secondary={genres === 1 ? 'Genere' : 'Generi'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={loans}
								secondary={loans === 1 ? 'Prestito' : 'Prestiti'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={positions}
								secondary={positions === 1 ? 'Collocazione' : 'Collocazioni'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={publishers}
								secondary={publishers === 1 ? 'Editore' : 'Editori'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={users}
								secondary={users === 1 ? 'Utente' : 'Utenti'}/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	},
	ListSubheader: {
		background: 'white'
	}
});

export default withStyles(styles)(Content);
