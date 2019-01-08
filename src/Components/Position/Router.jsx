import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function PositionRouter (props) {
	return (
		<Switch>
			<Route path="/position/view/:id" component={View}/>
			<Route path="/position/edit/:id" component={Edit}/>
			<Route path="/position/new" component={New}/>
			<Redirect to="/error/100"/>
		</Switch>
	);
}
