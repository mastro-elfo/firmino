import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import FastForward from '@material-ui/icons/FastForward';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	render(){
		const {classes, loan: {datetime, expire, book, user, archived}} = this.props;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List>
						<ListItem>
							<ListItemText
								primary={`${book && book.title}`}
								secondary="Libro"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${user && user.name} ${user && user.surname}`}
								secondary="Utente"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${(new Date(datetime)).toLocaleDateString()}`}
								secondary="Data prestito"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${(new Date(expire)).toLocaleDateString()}`}
								secondary="Scadenza"/>
							<ListItemSecondaryAction>
								<IconButton
									title="Clicca per estendere"
									onClick={this.handleExpire}>
									<FastForward/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem
							button
							onClick={this.handleArchived}>
							<ListItemText
								primary={!!archived ? "Archiviato" : "Attivo"}/>
							<Checkbox
								checked={!archived}/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);
	}

	handleExpire = () => {
		const {loan: {expire}, onSet} = this.props;
		let extend = new Date(expire);
		onSet('expire', +extend.setMonth(extend.getMonth() +1));
	}

	handleArchived = () => {
		const {loan: {archived}, onSet} = this.props;
		if(!!archived) {
			onSet('archived', false);
		}
		else {
			onSet('archived', +new Date);
		}
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withStyles(styles)(Content);
