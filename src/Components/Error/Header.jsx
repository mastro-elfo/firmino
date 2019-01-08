import React from 'react';

import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Dashboard from '@material-ui/icons/Dashboard';

function Header (props) {
	const {classes, history: {push}, match: {params}} = props;
	return (
		<AppBar
			position="static">
			<Toolbar>
				<IconButton
					color="inherit"
					title="Torna alla pagina principale"
					onClick={() => push('/dashboard')}>
					<Dashboard/>
				</IconButton>
				<Typography
					variant="h6"
					color="inherit"
					className={classes.grow}>
					Errore {params.code}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

const styles = theme => ({
	grow: {
		flexGrow: 1
	}
});

export default withRouter(withStyles(styles)(Header));
