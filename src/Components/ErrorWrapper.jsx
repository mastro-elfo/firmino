import React, { Component } from 'react';

export default class ErrorWrapper extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidCatch(error, info){
		console.error('Console Error', error, info, this.props);
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {error};
	}

	render() {
		if(this.state.error) {
			return (
				<div>
					<h1>Something went terribly wrong</h1>
					{
						// <p>{this.state.error}</p>
					}
				</div>
			)
		}
		else {
			return this.props.children;
		}
	}
}
