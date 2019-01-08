import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function AuthorRouter (props) {
	return (
		<Switch>
			<Route path="/author/view/:id" component={View}/>
			<Route path="/author/edit/:id" component={Edit}/>
			<Route path="/author/new" component={New}/>
		</Switch>
	);
}
