import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Save } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

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
}))



const ChangePasswordForm = ({ formData }) => {
	const classes = useStyles()
	const [state, setState] = useState(formData)

	const [passBefore, setPassPresent] = useState("123456");

	const [passForm, setPassForm] = useState({
		passOld:'',
		passNew:'',
		passNewClone:'',
	});

	function handleChange(evt) {
		const valueInput = evt.target.value;

		setPassForm({
			...passForm,
			[evt.target.name]: valueInput,
		});
	}
	
	console.log(passForm);

	function validationForm(data) {
		if(passBefore === data.passOld) {
			if(data.passNew === data.passNewClone) {
				return true;
			}else {
				return alert("Bà mẹ nhập lại mk cũng sai nữa ba");
			}
		} else {
			alert("Mật khậu hiện tại chưa đúng !!!");
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		const checkPass = validationForm(passForm);

		if(checkPass === true ) {
			alert("Mật khẩu cập nhật thành công");
		} 
	}

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2} style={{ maxWidth: 350, margin: '0 auto' }}>
				<Grid item xs={12}>
					<TextField
						label="Mật khẩu hiện tại"
						name = "passOld"
						defaultValue={passForm.passOld}
						className={classes.textField}
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						inputProps={{
							type: 'password',
						}}
						onChange= {handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Mật khẩu mới"
						name = "passNew"
						defaultValue={passForm.passNew}
						className={classes.textField}
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						inputProps={{
							type: 'password',
						}}
						onChange= {handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Nhập lại mật khẩu mới"
						name = 'passNewClone'
						defaultValue={passForm.passNewClone}
						className={classes.textField}
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						inputProps={{
							type: 'password',
						}}
						onChange= {handleChange}
					/>
				</Grid>
			</Grid>
			<Box align={`center`} mt={2}>
				<Button type="submit" variant={`contained`} startIcon={<Save />} color={`primary`}>
					Cập nhật mật khẩu
				</Button>
			</Box>
		</form>
	)
}

export default ChangePasswordForm
