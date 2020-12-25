import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DataUsageTwoTone, Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useAuth } from '~/api/auth.js';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(16),
		height: theme.spacing(16),
	},
	value: {
		color: '#b4b4b4',
	},
	// input: {
	// 	display: 'none',
	// },
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
	style_select: {
		width: '100%',
		'& > div': {
			paddingTop: '10.5px',
			paddingBottom: '10.5px',
		},
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
	formControl: {
		marginTop: '0',
		minWidth: '100%',
	},
	modalResult: {
		display: 'none',
		position: 'absolute',
		top: '100px',
		right: '15px',
		boxShadow: '1px 2px 10px #00000038',
	},
	animatedIn: {
		animation: `$show 500ms ${theme.transitions.easing.easeInOut}`,
		display: 'flex',
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
		display: 'flex',
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

const ChangeInformationForm = ({ getFormData }) => {
	const classes = useStyles();
	// const [state, setState] = useState(formData);
	const { updateImg } = useAuth();
	const [resultError, setResultError] = useState(false);
	const [checkImg, setCheckImg] = useState(false);

	const [values, setValue] = React.useState({
		Avatar: '',
		FullName: '',
		Phone: '',
		Email: '',
		Gender: '',
		Address: '',
		// Position: '',
	});

	const [file, setFile] = useState(null);

	// function changeImg(event) {
	// 	setFile(URL.createObjectURL(event.target.files[0]));
	// }

	function handleChange(evt) {
		const valueInput = evt.target.value;

		if (evt.target.name == 'Avatar') {
			let checkUpdataImg = updateImg(evt.target.files[0]);
			checkUpdataImg.then(function (value) {
				!value ? alert('upload không thành công') : setCheckImg(true);
			});

			setValue({
				...values,
				[evt.target.name]: URL.createObjectURL(evt.target.files[0]),
			});
		} else {
			setValue({
				...values,
				[evt.target.name]: valueInput,
			});
		}
	}

	const handleChange_getGender = (event) => {
		setValue({ ...values, Gender: event.target.value });
	};

	function submitForm(event) {
		event.preventDefault();
		if (
			values.fullname == '' ||
			values.gender == '' ||
			values.phone == '' ||
			values.email == '' ||
			values.address == '' ||
			values.Avatar == ''
		) {
			setResultError(true);
			setTimeout(() => {
				setResultError(false);
			}, 3000);
		} else {
			getFormData(values);
		}
	}

	return (
		<div>
			<Alert
				className={`${classes.modalResult} ${
					resultError ? classes.animatedIn : ''
				}`}
				severity="error"
			>
				<AlertTitle>Lỗi cập nhật</AlertTitle>
				Bạn chưa điền hết các ô trống — <strong>check it out!</strong>
			</Alert>
			<form onSubmit={submitForm}>
				<Box align={`center`} mb={4}>
					<div className="avatar-upload">
						<div className="avatar-edit">
							<input
								name="Avatar"
								onChange={handleChange}
								type="file"
								id="imageUpload"
								accept=".png, .jpg, .jpeg"
							/>
							<label htmlFor="imageUpload" />
							<Icon className="icon-addAvatar">add_circle</Icon>
						</div>
						<div className="avatar-preview">
							<div
								id="imagePreview"
								style={
									checkImg ? { backgroundImage: `url(${values.Avatar})` } : {}
								}
							></div>
						</div>
					</div>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<TextField
							label="Họ và tên"
							name="FullName"
							defaultValue={values.FullName}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							onChange={handleChange}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={12} md={6} lg={6}>
					<TextField
						label="Giới tính"
						name="Gender"
						defaultValue={values.Gender}
						className={classes.textField}
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</Grid> */}
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel
								id="demo-simple-select-outlined-label"
								style={{ top: '-7px' }}
							>
								Giới tính
							</InputLabel>

							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select"
								value={values.Gender}
								className={classes.style_select}
								onChange={handleChange_getGender}
								label="Giới tính"
							>
								<MenuItem value={1}>Nam</MenuItem>
								<MenuItem value={2}>Nữ</MenuItem>
								<MenuItem value={3}>Không xác định</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6}>
						<TextField
							label="Số điện thoại"
							name="Phone"
							defaultValue={values.Phone}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<TextField
							label="Email"
							name="Email"
							defaultValue={values.Email}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<TextField
							label="Địa chỉ"
							name="Address"
							defaultValue={values.Address}
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							size="small"
							onChange={handleChange}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={12} md={6} lg={6}>
					<TextField
						label="Bộ phận"
						name="Position"
						defaultValue={values.Position}
						className={classes.textField}
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</Grid> */}
				</Grid>
				<Box align={`center`} mt={4}>
					<Button
						type="submit"
						variant={`contained`}
						startIcon={<Save />}
						color={`primary`}
					>
						Cập nhật thông tin
					</Button>
				</Box>
			</form>
		</div>
	);
};

export default ChangeInformationForm;
