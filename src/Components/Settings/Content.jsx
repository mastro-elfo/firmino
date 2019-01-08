import React, {Component, Fragment} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';

import {withSnackbar} from 'notistack';
import {prefix} from 'prefix-si';
import {Stats as BackupSize, Create as BackupExport, Read as BackupImport} from '../../Actions/Backup';
import {Local} from '../../Utils/Storage';
import AskBackupImport from './AskBackupImport';
import {remote} from 'electron';
import {homedir} from 'os';
import {join} from 'path';

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Check from '@material-ui/icons/Check';


const BREAKPOINTS = {
	xs: 12, sm: 8, md: 6, lg: 4, xl: 3
};

const COLORS = {red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange};

class Content extends Component {
	state = {
		searchResultLimit: 5,
		backupNotify: 'weekly',
		keepArchived: 'week',
		primaryColor: 'blue',
		secondaryColor: 'orange',
		backupSize: 0,
		backupExport: false,
		backupImport: false,
		backupAskImport: false
	}

	componentDidMount(){
		this.evalStorage();
		this.evalBackupSize();
	}

	componentWillUnmount(){
		clearTimeout(this.themeUpdateTO);
	}

	componentDidUpdate(prevProps, prevState){
		// Assign state
		let state = Object.assign({}, this.state);

		state = Object.keys(state)
			// Filter keys
			.filter(key => ['searchResultLimit', 'backupNotify', 'keepArchived', 'primaryColor', 'secondaryColor'].indexOf(key) !== -1)
			// Reduce to object
			.reduce((obj, key) => {
				obj[key] = state[key];
				return obj;
			}, {});
		// Save local storage
		Local.set('Settings', state);
		this.updateThemeColors(prevState);
	}

