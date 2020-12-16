import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '~/api/auth.js';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(16),
		height: theme.spacing(16),
	},
	value: {
		color: '#b4b4b4',
	},
	input: {
		display: 'none',
	},
	textField: {
		marginTop: 0,
	},
	tab: {
		minHeight: theme.spacing(8),
		'& .MuiTab-wrapper': {
			flexDirection: 'row',
			'& svg': {
				marginRight: '1rem',
				marginBottom: 0,
			},
		},
	},
	modalResult: {
		display: 'none',
		position: 'absolute',
		top: '100px',
		right: '15px',
		boxShadow: '1px 2px 10px #00000038',
	},
	animatedIn: {
		display: 'flex',
		animation: `$show 500ms ${theme.transitions.easing.easeInOut}`,
	},
	'@keyframes show': {
		'0%': {
			opacity: 0,
			top: '-100px',
		},
		'100%': {
			opacity: 1,
			top: '100px',
		},
	},
	animatedOut: {
		animation: `$hide 500ms ${theme.transitions.easing.easeInOut}`,
	},
	'@keyframes hide': {
		'0%': {
			opacity: 1,
			top: '100px',
		},
		'100%': {
			opacity: 0,
			top: '-100px',
		},
	},
}));

const ChangePasswordForm = ({ formData }) => {
	const { dataProfile, updatePass } = useAuth();
	const classes = useStyles();
	const [state, setState] = useState(formData);
	const [resultUpdate, setResultUpdate] = useState(false);
	const [resultError, setResultError] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [empty, setEmpty] = useState(false);

	const router = useRouter();

	// const [passBefore, setPassPresent] = useState('123456');

	const [passForm, setPassForm] = useState({
		OldPass: '',
		NewPass: '',
		ConfirmPass: '',
	});

	function handleChange(evt) {
		const valueInput = evt.target.value;

		setPassForm({
			...passForm,
			[evt.target.name]: valueInput,
		});
	}

	function validationForm(data) {
		let check = false;
		if (data.NewPass === data.ConfirmPass) {
			check = true;
		} else {
			check = false;
		}
		return check;
	}

	const emptyForm = (data) => {
		let check = false;
		if (data.OldPass == '' || data.NewPass == '' || data.ConfirmPass == '') {
			check = true;
		}
		console.log('EMpty: ', check);
		return check;
	};

	const showModalUpdate = (check) => {
		check
			? (setResultUpdate(true),
			  setResultError(false),
			  setEmpty(false),
			  setTimeout(() => {
					setResultUpdate(false);
			  }, 3000))
			: (setResultError(true), setResultUpdate(false));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (!emptyForm(passForm)) {
			if (!validationForm(passForm)) {
				setConfirm(true);
			} else {
				setConfirm(false);
				let check = updatePass(passForm);
				check.then(function (value) {
					showModalUpdate(value);
				});
			}
		} else {
			alert('Điền vào ô trống còn thiếu');
		}
	};

	return (
		<div>
			<Alert
				className={`${classes.modalResult} ${
					resultError ? classes.animatedIn : ''
				}`}
				severity="error"
			>
				<AlertTitle>Mật khẩu nhập lại chưa đúng</AlertTitle>
				Vui lòng nhập lại mật khẩu mới — <strong>check it out!</strong>
			</Alert>

			<Alert
				className={`${classes.modalResult} ${
					resultError ? classes.animatedIn : ''
				}`}
				severity="error"
			>
				<AlertTitle>Mật khẩu hiện tại chưa đúng</AlertTitle>
				Vui lòng nhập lại mật khẩu hiện tại — <strong>check it out!</strong>
			</Alert>

			<Alert
				className={`${classes.modalResult} ${
					resultUpdate ? classes.animatedIn : ''
				}`}
				severity="success"
			>
				<AlertTitle>Thành công</AlertTitle>
				Bạn đã cập nhật mật khẩu thành công — <strong>check it out!</strong>
			</Alert>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2} style={{ maxWidth: 350, margin: '0 auto' }}>
					<Grid item xs={12}>
						<TextField
							error={resultError ? true : false}
							label="Mật khẩu hiện tại"
							name="OldPass"
							defaultValue={passForm.passOld}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							inputProps={{
								type: 'password',
							}}
							onChange={handleChange}
							helperText={resultError ? 'mật khẩu hiện tại chưa đúng' : ''}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Mật khẩu mới"
							name="NewPass"
							defaultValue={passForm.passNew}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							inputProps={{
								type: 'password',
							}}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={confirm ? true : false}
							label="Nhập lại mật khẩu mới"
							name="ConfirmPass"
							defaultValue={passForm.passNewClone}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							inputProps={{
								type: 'password',
							}}
							onChange={handleChange}
							helperText={confirm ? 'mật khẩu nhập lại chưa đúng' : ''}
						/>
					</Grid>
				</Grid>
				<Box align={`center`} mt={2}>
					<Button
						type="submit"
						variant={`contained`}
						startIcon={<Save />}
						color={`primary`}
					>
						Cập nhật mật khẩu
					</Button>
				</Box>
			</form>
		</div>
	);
};

export default ChangePasswordForm;
