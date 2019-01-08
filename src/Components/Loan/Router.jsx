import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function LoanRouter (props) {
	return (
		<Switch>
			<Route path="/loan/view/:id" component={View}/>
			<Route path="/loan/edit/:id" component={Edit}/>
			<Route path="/loan/new" component={New}/>
		</Switch>
	);
}