	render(){
		const {classes, theme} = this.props;
		const {searchResultLimit, backupNotify, keepArchived, primaryColor, secondaryColor, backupSize, backupExport, backupImport, backupAskImport} = this.state;

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
								label="Risultati di ricerca"
								type="number"
								inputProps={{
									min: 1
								}}
								value={searchResultLimit}
								onChange={this.handleChange('searchResultLimit')}/>
						</ListItem>
						<ListItem
							button
							onClick={this.handleExportBackup}
							disabled={backupExport}>
							<ListItemIcon>
								<Fragment>
									<CloudDownload/>
									{
										backupExport &&
										<CircularProgress
											size={32}
											className={classes.Absolute}/>
									}
								</Fragment>
							</ListItemIcon>
							<ListItemText
								primary="Esporta Backup"
								secondary={prefix(backupSize, 'B')}/>
						</ListItem>
						<ListItem
							button
							onClick={this.handleAskImport}
							disabled={backupImport}>
							<ListItemIcon>
								<Fragment>
									<CloudUpload/>
									{
										backupImport &&
										<CircularProgress
											size={32}
											className={classes.Absolute}/>
									}
								</Fragment>
							</ListItemIcon>
							<ListItemText
								primary="Importa Backup"/>
						</ListItem>
						<ListItem>
							<TextField
								select fullWidth
								label="Avviso backup"
								value={backupNotify}
								onChange={this.handleChange('backupNotify')}>
								<MenuItem value="weekly">Settimanale</MenuItem>
								<MenuItem value="monthly">Mensile</MenuItem>
							</TextField>
						</ListItem>
						<ListItem>
							<TextField
								select fullWidth
								label="Maintieni schede archiviate"
								value={keepArchived}
								onChange={this.handleChange('keepArchived')}>
								<MenuItem value="day">Un giorno</MenuItem>
								<MenuItem value="week">Una settimana</MenuItem>
								<MenuItem value="month">Un mese</MenuItem>
								<MenuItem value="year">Un anno</MenuItem>
								<MenuItem value="forever">Per sempre</MenuItem>
							</TextField>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Colore principale"/>
						</ListItem>
						<ListItem>
							<ToggleButtonGroup
								selected={false}
								value={primaryColor}
								onChange={this.handleChange('primaryColor')}
								className={classes.ToggleButtonGroup}>
								{
									Object.keys(COLORS).map(color => (
										<ToggleButton
											key={color}
											selected={false}
											title={color}
											value={color}
											style={{
												backgroundColor: COLORS[color][500],
												color: theme.palette.getContrastText(COLORS[color][500])
											}}>
											{
												primaryColor === color ? <Check/> : <span/>
											}
										</ToggleButton>
									))
								}
							</ToggleButtonGroup>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Colore secondario"/>
						</ListItem>
						<ListItem>
							<ToggleButtonGroup
								selected={false}
								value={secondaryColor}
								onChange={this.handleChange('secondaryColor')}
								className={classes.ToggleButtonGroup}>
								{
									Object.keys(COLORS).map(color => (
										<ToggleButton
											key={color}
											selected={false}
											title={color}
											value={color}
											style={{
												backgroundColor: COLORS[color]['A400'],
												color: theme.palette.getContrastText(COLORS[color]['A400'])
											}}>
											{
												secondaryColor === color ? <Check/> : <span/>
											}
										</ToggleButton>
									))
								}
							</ToggleButtonGroup>
						</ListItem>
					</List>
				</Grid>
				<AskBackupImport
					open={backupAskImport}
					onClose={this.handleCancelAskImport}
					onConfirm={this.handleConfirmAskImport}/>
			</Grid>
		);
	}

	evalStorage = () => {
		const {...state} = Local.get('Settings') || {};
		this.setState({
			...state
		});
	}

	evalBackupSize = () => {
		this.setState({
			backupSize: BackupSize().reduce((sum, {size}) => sum +size, 0)
		});
	}

	updateThemeColors = prevState => {
		const {theme: {__update}} = this.props;
		const {primaryColor, secondaryColor} = this.state;
		if(prevState.primaryColor !== primaryColor || prevState.secondaryColor !== secondaryColor) {
			clearTimeout(this.themeUpdateTO);
			this.themeUpdateTO = setTimeout(()=>{
				__update(primaryColor, secondaryColor);
			}, 0);
		}
	}

	handleChange = field => ({target: {value}}) => {
		this.setState({
			[field]: value
		});
	}

	handleExportBackup = () => {
		this.setState({backupExport: true});
		remote.dialog.showSaveDialog({
			properties: ['openFile', 'promptToCreate', 'createDirectory'],
			title: 'Seleziona un file',
			defaultPath: join(homedir(), 'firmino.backup')
		}, (filename) => {
			if(filename) {
				const {enqueueSnackbar} = this.props;
				BackupExport(filename)
				.then(() => {
					console.info('Backup exported');
					enqueueSnackbar('Backup esportato', {
						variant: 'success'
					});
					Local.set('BackupExport', +new Date);
					this.setState({backupExport: false});
				})
				.catch(err => {
					console.error('Error creating backup', err);
					enqueueSnackbar('Errore, backup non esportato', {
						variant: 'error'
					});
					this.setState({backupExport: false});
				});
			}
			else {
				// User canceled
				this.setState({backupExport: false});
			}
		});
	}

	handleAskImport = () => {
		this.setState({backupAskImport: true});
	}

	handleCancelAskImport = () => {
		this.setState({backupAskImport: false});
	}

	handleConfirmAskImport = () => {
		this.setState({backupAskImport: false});
		this.handleImportBackup();
	}

	handleImportBackup = () => {
		this.setState({backupImport: true});
		remote.dialog.showOpenDialog({
			properties: ['openFile'],
			title: 'Seleziona un file',
			defaultPath: homedir()
		}, (filepaths) => {
			if(filepaths && filepaths.length) {
				const {enqueueSnackbar} = this.props;
				BackupImport(filepaths[0])
				.then(() => {
					console.info('Backup imported');
					this.setState({backupImport: false});
					enqueueSnackbar('Backup importato', {
						variant: 'success'
					});
					this.evalBackupSize();
				})
				.catch(err => {
					console.error('Error importing backup', err);
					enqueueSnackbar('Errore, backup non importato', {
						variant: 'error'
					});
					this.setState({backupImport: false});
				});
			}
			else {
				// User canceled
				this.setState({backupImport: false});
			}
		});
	}
}

const styles = theme => ({
	Main: {
		padding: theme.spacing.unit
	},
	ToggleButtonGroup: {
		width: 8 *48,
		margin: 'auto'
	},
	Absolute: {
		position: 'absolute',
		marginLeft: -4, marginTop: -4
	}
});

export default withSnackbar(withStyles(styles, {withTheme: true})(Content));
