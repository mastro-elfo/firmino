import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import Author from './Author/Router';
import Authors from './Authors/Router';
import Book from './Book/Router';
import Books from './Books/Router';
import Dashboard from './Dashboard/Router';
import Error from './Error/Router';
import Help from './Help/Router';
import Info from './Info/Router';
import Genre from './Genre/Router';
import Genres from './Genres/Router';
import Loan from './Loan/Router';
import Loans from './Loans/Router';
import Position from './Position/Router';
import Positions from './Positions/Router';
import Publisher from './Publisher/Router';
import Publishers from './Publishers/Router';
import Settings from './Settings/Router';
import User from './User/Router';
import Users from './Users/Router';

export default function Router (props) {
	return (
		<HashRouter>
			<Switch>
				<Route path="/author" component={Author}/>
				<Route path="/authors" component={Authors}/>
				<Route path="/book" component={Book}/>
				<Route path="/books" component={Books}/>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path="/error" component={Error}/>
				<Route path="/genre" component={Genre}/>
				<Route path="/genres" component={Genres}/>
				<Route path="/help" component={Help}/>
				<Route path="/info" component={Info}/>
				<Route path="/loan" component={Loan}/>
				<Route path="/loans" component={Loans}/>
				<Route path="/position" component={Position}/>
				<Route path="/positions" component={Positions}/>
				<Route path="/publisher" component={Publisher}/>
				<Route path="/publishers" component={Publishers}/>
				<Route path="/settings" component={Settings}/>
				<Route path="/user" component={User}/>
				<Route path="/users" component={Users}/>
				<Redirect to="/dashboard"/>
			</Switch>
		</HashRouter>
	);
}
