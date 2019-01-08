import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';

export default function LoansRouter (props) {
	return (
		<Switch>
			<Route path="/loans" component={View}/>
		</Switch>
	);
}
