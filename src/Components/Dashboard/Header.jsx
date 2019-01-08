import React from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/icons/Menu';
import Add from '@material-ui/icons/Add';

function Header (props) {
	const {classes, onDrawerOpen, history: {push}} = props;
	return (
		<AppBar
			position="static">
			<Toolbar>
				<IconButton
					color="inherit"
					title="Apri il menù"
					onClick={onDrawerOpen}>
					<Menu/>
				</IconButton>
				<Typography
					variant="h6"
					color="inherit"
					className={classes.grow}>
					Libreria
				</Typography>
				<IconButton
					color="inherit"
					title="Aggiungi un libro"
					onClick={()=>push('/book/new')}>
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
