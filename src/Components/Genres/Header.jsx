import React from 'react';

import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';

function Header (props) {
	const {classes, history: {goBack, push}, search} = props;

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
					Generi
				</Typography>
				<IconButton
					color="inherit"
					title="Aggiungi un genere"
					onClick={()=>push(`/genre/new?name=${search}`)}>
					<Add/>
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
