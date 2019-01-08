import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	render(){
		const {classes, user: {name, surname, email, telephone, archived}, onChange} = this.props;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List>
						<ListItem>
							<TextField
								fullWidth
								label="Nome"
								value={name}
								onChange={onChange('name')}/>
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								label="Cognome"
								value={surname}
								onChange={onChange('surname')}/>
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								label="Email"
								type="email"
								value={email}
								onChange={onChange('email')}/>
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								label="Telephone"
								type="tel"
								value={telephone}
								onChange={onChange('telephone')}/>
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

	handleArchived = () => {
		const {user: {archived}, onSet} = this.props;
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
