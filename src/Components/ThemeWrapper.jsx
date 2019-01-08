import React, {Component} from 'react';

// Customize main theme
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

import {Local} from '../Utils/Storage';

const COLORS = {red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange};

const {
	primaryColor = 'blue',
	secondaryColor = 'orange'
} = Local.get('Settings') || {};

// Customize Theme
const THEME = createMuiTheme({
	palette: {
		primary: COLORS[primaryColor],
		secondary: COLORS[secondaryColor]
	},
	typography: {
		useNextVariants: true,
	}
});
// console.info("Theme", THEME);

export default class extends Component {
	state = {
		theme: THEME
	}

	render(){
		return (
			<MuiThemeProvider theme={{
					...this.state.theme,
					__update: this.handleUpdate
				}}>
				{this.props.children}
			</MuiThemeProvider>
		);
	}
	handleUpdate = (primaryColor, secondaryColor) => {
		this.setState({
			theme: createMuiTheme({
				palette: {
					primary: COLORS[primaryColor],
					secondary: COLORS[secondaryColor]
				},
				typography: {
					useNextVariants: true,
				}
			})
		});
	}
}
