import React, {Component} from 'react';

import Page from '../Page';

import Header from './Header';
import Content from './Content';

export default class extends Component {
	render(){
		// console.debug('Render Settings View');
		return (
			<Page
				Header={Header}
				Content={Content}
				/>
		);
	}
}
