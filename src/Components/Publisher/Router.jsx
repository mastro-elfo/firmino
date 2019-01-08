import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import View from './View';
import Edit from './Edit';
import New from './New';

export default function PublisherRouter (props) {
	return (
		<Switch>
			<Route path="/publisher/view/:id" component={View}/>
			<Route path="/publisher/edit/:id" component={Edit}/>
			<Route path="/publisher/new" component={New}/>
		</Switch>
	);
}
