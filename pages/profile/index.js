import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { getLayout } from '~/components/Layout';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
	Business,
	Email,
	PermContactCalendar,
	Phone,
	Save,
	VpnKey,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { a11yProps } from '~/page-components/CourseDetail/WhiteTabs';
import ChangeInformationForm from '~/page-components/Profile/ChangeInformationForm';
import ChangePasswordForm from '~/page-components/Profile/ChangePasswordForm';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '~/api/auth.js';
import { useRouter } from 'next/router';
import { appSettings } from '~/config';
import { profileAPI } from '~/api/profileAPI';

const linkImg = appSettings.link;

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
	styleBold: {
		margin: '0',
		marginRight: '10px',
	},
	rowInfo: {
		display: 'flex',
		alignItems: 'center',
	},
	modalResult: {
		display: 'none',
		position: 'fixed',
		top: '40px',
		right: '15px',
		boxShadow: '1px 2px 10px #00000038',
		zIndex: '999',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			right: 'auto',
			left: '50%',
			transform: 'translateX(-50%)',
		},
	},
	animatedIn: {
		animation: `$show 500ms ${theme.transitions.easing.easeInOut}`,
		display: 'flex',
	},
	'@keyframes show': {
		'0%': {
			opacity: 0,
			top: '-50px',
		},
		'100%': {
			opacity: 1,
			top: '40px',
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

const initialState = {
	isLoading: true,
	userData: null,
	activeTab: 0,
};

const reducer = (prevState, { type, payload }) => {
	switch (type) {
		case 'ACTIVE_TAB':
			return {
				...prevState,
				activeTab: payload,
			};
		default:
			return prevState;
	}
};

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box style={{ overflow: 'auto' }} p={2} flexGrow={1}>
					<Paper elevation={0}>
						<Box p={2}>{children}</Box>
					</Paper>
				</Box>
			)}
		</Box>
	);
};

//FAKE DATA USER
// const fakeUser = {
// 	user1: {
// 		url:
// 			'https://static.yeah1music.net/uploads/editors/33/2019/04/12/5caf8d5b2113f.png',
// 		name: 'Huỳnh Thị Phương Anh',
// 		chucvu: 'nhân viên kinh doanh',
// 		bophan: 'kinh doanh',
// 		chinhanh: '231 nguyễn văn cừ',
// 		phone: '0123456789',
// 		email: 'gaixinh123@gmail.com',
// 	},
// };

