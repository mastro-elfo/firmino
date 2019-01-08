import React, {Component} from 'react';

import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';

import explode from '../../Utils/ExplodeSearch';

class PublisherNew extends Component {
	state = {
		name: ''
	}

	componentDidMount(){
		const {location: {search}} = this.props;
		const {name} = explode(search);
		if(name) {
			this.setState({name});
		}
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					publisher: this.state
				}}
				Content={Content}
				ContentProps={{
					publisher: this.state,
					onChange: this.handleChange
				}}/>
		);
	}

	handleChange = field => ({target: {value}}) => {
		this.setState({
			[field]: value
		});
	}
}

export default PublisherNew;
