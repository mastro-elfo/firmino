import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	render(){
		const {classes, author: {name, surname}, onChange} = this.props;

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

export default withStyles(styles)(Content);
