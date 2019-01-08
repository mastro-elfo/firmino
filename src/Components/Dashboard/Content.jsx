import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SearchField from '../SearchField';
import SearchResult from '../SearchResult';
import match from 'autosuggest-highlight/match';
import {Local} from '../../Utils/Storage';

import Collection from '../../Actions/Collection';

import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LocationOn from '@material-ui/icons/LocationOn';
import Copyright from '@material-ui/icons/Copyright';
import Edit from '@material-ui/icons/Edit';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Loyalty from '@material-ui/icons/Loyalty';
import Delete from '@material-ui/icons/Delete';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import ErrorIcon from '@material-ui/icons/Error';

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
						label="Cerca"
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

		this.start = +new Date();

		'authors books genres loans positions publishers users'
		.split(' ')
		.reduce((previous, current) => (
			previous.then(results => (
				(new Collection(current)).Read()
				.then(result => {
					const filtered = result
					.filter(item => !item.archived)
					.map(item => {
						const matches = match(item.search, search);
						return ({
							...item,
							_match: matches.length,
							_matchIndex: matches.length > 0 ? matches[0][0]: 0,
							_collection: current
						});
					})
					.filter(item => item._match > 0);

					results = results.concat(filtered);
					return results;
				})
			))
		), Promise.resolve([]))
		.then(results => {
			results = results
			.sort((a,b) => (
				b._match - a._match
				|| a._matchIndex - b._matchIndex
			))
			.map(item => this.mapToResult(item._collection, item));

			this.setState({
				result: results,
				loading: false,
				time: +new Date() - this.start
			});
		})
		.catch(err => {
			console.error('Error searching', search, err);
			this.setState({
				result: [],
				loading: false
			});
		});
	}

	mapToResult(type, item){
		switch (type) {
			case 'authors':
				return ({
					primary: `${item.name} ${item.surname}`,
					secondary: '',
					icon: <Edit/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/author/view/${item.id}`,
				});
				break;
			case 'books':
				return ({
					primary: `${item.title}`,
					secondary: `${item.authors.map(a=>`${a.name} ${a.surname}`).join(', ')}`,
					icon: <LibraryBooks/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/book/view/${item.id}`
				});
				break;
			case 'genres':
				return ({
					primary: `${item.name}`,
					secondary: '',
					icon: <Loyalty/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/genre/view/${item.id}`
				});
				break;
			case 'loans':
				return ({
					primary: `${item.book.title} - ${item.user.name} ${item.user.surname}`,
					secondary: `${(new Date(item.datetime)).toLocaleDateString()} - ${(new Date(item.expire)).toLocaleDateString()}`,
					icon: <CompareArrows/>,
				secondaryIcon: item.archived ? <Delete/> : ((+new Date(item.expire) < +new Date) ? <NotificationImportant/> : null),
					link: `/loan/view/${item.id}`
				});
				break;
			case 'positions':
				return ({
					primary: `${item.name}`,
					secondary: '',
					icon: <LocationOn/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/position/view/${item.id}`
				});
				break;
			case 'publishers':
				return ({
					primary: `${item.name}`,
					secondary: '',
					icon: <Copyright/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/publisher/view/${item.id}`
				});
				break;
			case 'users':
				return ({
					primary: `${item.name} ${item.surname}`,
					secondary: `${item.email || item.telephone}`,
					icon: <Person/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: `/user/view/${item.id}`
				});
				break;
			default:
				return ({
					primary: 'No map defined',
					secondary: '',
					icon: <ErrorIcon/>,
					secondaryIcon: item.archived ? <Delete/> : null,
					link: '',
				});
		}
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withStyles(styles)(Content);
