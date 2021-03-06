import React, {Component} from 'react';

import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';

import explode from '../../Utils/ExplodeSearch';

class NewGenre extends Component {
	state = {
		name: '',
		surname: ''
	}

	componentDidMount(){
		const {location: {search}} = this.props;
		const {name, surname} = explode(search);
		if(name) {
			this.setState({name});
		}
		if(surname) {
			this.setState({surname});
		}
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					genre: this.state
				}}
				Content={Content}
				ContentProps={{
					genre: this.state,
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

export default NewGenre;
