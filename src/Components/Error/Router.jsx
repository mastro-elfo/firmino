import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import View from './View';

export default function (props) {
	return (
		<Switch>
			<Route path="/error/:code" component={View}/>
			<Redirect to="/error/000"/>
		</Switch>
	);
}
