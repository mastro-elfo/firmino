import React from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Edit from '@material-ui/icons/Edit';

function Header (props) {
	const {classes, history: {goBack, push}, match: {params: {id}}} = props;
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
					Scheda libro
				</Typography>
				<IconButton
					color="inherit"
					title="Modifica"
					onClick={() => push(`/book/edit/${id}`)}>
					<Edit/>
				</IconButton>
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
