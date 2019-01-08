import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function AskBackupImport (props) {
	const {open, onClose, onConfirm} = props;
	return (
		<Dialog
			open={open}
			onClose={onClose}>
			<DialogTitle>Importare il backup?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Se si decide di continuare i dati attualmente in memoria verranno sovrascritti. Si consiglia di creare un backup prima di continuare.
				</DialogContentText>
				<DialogActions>
					<Button
						title="Clicca per annullare questa operazione"
						onClick={onClose}>
						Annulla
					</Button>
					<Button
						title="Clicca per continuare"
						onClick={onConfirm}>
						Continua
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
}
