import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';

export default function UsersRouter (props) {
	return (
		<Switch>
			<Route path="/users" component={View}/>
		</Switch>
	);
}
