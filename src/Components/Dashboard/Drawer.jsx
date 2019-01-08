import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import BrokenImage from '@material-ui/icons/BrokenImage';

import Settings from '@material-ui/icons/Settings';
import Info from '@material-ui/icons/Info';
import Person from '@material-ui/icons/Person';
import CompareArrows from '@material-ui/icons/CompareArrows';
import ZoomIn from '@material-ui/icons/ZoomIn';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LocationOn from '@material-ui/icons/LocationOn';
import Copyright from '@material-ui/icons/Copyright';
import Loyalty from '@material-ui/icons/Loyalty';
import Edit from '@material-ui/icons/Edit';
import Help from '@material-ui/icons/Help';

class Drawer extends Component {
	render(){
		const {history: {push}, open, onClose, onOpen} = this.props;
		return (
			<SwipeableDrawer
				open={open}
				onClose={onClose}
				onOpen={onOpen}>
				<List>
					<ListItem
						button
						title="Prestiti"
						onClick={()=>{push('/loans')}}>
						<ListItemIcon>
							<CompareArrows/>
						</ListItemIcon>
						<ListItemText
							primary="Prestiti"/>
					</ListItem>
					<ListItem
						button
						title="Libri"
						onClick={()=>{push('/books')}}>
						<ListItemIcon>
							<LibraryBooks/>
						</ListItemIcon>
						<ListItemText
							primary="Libri"/>
					</ListItem>
					<ListItem
						button
						title="Autori"
						onClick={()=>{push('/authors')}}>
						<ListItemIcon>
							<Edit/>
						</ListItemIcon>
						<ListItemText
							primary="Autori"/>
					</ListItem>
					<ListItem
						button
						title="Editori"
						onClick={()=>{push('/publishers')}}>
						<ListItemIcon>
							<Copyright/>
						</ListItemIcon>
						<ListItemText
							primary="Editori"/>
					</ListItem>
					<ListItem
						button
						title="Collocazioni"
						onClick={()=>{push('/positions')}}>
						<ListItemIcon>
							<LocationOn/>
						</ListItemIcon>
						<ListItemText
							primary="Collocazioni"/>
					</ListItem>
					<ListItem
						button
						title="Generi"
						onClick={()=>{push('/genres')}}>
						<ListItemIcon>
							<Loyalty/>
						</ListItemIcon>
						<ListItemText
							primary="Generi"/>
					</ListItem>
					<ListItem
						button
						title="Utenti"
						onClick={()=>{push('/users')}}>
						<ListItemIcon>
							<Person/>
						</ListItemIcon>
						<ListItemText
							primary="Utenti"/>
					</ListItem>
					<Divider/>
					<ListItem
						button
						title="Impostazioni generali"
						onClick={()=>{push('/settings')}}>
						<ListItemIcon>
							<Settings/>
						</ListItemIcon>
						<ListItemText
							primary="Impostazioni"/>
					</ListItem>
					<ListItem
						button
						title="Informazioni sull'applicazione"
						onClick={()=>{push('/info')}}>
						<ListItemIcon>
							<Info/>
						</ListItemIcon>
						<ListItemText
							primary="Info"/>
					</ListItem>
					{
						// <ListItem
						// 	button
						// 	title="Aiuto"
						// 	onClick={()=>{push('/help')}}>
						// 	<ListItemIcon>
						// 		<Help/>
						// 	</ListItemIcon>
						// 	<ListItemText
						// 		primary="Help"/>
						// </ListItem>
					}
				</List>
			</SwipeableDrawer>
		);
	}
}

export default withRouter(Drawer);
