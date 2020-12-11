import React, { useState } from 'react';
import Layout from '~/components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { appSettings } from '~/config';
import { LoginAPI } from '~/api/authAPI';
import './login.module.scss';
import { useAuth } from '~/api/auth.js';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const Login = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(null);

	const [stateValues, setStateValues] = React.useState({
		Username: '',
		Password: '',
	});

	const handleChange = (evt) => {
		const valueInput = evt.target.value;

		setStateValues({
			...stateValues,
			[evt.target.name]: valueInput,
		});
	};

	const { handleLogin } = useAuth();
	const handleClick_login = () => {
		handleLogin(stateValues);
	};
	// handle button click of login form
	// const handleLogin = async () => {
	// 	setError(null);
	// 	setLoading(true);

	// 	try {
	// 		const res = await LoginAPI(stateValues);
	// 		setLoading(false);
	// 		if (res.Code === 1) {
	// 			localStorage.setItem('TokenUser', res.Data.account.TokenApp);
	// 			localStorage.setItem('DataUser', JSON.stringify(res.Data.account));
	// 			router.push('/home');
	// 		}
	// 		if (res.Code === 2) {
	// 			res.Code === 2 && setError(res.Message);
	// 		}
	// 	} catch (error) {
	// 		setLoading(false);
	// 		setError('Loi khong ket noi');
	// 		console.log(error);
	// 	}
	// };

	const classes = useStyles();
	return (
		<Layout>
			<div className="login-wrap">
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="standard-basic"
						label="Username"
						name="Username"
						defaultValue={stateValues.Username}
						onChange={handleChange}
					/>
					<TextField
						id="standard-basic"
						label="Password"
						name="Password"
						defaultValue={stateValues.Username}
						onChange={handleChange}
					/>
					{error && (
						<>
							<small style={{ color: 'red' }}>{error}</small>
							<br />
						</>
					)}
					<br />
					<Button
						type="button"
						variant="contained"
						value={loading ? 'Loading...' : 'Đăng nhập'}
						disabled={loading}
						color="secondary"
						onClick={handleClick_login}
					>
						Đăng nhập
					</Button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
