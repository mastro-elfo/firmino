import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function UserRouter (props) {
	return (
		<Switch>
			<Route path="/user/view/:id" component={View}/>
			<Route path="/user/edit/:id" component={Edit}/>
			<Route path="/user/new" component={New}/>
		</Switch>
	);
}
