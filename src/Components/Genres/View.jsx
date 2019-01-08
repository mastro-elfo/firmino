import React, {Component} from 'react';

import Page from '../Page';
import Header from './Header';
import Content from './Content';

export default class ViewGenres extends Component {
	state = {
		search: ''
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					search: this.state.search
				}}
				Content={Content}
				ContentProps={{
					onSearch: this.handleSearch
				}}
				/>
		);
	}

	handleSearch = search => {
		this.setState({search});
	}
}
