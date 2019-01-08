import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function BookRouter (props) {
	return (
		<Switch>
			<Route path="/book/view/:id" component={View}/>
			<Route path="/book/edit/:id" component={Edit}/>
			<Route path="/book/new" component={New}/>
		</Switch>
	);
}
