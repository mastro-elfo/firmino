import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';

export default function (props) {
	return (
		<Switch>
			<Route path="/authors" component={View}/>
		</Switch>
	);
}
