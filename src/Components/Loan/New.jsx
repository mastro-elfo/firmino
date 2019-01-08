import React, {Component} from 'react';

import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';

import {Session} from '../../Utils/Storage';

export default class LoanNew extends Component {
	state = {
		datetime: 0,
		expire: 0,
		book: null,
		user: null
	}

	constructor(props){
		super(props);
		let now = new Date;
		this.state.datetime = +now;
		this.state.expire = +now.setMonth(now.getMonth() +1);
	}

	componentDidMount(){
		let previous = Session.get('Loan');
		if(previous) {
			previous = this.consumeSession(previous);
			this.setState({...previous});
			Session.set('Loan', null);
		}
		else {
			this.setState({
				user: '',
				book: ''
			});
		}
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					loan: this.state
				}}
				Content={Content}
				ContentProps={{
					loan: this.state,
					onChange: this.handleChange,
					onSet: this.handleSet
				}}/>
		);
	}

	handleChange = field => ({target: {value}}) => {
		this.setState({
			[field]: value
		});
	}

	handleSet = (field, value) => {
		this.setState({
			[field]: value
		});
	}

	consumeSession = (previous) => {
		const loanAdd = Session.get('LoanAdd');
		let saved;
		if(loanAdd === 'user' && (saved = Session.get('SavedUser'))) {
			previous.user = saved;
			Session.set('SavedUser', null);
		}
		else if(loanAdd === 'book' && (saved = Session.get('SavedBook'))) {
			previous.book = saved;
			Session.set('SavedBook', null);
		}
		Session.set('LoanAdd', null);
		return previous;
	}
}