const Profile = () => {
	const classes = useStyles();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [resultUpdate, setResultUpdate] = useState(false);
	const [resultError, setResultError] = useState(false);
	const { updateProfile } = useAuth();
	const [dataProfile, setDataProfile] = useState();
	const [checkUpdate, setCheckUpdate] = useState(false);
	const router = useRouter();

	const setActiveTab = (event, value) => {
		dispatch({ type: 'ACTIVE_TAB', payload: value });
	};

	const { isAuthenticated, changeIsAuth, loadDataProfile } = useAuth();
	const [checkToken, setCheckToken] = useState();

	const token = isAuthenticated.token;

	const changeCheckUpdate = () => {
		setCheckUpdate(false);
	};

	useEffect(() => {
		if (localStorage.getItem('TokenUser') === null) {
			router.push({
				pathname: '/auth/login',
			});
		} else {
			if (checkToken === 0) {
				changeIsAuth();
			}
		}
	}, [checkToken]);

	useEffect(() => {
		// LOAD DATA PROFILE
		(async () => {
			try {
				const res = await profileAPI(token);
				res.Code === 1 ? setDataProfile(res.Data) : '';
				res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [isAuthenticated.isLogin]);

	const loadDataProfileHere = useCallback(() => {
		(async () => {
			try {
				const res = await profileAPI(token);
				res.Code === 1 ? setDataProfile(res.Data) : '';
				res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [isAuthenticated.isLogin]);

	// const loadDataProfileHere = useCallback(async () => {
	// 	try {
	// 		const res = await profileAPI();
	// 		res.Code === 1 ? setDataProfile(res.Data) : '';
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	// const showModalUpdate = (check) => {
	// 	!check ? setResultError(true) : setResultUpdate(true);
	// 	setTimeout(() => {
	// 		!check ? setResultError(false) : setResultUpdate(false);
	// 		router.push('/profile');
	// 		loadDataProfileHere();
	// 		loadDataProfile();
	// 	}, 3000);
	// };

	const getFormData = (dataUpdate) => {
		console.log('Data Update: ', dataUpdate);
		let check = updateProfile(dataUpdate);
		let checkLast = false;
		check.then(function (value) {
			// showModalUpdate(value);
			if (value) {
				router.push('/profile');
				loadDataProfileHere();
				loadDataProfile();
				setCheckUpdate(true);
			}
		});
	};

	// useEffect(() => {
	// 	showModalUpdate(check);
	// }, [resultUpdate]);

	return (
		<Container maxWidth={`lg`}>
			<Alert
				className={`${classes.modalResult} ${
					resultError ? classes.animatedIn : ''
				}`}
				severity="error"
			>
				<AlertTitle>Lỗi cập nhật</AlertTitle>
				Cập nhật không thành công — <strong>check it out!</strong>
			</Alert>
			<Alert
				className={`${classes.modalResult} ${
					resultUpdate ? classes.animatedIn : ''
				}`}
				severity="success"
			>
				<AlertTitle>Thành công</AlertTitle>
				Bạn đã cập nhật tài khoản thành công — <strong>check it out!</strong>
			</Alert>

			<h1 className={`title-page`}>Profile</h1>
			{
				dataProfile && (
					<Box>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								sm={12}
								md={4}
								className={classes.sidebar}
								style={{ marginBottom: '30px' }}
							>
								<Paper>
									<Box p={4}>
										<Box mb={4} align={`center`}>
											<Box mb={2}>
												<Avatar
													src={`${linkImg}${dataProfile?.Avatar}`}
													variant={`rounded`}
													className={classes.avatar}
												/>
											</Box>

											<Typography variant={`h6`} component={`div`}>
												{dataProfile && dataProfile.FullName}
											</Typography>
											<Typography variant={`body2`}>
												{dataProfile && dataProfile.Position}
											</Typography>
										</Box>
										<Box>
											<Box
												display={`flex`}
												alignItems={`center`}
												justifyContent={`space-between`}
												mb={2}
											>
												<Box display={`flex`}>
													<Phone style={{ marginRight: '0.5rem' }} />
													<Typography
														className={classes.label}
														variant={`body1`}
													>
														Điện thoại:
													</Typography>
												</Box>

												<Typography className={classes.value} variant={`body1`}>
													{dataProfile && dataProfile.Phone}
												</Typography>
											</Box>
											<Box
												display={`flex`}
												alignItems={`center`}
												justifyContent={`space-between`}
												mb={2}
											>
												<Box display={`flex`}>
													<Email style={{ marginRight: '0.5rem' }} />
													<Typography
														className={classes.label}
														variant={`body1`}
													>
														Email
													</Typography>
												</Box>

												<Typography className={classes.value} variant={`body1`}>
													{dataProfile && dataProfile.Email}
												</Typography>
											</Box>
											<Box
												display={`flex`}
												alignItems={`center`}
												justifyContent={`space-between`}
											>
												<Box display={`flex`}>
													<Business style={{ marginRight: '0.5rem' }} />
													<Typography
														className={classes.label}
														variant={`body1`}
													>
														Địa chỉ
													</Typography>
												</Box>

												<Typography className={classes.value} variant={`body1`}>
													{dataProfile && dataProfile.Address}
												</Typography>
											</Box>
										</Box>
									</Box>
								</Paper>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={8}
								flexGrow={1}
								style={{ marginBottom: '30px' }}
							>
								<Paper>
									<Box>
										<Paper
											square
											elevation={0}
											style={{ borderBottom: '1px solid #e1e1e1' }}
										>
											<Tabs
												value={state.activeTab}
												indicatorColor="primary"
												textColor="primary"
												onChange={setActiveTab}
												aria-label="tab"
											>
												<Tab
													label="Thay đổi thông tin"
													icon={<PermContactCalendar />}
													className={classes.tab}
													{...a11yProps(0)}
												/>
												<Tab
													label="Thay đổi mật khẩu"
													icon={<VpnKey />}
													className={classes.tab}
													{...a11yProps(1)}
												/>
											</Tabs>
										</Paper>
										<TabPanel value={state.activeTab} index={0}>
											<ChangeInformationForm
												getFormData={getFormData}
												checkUpdate={checkUpdate}
												changeCheckUpdate={changeCheckUpdate}
											/>
										</TabPanel>
										<TabPanel value={state.activeTab} index={1}>
											<ChangePasswordForm />
										</TabPanel>
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				)
				// 	<Paper>
				// 	<Box p={4}>
				// 		<Grid container>
				// 			<Grid
				// 				item
				// 				xs={12}
				// 				direction="row"
				// 				justify="center"
				// 				alignItems="center"
				// 			>
				// 				<Typography variant="subtitle1" gutterBottom align="center">
				// 					Bạn cần <a href="/auth/login">đăng nhập</a> hoặc{' '}
				// 					<a href="/signup">đăng kí</a> để truy cập profile
				// 				</Typography>
				// 			</Grid>
				// 		</Grid>
				// 	</Box>
				// </Paper>
			}
		</Container>
	);
};
Profile.getLayout = getLayout;
export default Profile;
