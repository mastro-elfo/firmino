import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function GenreRouter (props) {
	return (
		<Switch>
			<Route path="/genre/view/:id" component={View}/>
			<Route path="/genre/edit/:id" component={Edit}/>
			<Route path="/genre/new" component={New}/>
		</Switch>
	);
}
