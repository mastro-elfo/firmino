import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import match from 'autosuggest-highlight/match';
import SearchField from '../SearchField';
import SearchResult from '../SearchResult';
import {Local} from '../../Utils/Storage';
import Authors from '../../Actions/Authors';

import Delete from '@material-ui/icons/Delete';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	state = {
		search: '',
		result: [],
		time: 0,
		loading: false
	}

	componentDidMount(){
		const {searchResultLimit = 5} = Local.get('Settings') || {};
		(new Authors).Read()
		.then(result => {
			if(result.length <= searchResultLimit) {
				this.setState({
					result: result.map(item => this.mapToResult(item))
				});
			}
		})
		.catch(err => {
			console.error(err);
		});
	}

	render(){
		const {classes} = this.props;
		const {search, result, time, loading} = this.state;
		const {searchResultLimit = 5} = Local.get('Settings') || {};

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<SearchField
						fullWidth
						label="Cerca autore"
						loading={loading}
						onSearch={this.handleSearch}/>
					<SearchResult
						search={search}
						result={result}
						time={time}
						limit={searchResultLimit}/>
				</Grid>
			</Grid>
		);
	}

	handleSearch = (search) => {
		if(!search) {
			this.setState({
				loading: false,
				search: '',
				result: []
			});
			return;
		}

		this.setState({
			loading: true,
			search
		});

		const {onSearch} = this.props;
		onSearch(search);

		this.start = +new Date();

		(new Authors).Read()
		.then(result => {
			const filtered = result.map(item => {
				const matches = match(item.search, search);
				return ({
					...item,
					_match: matches.length,
					_matchIndex: matches.length > 0 ? matches[0][0]: 0
				});
			})
			.filter(item => item._match > 0)
			.sort((a,b) => (
				b._match - a._match
				|| a._matchIndex - b._matchIndex
				|| a.name.localeCompare(b.name)
				|| a.surname.localeCompare(b.surname)
			))
			.map(item => this.mapToResult(item));

			this.setState({
				loading: false,
				time: +new Date() - this.start,
				result: filtered
			});
		})
		.catch(err => {
			console.error(err);
			this.setState({
				loading: false
			});
		});
	}

	mapToResult (item) {
		return ({
			primary: `${item.name} ${item.surname}`,
			secondary: '',
			icon: null,
			secondaryIcon: item.archived ? <Delete/> : null,
			link: `/author/view/${item.id}`,
		});
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withStyles(styles)(Content);
