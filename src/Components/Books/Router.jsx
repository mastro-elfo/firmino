import React from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';

export default function BooksRouter (props) {
	return (
		<Switch>
			<Route path="/books" component={View}/>
		</Switch>
	);
}
