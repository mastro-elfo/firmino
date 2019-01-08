import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import Autocomplete from '../Autocomplete';
import Authors from '../../Actions/Authors';
import Positions from '../../Actions/Positions';
import Publishers from '../../Actions/Publishers';
import Genres from '../../Actions/Genres';
import {Session} from '../../Utils/Storage';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class BookContent extends Component {
	state = {
		AllAuthors: [],
		AllPositions: [],
		AllPublishers: [],
		AllGenres: []
	}

	componentDidMount(){
		(new Authors).Read()
		.then(result => this.setState({
			AllAuthors: result.filter(item => !item.archived)
		}))
		.catch(err => console.error(err));

		(new Positions).Read()
		.then(result => this.setState({
			AllPositions: result.filter(item => !item.archived)
		}))
		.catch(err => console.error(err));

		(new Publishers).Read()
		.then(result => this.setState({
			AllPublishers: result.filter(item => !item.archived)
		}))
		.catch(err => console.error(err));

		(new Genres).Read()
		.then(result => this.setState({
			AllGenres: result.filter(item => !item.archived)
		}))
		.catch(err => console.error(err));
	}

	render(){
		const {classes, book: {isbn, title, description, language, position, publisher, authors, genres, archived}, onChange, onSet, onChangeIsbn} = this.props;
		const {AllAuthors, AllPositions, AllPublishers, AllGenres} = this.state;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List>
						<ListItem>
							<TextField
								fullWidth
								label="ISBN"
								value={isbn}
								onChange={onChangeIsbn}/>
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								label="Titolo"
								value={title}
								onChange={onChange('title')}/>
						</ListItem>
						<ListItem>
							{
								authors !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: 'Seleziona autori...'
									}}
									multiple={true}
									suggestions={AllAuthors}
									selected={authors}
									onChange={authors=>onSet('authors',authors)}
									itemToString={item=>`${item.name} ${item.surname}`}
									onClickAdd={this.handleClickAddAuthor}/>
							}
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								multiline
								label="Descrizione/Trama"
								value={description}
								onChange={onChange('description')}
								InputProps={{
									rowsMax: 4
								}}/>
						</ListItem>
						<ListItem>
							{
								publisher !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: 'Seleziona editore...'
									}}
									multiple={false}
									suggestions={AllPublishers}
									selected={publisher}
									onChange={publisher=>onSet('publisher',publisher||'')}
									itemToString={item=>item?item.name:''}
									onClickAdd={this.handleClickAddPublisher}/>
							}
						</ListItem>
						<ListItem>
							{
								genres !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: 'Seleziona generi...'
									}}
									multiple={true}
									suggestions={AllGenres}
									selected={genres}
									onChange={genres=>onSet('genres',genres)}
									itemToString={item=>item.name}
									onClickAdd={this.handleClickAddGenre}/>
							}
						</ListItem>
						<ListItem>
							{
								position !== null &&
								<Autocomplete
									TextFieldProps={{
										fullWidth: true,
										label: 'Seleziona collocazione...'
									}}
									multiple={false}
									suggestions={AllPositions}
									selected={position}
									onChange={position=>onSet('position',position||'')}
									itemToString={item=>item?item.name:''}
									onClickAdd={this.handleClickAddPosition}/>
							}
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								label="Lingua"
								value={language}
								onChange={onChange('language')}/>
						</ListItem>
						<ListItem
							button
							onClick={this.handleArchived}>
							<ListItemText
								primary={!!archived ? "Archiviato" : "Attivo"}/>
							<Checkbox
								checked={!archived}/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);
	}

	handleArchived = () => {
		const {book: {archived}, onSet} = this.props;
		if(!!archived) {
			onSet('archived', false);
		}
		else {
			onSet('archived', +new Date);
		}
	}

	handleClickAddPosition = (value) => {
		const {book, history: {push}} = this.props;
		Session.set('Book', book);
		Session.set('BookAdd', 'position');
		push(`/position/new?name=${value}`);
	}

	handleClickAddPublisher = (value) => {
		const {book, history: {push}} = this.props;
		Session.set('Book', book);
		Session.set('BookAdd', 'publisher');
		push(`/publisher/new?name=${value}`);
	}

	handleClickAddAuthor = (value) => {
		const {book, history: {push}} = this.props;
		Session.set('Book', book);
		Session.set('BookAdd', 'author');
		let name = value.split(' ');
		let surname = name.length > 1 ? name.pop() : '';
		name = name.join(' ');
		push(`/author/new?name=${name}&surname=${surname}`);
	}

	handleClickAddGenre = (value) => {
		const {book, history: {push}} = this.props;
		Session.set('Book', book);
		Session.set('BookAdd', 'genre');
		push(`/genre/new?name=${value}`);
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withRouter(withStyles(styles)(BookContent));
