import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';

export const SuccessButton = withStyles((theme) => ({
	root: {
		color: '#fff',
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
}))(Button);

export const WarningButton = withStyles((theme) => ({
	root: {
		color: theme.palette.warning.contrastText,
		backgroundColor: theme.palette.warning.main,
		'&:hover': {
			backgroundColor: theme.palette.warning.dark,
		},
	},
}))(Button);
