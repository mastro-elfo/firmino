import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';

export default function GenresRouter (props) {
	return (
		<Switch>
			<Route path="/genres" component={View}/>
		</Switch>
	);
}
