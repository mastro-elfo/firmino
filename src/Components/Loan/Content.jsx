import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Delete from '@material-ui/icons/Delete';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

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
								primary={`${book.title}`}
								secondary="Libro"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${user.name} ${user.surname}`}
								secondary="Utente"/>
						</ListItem>
						{
							!!user.email &&
							<ListItem>
								<ListItemText
									primary={user.email}
									secondary="Email"/>
							</ListItem>
						}
						{
							!!user.telephone &&
							<ListItem>
								<ListItemText
									primary={user.telephone}
									secondary="Telefono"/>
							</ListItem>
						}
						<ListItem>
							<ListItemText
								primary={`${(new Date(datetime)).toLocaleDateString()}`}
								secondary="Data prestito"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${(new Date(expire)).toLocaleDateString()}`}
								secondary="Scadenza"/>

							{
								(+new Date(expire) < +new Date) &&
								<ListItemIcon>
									<NotificationImportant/>
								</ListItemIcon>
							}
						</ListItem>
						{
							archived &&
							<ListItem>
								<ListItemText
									primary="Archiviato"/>
								<ListItemIcon>
									<Delete/>
								</ListItemIcon>
							</ListItem>
						}
					</List>
				</Grid>
			</Grid>
		);
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withRouter(withStyles(styles)(Content));
