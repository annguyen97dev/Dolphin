import React, { useReducer, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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
import { useAuth } from '~/api/auth.js';

// GET PRO FILE API
import { profileAPI } from '~/api/profileAPI';
const urlAPI = 'https://dolphin.monamedia.net/';

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

	const { isAuthenticated, dataProfile, updateProfile } = useAuth();

	const setActiveTab = (event, value) => {
		dispatch({ type: 'ACTIVE_TAB', payload: value });
	};

	// LOAD DATA PROFILE
	// const loadDataProfile = useCallback(() => {
	// 	console.log('runnn');
	// 	(async () => {
	// 		try {
	// 			const res = await profileAPI();
	// 			res.Code === 1 ? setDataProfile(res.Data) : '';
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, []);

	// const loadDataProfile = useCallback(async () => {
	// 	try {
	// 		const res = await profileAPI();
	// 		res.Code === 1 ? setDataProfile(res.Data) : '';
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	const getFormData = (dataUpdate) => {
		updateProfile(dataUpdate);
	};

	// useEffect(() => {
	// 	loadDataProfile();
	// }, [loadDataProfile]);

	return (
		<Container maxWidth={`lg`}>
			<h1 className={`title-page`}>Profile</h1>
			{dataProfile ? (
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
												src={dataProfile && dataProfile.Avatar}
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
												<Typography className={classes.label} variant={`body1`}>
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
												<Typography className={classes.label} variant={`body1`}>
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
												<Typography className={classes.label} variant={`body1`}>
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
										<ChangeInformationForm getFormData={getFormData} />
									</TabPanel>
									<TabPanel value={state.activeTab} index={1}>
										<ChangePasswordForm />
									</TabPanel>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			) : (
				<Paper>
					<Box p={4}>
						<Grid container>
							<Grid
								item
								xs={12}
								direction="row"
								justify="center"
								alignItems="center"
							>
								<Typography variant="subtitle1" gutterBottom align="center">
									Bạn cần <a href="/auth/login">đăng nhập</a> hoặc{' '}
									<a href="/signup">đăng kí</a> để truy cập profile
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			)}
		</Container>
	);
};
Profile.getLayout = getLayout;
export default Profile;
