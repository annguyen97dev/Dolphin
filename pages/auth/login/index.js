import React, { useState } from 'react';
import Layout from '~/components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { appSettings } from '~/config';
import { LoginAPI } from '~/api/authAPI';
import { Alert, AlertTitle } from '@material-ui/lab';
import styles from './login.module.css';
import { useAuth } from '~/api/auth.js';
import { Translate } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	styleInput: {
		width: '100%',
		display: 'block',
		marginBottom: '10px',
		'& > div': {
			width: '100%',
		},
	},
	formLogin: {
		width: '60%',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
	boxBtn: {
		textAlign: 'center',
		width: '100%',
	},
	btnLogin: {
		width: '100%',
	},
	modalResult: {
		display: 'none',
		position: 'fixed',
		top: '100px',
		right: '15px',
		boxShadow: '1px 2px 10px #00000038',
		zIndex: '999',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			left: '50%',
			transform: 'translateX(-50%)',
			top: '0px',
			borderRadius: '0',
		},
	},
	animatedIn: {
		animation: `$show 500ms ${theme.transitions.easing.easeInOut}`,
		display: 'flex',
	},
	'@keyframes show': {
		'0%': {
			opacity: 0,
			top: '-20px',
		},
		'100%': {
			opacity: 1,
			top: '100px',
		},
		[theme.breakpoints.down('sm')]: {
			'@keyframes show': {
				'0%': {
					opacity: 0,
					top: '-20px',
				},
				'100%': {
					opacity: 1,
					top: '0px',
				},
			},
		},
	},

	boxError: {
		marginTop: '15px',
		textAlign: 'center',
		color: 'red',
		fontWeight: '600',
		[theme.breakpoints.down('sm')]: {
			fontSize: '13px',
		},
	},

	styleLoading: {
		width: '30px!important',
		height: '30px!important',
		position: 'absoulte!important',
		top: '20px!important',
		right: '20px!important',
	},
	textSuccses: {
		color: 'green',
		fontWeight: '600',
		textAlign: 'center',
	},
}));

const Login = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState({
		status: false,
		message: '',
	});

	const [error, setError] = useState(null);
	const [resultError, setResultError] = useState({
		status: false,
		message: '',
	});
	const [stateValues, setStateValues] = React.useState({
		username: '',
		password: '',
	});

	console.log('resultError: ', resultError);

	const handleChange = (evt) => {
		const valueInput = evt.target.value;

		if (resultError) {
			setResultError({
				...resultError,
				status: false,
			});
		}

		setStateValues({
			...stateValues,
			[evt.target.name]: valueInput,
		});
	};

	const { handleLogin } = useAuth();
	const handleClick_login = () => {
		setLoading(true);

		let check = handleLogin(stateValues);
		check.then(function (value) {
			if (!value.status && value.status !== null) {
				setTimeout(() => {
					setLoading(false);
					setResultError({
						status: true,
						message: value.message,
					});
				}, 2000);
			} else {
				setLoginSuccess({
					status: true,
					message: value.message,
				});
			}
		});
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
			<div className={styles.loginWrap}>
				<div className={styles.container}>
					{loading && (
						<CircularProgress
							className={classes.styleLoading}
							style={{ position: 'absolute' }}
						/>
					)}
					<h2 className={styles.titleForm}>Đăng nhập</h2>

					{loginSuccess.status ? (
						<h3 className={classes.textSuccses}>{loginSuccess.message}</h3>
					) : (
						<div className="boxForm">
							<form className={classes.formLogin} noValidate autoComplete="off">
								<TextField
									error={resultError.status && true}
									id="standard-basic"
									label="Username"
									name="username"
									className={classes.styleInput}
									defaultValue={stateValues.Username}
									onChange={handleChange}
								/>
								<TextField
									error={resultError.status && true}
									type="password"
									id="standard-basic"
									label="Password"
									name="password"
									className={classes.styleInput}
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
								<div className={classes.boxBtn}>
									<Button
										type="button"
										variant="contained"
										value={loading ? 'Loading...' : 'Đăng nhập'}
										disabled={loading}
										color="primary"
										className={classes.btnLogin}
										onClick={handleClick_login}
									>
										Đăng nhập
									</Button>
								</div>
								{resultError.status && (
									<div className={classes.boxError}>
										<span className={classes.textError}>
											{resultError.message}
										</span>
									</div>
								)}
							</form>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Login;
