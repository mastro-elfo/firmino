import React, {Component} from 'react';

import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';

import explode from '../../Utils/ExplodeSearch';

class PositionNew extends Component {
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
					position: this.state
				}}
				Content={Content}
				ContentProps={{
					position: this.state,
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

export default PositionNew;
