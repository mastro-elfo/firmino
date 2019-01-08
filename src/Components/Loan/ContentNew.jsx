import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Autocomplete from '../Autocomplete';
import Users from '../../Actions/Users';
import Books from '../../Actions/Books';
import {anyToIsbn13} from '../../Utils/isbn';
import {Session} from '../../Utils/Storage';
import {validate} from 'beautify-isbn';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	state = {
		AllUsers: [],
		AllBooks: []
	}

	componentDidMount(){
		(new Users).Read()
		.then(result => this.setState({
			AllUsers: result.filter(item => !item.archived)
		}))
		.catch(err => {
			console.error(err);
		});

		(new Books).Read()
		.then(result => this.setState({
			AllBooks: result.filter(item => !item.archived)
		}))
		.catch(err => {
			console.error(err);
		});
	}

	render(){
		const {classes, loan: {datetime, expire, book, user}, onSet} = this.props;
		const {AllUsers, AllBooks} = this.state;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List>
						<ListItem>
							{
								book !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: "Scegli libro"
									}}
									onChange={book=>onSet('book', book||'')}
									suggestions={AllBooks}
									selected={book}
									itemToString={item=>item?item.title:''}
									onClickAdd={this.handleClickAddBook}/>
							}
						</ListItem>

						<ListItem>
							{
								user !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: "Scegli utente"
									}}
									onChange={user=>onSet('user', user||'')}
									suggestions={AllUsers}
									selected={user}
									itemToString={item=>item ? `${item.name} ${item.surname}` : ''}
									onClickAdd={this.handleClickAddUser}/>
							}
						</ListItem>

						<ListItem>
							<ListItemText
								primary={`${(new Date(datetime)).toLocaleDateString()}`}
								secondary="Data prestito"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`${(new Date(expire)).toLocaleDateString()}`}
								secondary="Scadenza"/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);
	}

	handleClickAddBook = (value) => {
		const {loan, history: {push}} = this.props;
		Session.set('Loan', loan);
		Session.set('LoanAdd', 'book');
		let isbn = '';
		let title = '';
		if(validate(value)) {
			isbn = anyToIsbn13(value);
		}
		else {
			title = value;
		}
		push(`/book/new?title=${title}&isbn=${isbn}`);
	}

	handleClickAddUser = (value) => {
		const {loan, history: {push}} = this.props;
		Session.set('Loan', loan);
		Session.set('LoanAdd', 'user');
		let name = value.split(' ');
		let surname = name.length > 1 ? name.pop() : '';
		name = name.join(' ');
		push(`/user/new?name=${name}&surname=${surname}`);
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withRouter(withStyles(styles)(Content));
