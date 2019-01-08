import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withSnackbar} from 'notistack';

import Button from '@material-ui/core/Button';

import Page from '../Page';
import Header from './Header';
import Content from './Content';
import Drawer from './Drawer';

import {Local, Session} from '../../Utils/Storage';
import Loans from '../../Actions/Loans';

class DashboardView extends Component {
	state = {
		drawerOpen: false
	}

	componentDidMount(){
		this.notifyBackup();
		this.notifyLoans();
	}

	render(){
		return (
			<Page
				Header={Header}
				HeaderProps={{
					onDrawerOpen: this.handleDrawerOpen
				}}
				Content={Content}
				Drawer={Drawer}
				DrawerProps={{
					open: this.state.drawerOpen,
					onClose: this.handleDrawerClose,
					onOpen: this.handleDrawerOpen,
				}}/>
		);
	}

	handleDrawerOpen = () => {
		this.setState({
			drawerOpen: true
		});
	}

	handleDrawerClose = () => {
		this.setState({
			drawerOpen: false
		});
	}

	notifyBackup = () => {
		if(Session.get('NotifyBackup')) {
			return;
		}

		const backupExport = Local.get('BackupExport') || false;
		const now = +new Date;
		if(!backupExport) {
			Local.set('BackupExport', now);
			return;
		}
		else {
			const {backupNotify = 'weekly'} = Local.get('Settings') || {};
			const timeDelta = {
				'weekly': 86400000 *7,
				'monthly': 86400000 *30
			}[backupNotify];
			if(!timeDelta) {
				console.error('Time delta undefined', backupNotify);
				return;
			}
			else if(backupExport +timeDelta < now) {
				const {enqueueSnackbar, history: {push}} = this.props;
				enqueueSnackbar('Esegui il backup dei dati', {
					variant: 'info',
					action: (
						<Button
							color="inherit"
							title="Crea un backup"
							onClick={()=>push('/settings')}>
							Crea
						</Button>
					)
				});
				Session.set('NotifyBackup', now);
			}
		}
	}

	notifyLoans(){
		// if(Session.get('NotifyLoans')) {
		// 	return;
		// }

		const now = +new Date;
		(new Loans).Read()
		.then(loans => {
			const {enqueueSnackbar, history: {push}} = this.props;
			loans.forEach(loan => {
				if(!loan.archived && loan.expire < now) {
					enqueueSnackbar('Prestito scaduto', {
						variant: 'info',
						action: (
							<Button
								color="inherit"
								title="Apri scheda"
								onClick={()=>push(`/loan/view/${loan.id}`)}>
								Apri
							</Button>
						)
					});
				}
			});
			// Session.set('NotifyLoans', true);
		})
		.catch(err => console.error(err));
	}
}

export default withRouter(withSnackbar(DashboardView));
