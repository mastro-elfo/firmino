import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Delete from '@material-ui/icons/Delete';

const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

class Content extends Component {
	render(){
		const {classes, book: {isbn, title, description, type, format, mime, language, position, publisher, authors, genres, archived}} = this.props;

		return (
			<Grid container
				justify="space-around"
				className={classes.Main}>
				<Grid item
					{...BREAKPOINTS}>
					<List>
						<ListItem>
							<ListItemText
								primary={isbn}
								secondary="ISBN"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={title}
								secondary="Titolo"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={authors.map(({name, surname})=>`${name} ${surname}`).join(', ')}
								secondary={authors.length > 1 ? 'Autori' : 'Autore'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={description}
								secondary="Descrizione/Trama"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={publisher.name}
								secondary="Editore"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={genres.map(({name}) => name).join(', ')}
								secondary={genres.length === 1 ? 'Genere' : 'Generi'}/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={position.name}
								secondary="Collocazione"/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary={language}
								secondary="Lingua"/>
						</ListItem>
						{
							archived &&
							<ListItem>
								<ListItemText
									primary="Archiviato"/>
								<ListItemIcon>
									<Delete/>
								</ListItemIcon>
							</ListItem>
						}
					</List>
				</Grid>
			</Grid>
		);
	}

	typeToString(type){
		return {
			'book': 'Libro',
			'comic': 'Fumetto',
			'document': 'Fascicolo'
		}[type];
	}

	formatToString(format){
		return {
			'paper': 'Cartaceo',
			'ebook': 'Ebook'
		}[format];
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	}
});

export default withRouter(withStyles(styles)(Content));
