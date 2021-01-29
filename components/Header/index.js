import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Box,
	Container,
	Avatar,
	Typography,
	Menu,
	Fade,
} from '@material-ui/core';
import styles from './header.module.scss';
import {
	Notifications,
	ArrowDropDown,
	Menu as MenuIcon,
	AccountCircle,
	ExitToApp,
} from '@material-ui/icons';
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { colors } from '~/config';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { notificationAPI } from '~/api/notificationAPI';
import { notificationDetailAPI } from '~/api/notificationAPI';
import { notificationStatusAPI } from '~/api/notificationAPI';
import { LogoutAPI } from '~/api/authAPI';
import { route } from 'next/dist/next-server/server/router';
import { useAuth } from '~/api/auth.js';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { appSettings } from '~/config';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

const linkImg = appSettings.link;
const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	activeMenu: {
		'& > a ': {
			position: 'relative',
		},
		'&:after': {
			content: '',
			position: 'absolute',
			width: '100%',
			height: 1,
			backgroundColor: colors.secondary,
			bottom: '-10px',
			left: 0,
		},
	},
	dropdown: {
		boxShadow: '0px 4px 10px 0px rgba(0,0,0,.15)',
		zIndex: 9999,
	},
	headerContainer: {
		backgroundColor: '#fff',
		boxShadow: '0px 4px 8px 0px rgba(0,0,0,.15)',
		zIndex: 9,
	},
	divider: {
		marginRight: '1.25rem !important',
		alignSelf: 'auto',
	},
	widthNoti: {
		maxWidth: '400px',
	},
	inline: {
		display: 'inline-block',
		width: 'auto',
	},
	listNoti: {
		paddingTop: '0',
		paddingBottom: '0',
	},
	modal: {
		minWidth: '500px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			minWidth: '100%',
		},
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		border: 'none',
		borderRadius: '3px',
		width: '550px',
		'&:focus': {
			outline: 'none',
			border: 'none',
		},
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
	boxBtn: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10px',
	},
	textModal: {
		textAlign: 'center',
		fontSize: '18px',
		fontWeight: '500',
		marginTop: '10px',
		background: '#e1f7ff',
		padding: '7px 12px',
	},
	contentModal: {
		marginBottom: '0',
		marginTop: '10px',
		fontSize: '16px',
	},
	boxBtn: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10px',
	},
	closeModalIcon: {
		opacity: 0.3,
		transition: '0.3s',
		'&:hover': {
			opacity: 1,
			transition: '0.3s',
		},
	},
	actionBtn: {
		fontSize: '12px',
		textTransform: 'normal',
		margin: '0 5px',
	},
	textWatch: {
		fontSize: '12px',
		marginTop: '5px',
		textDecoration: 'underline',
		color: '#1098fe',
		opacity: '0.7',
		cursor: 'point',
		transition: '0.3s',
		'&:hover': {
			opacity: '1',
			transition: '0.3s',
		},
	},
	loadingModal: {
		width: '50%',
	},
	customNoti: {
		'& > div.MuiMenu-paper': {
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				left: '50%!important',
				transform: 'translateX(-50%)!important',
			},
		},
	},
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const DropDownMenu = (props) => {
	return (
		<Menu
			elevation={3}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	);
};

export const ShowUser = ({ dataUser, logoutAccount }) => {
	const [userMenuEl, setUserMenuEl] = useState(null);
	const classes = useStyles();

	const closeUserMenu = (event) => {
		setUserMenuEl(null);
	};

	const showUserMenu = (event) => {
		setUserMenuEl(event.currentTarget);
	};

	return (
		<div>
			<Box display="flex" onClick={showUserMenu} className={styles.link}>
				<Avatar alt="Remy Sharp" src={`${linkImg}${dataUser?.Avatar}`} />
				<Box display="flex" alignItems="center" ml={1}>
					<Hidden xsDown>
						<Typography>{dataUser.FullName}</Typography>
					</Hidden>
					<ArrowDropDown />
				</Box>
			</Box>
			<DropDownMenu
				id="user-information"
				anchorEl={userMenuEl}
				keepMounted
				open={Boolean(userMenuEl)}
				onClose={closeUserMenu}
				TransitionComponent={Fade}
				className={`${classes.dropdown} dropdown-angle`}
			>
				<Box px={2}>
					<List component="nav" aria-label="account profile">
						<Link href={`/profile`} as={`/profile`} passHref>
							<ListItem button onClick={() => setUserMenuEl(false)}>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>

								<ListItemText primary="Thông tin tài khoản" />
							</ListItem>
						</Link>

						<ListItem button>
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary="Đăng xuất" onClick={logoutAccount} />
						</ListItem>
					</List>
				</Box>
			</DropDownMenu>
		</div>
	);
};

const Header = () => {
	const [notiEl, setNotiEl] = useState(null);

	const [menuMobileShow, setMenuMobileShow] = useState(false);
	const [dataNotification, setDataNotification] = useState();
	const [dataNotificationDetail, setDataNotificationDetail] = useState();
	const [isAuth, setIsAuth] = useState();

	const {
		isAuthenticated,
		dataUser,
		handleLogout,
		dataProfile,
		changeIsAuth,
	} = useAuth();

	const [checkToken, setCheckToken] = useState();

	// const token = isAuthenticated.token;

	const [open, setOpen] = useState(false);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClick_removeAllItems = (event) => {
		let notiID = parseInt(
			event.currentTarget.parentElement.getAttribute('data-id'),
		);
		let countClone = count;
		let type = 2;
		// Get notification Detail API
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			(async () => {
				try {
					const res = await notificationStatusAPI(token, type, notiID);
					res.Code === 1 && (countClone++, setCount(countClone));
					res.Code === 0 && setCheckToken(res.Code);
				} catch (error) {
					console.log(error);
				}
			})();
		}
	};

	const handleCLick_closeItem = (event) => {
		let notiID = parseInt(
			event.currentTarget.parentElement.getAttribute('data-id'),
		);
		let countClone = count;
		let type = 1;
		// Get notification Detail API
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			(async () => {
				try {
					const res = await notificationStatusAPI(token, type, notiID);
					res.Code === 1 && (countClone++, setCount(countClone));
					res.Code === 0 && setCheckToken(res.Code);
				} catch (error) {
					console.log(error);
				}
			})();
		}
	};

	const handleClick_openModal = (event) => {
		setOpen(true);

		let notiID = parseInt(
			event.currentTarget.parentElement.getAttribute('data-id'),
		);
		// Get notification Detail API
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			(async () => {
				try {
					setLoading(false);
					const res = await notificationDetailAPI(token, notiID);
					res.Code === 1 && setDataNotificationDetail(res.Data);
					res.Code === 0 && setCheckToken(res.Code);
				} catch (error) {
					console.log(error);
				}
			})();
		}
	};

	const handleClick_logout = () => {
		handleLogout();
	};

	const router = useRouter();

	const showNotification = (event) => {
		setNotiEl(event.currentTarget);
	};
	const closeNotification = (event) => {
		setNotiEl(null);
	};

	const toggleMenuMobile = () => {
		setMenuMobileShow(!menuMobileShow);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		router.push('/auth/login');
	};

	// const handleLogOut = async () => {
	// 	try {
	// 		const res = await LogoutAPI(isAuthenticated.data.TokenApp);
	// 		if (res.Code === 1) {
	// 			setisAuthenticated({
	// 				isLogin: false,
	// 			});

	// 			localStorage.clear();
	// 			router.push('/home');
	// 		}
	// 	} catch (error) {
	// 		alert('Lỗi không đăng xuất được');
	// 	}
	// };

	const classes = useStyles();

	useEffect(() => {
		if (localStorage.getItem('TokenUser') === null) {
			router.push({
				pathname: '/auth/login',
			});
		} else {
			if (checkToken === 0) {
				changeIsAuth();
				console.log('chạy trong profile');
				router.push({
					pathname: '/auth/login',
				});
			}
		}
	}, [checkToken]);

	useEffect(() => {
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			// Get notification API
			(async () => {
				try {
					const res = await notificationAPI(token);
					res.Code === 1 ? setDataNotification(res.Data) : '';
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [open, count]);

	return (
		<Box
			className={classes.headerContainer}
			py={2}
			display={`flex`}
			alignItems={`center`}
			height={80}
			flexShrink={0}
		>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{!loading ? (
							<>
								<p id="spring-modal-description" className={classes.textModal}>
									{dataNotificationDetail?.Title}
								</p>
								<div className={classes.boxContentModal}>
									<p className={classes.contentModal}>
										{dataNotificationDetail?.Content}
									</p>
								</div>
								<div className={classes.boxBtn} mt={1}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleClose}
									>
										Đóng
									</Button>
								</div>
							</>
						) : (
							<Skeleton className={classes.loadingModal} />
						)}
					</div>
				</Fade>
			</Modal>

			<Container maxWidth="xl">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Box display="flex" alignItems="center">
						<Hidden mdUp>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={toggleMenuMobile}
							>
								<MenuIcon />
							</IconButton>
						</Hidden>

						<Link href="/home" passHref>
							<Box
								component="a"
								display="inline-flex"
								alignItems="center"
								className={styles.logoWrap}
							>
								<img
									src="/static/img/logo.png"
									className={`logo ${styles.logo}`}
									alt="logo"
								/>
							</Box>
						</Link>
						<Hidden mdDown>
							<Divider
								orientation="vertical"
								className={styles.divider + ' ' + classes.divider}
							/>
						</Hidden>
						<Box
							display="flex"
							alignItems="center"
							id={`main-menu`}
							className={`${menuMobileShow ? 'mobile-open' : ''}`}
						>
							<Hidden mdUp>
								<Box
									display={`flex`}
									justifyContent={`space-between`}
									alignItems={`center`}
									style={{
										padding: '0.75rem',
										borderBottom: '1px solid #e1e1e1',
									}}
								>
									<Link href="/home" passHref>
										<Box
											onClick={() => setMenuMobileShow(false)}
											component="a"
											display="inline-flex"
											alignItems="center"
											className={styles.logoWrap}
										>
											<img
												src="/static/img/logo.png"
												className={`logo ${styles.logo}`}
												alt="logo"
											/>
										</Box>
									</Link>
									<IconButton
										color="inherit"
										aria-label="menu"
										onClick={toggleMenuMobile}
									>
										<CloseIcon />
									</IconButton>
								</Box>
							</Hidden>
							<Link href="/home" passHref>
								<Box
									onClick={() => setMenuMobileShow(false)}
									component="a"
									display="inline-block"
									className={`${styles.linkMenu} ${
										router.pathname.includes('/home') || router.pathname === '/'
											? 'active-menu'
											: ''
									}`}
								>
									<span className={styles.link}>Trang chủ</span>
								</Box>
							</Link>
							<Link href="/my-course" passHref>
								<Box
									onClick={() => setMenuMobileShow(false)}
									component="a"
									display="inline-block"
									className={`${styles.linkMenu} ${
										router.pathname.includes('/my-course') ? 'active-menu' : ''
									}`}
								>
									<span className={styles.link}>Khóa học của tôi</span>
								</Box>
							</Link>
							<Link href="/result" passHref>
								<Box
									onClick={() => setMenuMobileShow(false)}
									component="a"
									display="inline-block"
									className={`${styles.linkMenu} ${
										router.pathname.includes('/result') ? 'active-menu' : ''
									}`}
								>
									<span className={styles.link}>Kết quả học tập</span>
								</Box>
							</Link>
							<Link href="/blog" passHref>
								<Box
									component="a"
									display="inline-block"
									className={`${styles.linkMenu} ${
										router.pathname.includes('/blog') ? 'active-menu' : ''
									}`}
									onClick={() => setMenuMobileShow(false)}
								>
									<span className={styles.link}>Tin tức</span>
								</Box>
							</Link>
						</Box>
						<div
							className={`overlay-menu`}
							onClick={() => setMenuMobileShow(false)}
						/>
					</Box>
					{isAuthenticated.isLogin && (
						<>
							<Box className="header-right" display="flex" alignItems="center">
								<Box>
									<Badge
										badgeContent={100}
										max={dataNotification && dataNotification.length}
										color="primary"
										onClick={showNotification}
										overlap="circle"
										style={{ cursor: 'pointer' }}
									>
										<Notifications
											aria-controls="notification"
											aria-haspopup="true"
											className={styles.iconColor}
											fontSize="large"
										/>
									</Badge>

									<DropDownMenu
										id="notification"
										anchorEl={notiEl}
										keepMounted
										open={Boolean(notiEl)}
										onClose={closeNotification}
										className={`dropdown-angle ${classes.customNoti}`}
									>
										<Box
											p={2}
											className={classes.widthNoti}
											data={dataNotification}
										>
											<List
												component="nav"
												aria-label="secondary mailbox folders"
												className={classes.listNoti}
											>
												{dataNotification?.length > 0 ? (
													dataNotification.map((item) => (
														<ListItemLink
															data-id={item.ID}
															data-click="item-link"
															style={{
																cursor: 'normal',
																justifyContent: 'space-between',
															}}
														>
															<div
																style={{
																	display: 'flex',
																	alignItems: 'center',
																}}
																onClick={handleClick_openModal}
															>
																<ListItemAvatar>
																	<NotificationsNoneIcon />
																</ListItemAvatar>
																<div>
																	<ListItemText
																		primary={item.Title}
																		secondary={item.Content}
																		className={styles.styleListNoti}
																	/>
																	<span
																		className={classes.textWatch}
																		onClick={handleClick_openModal}
																	>
																		Xem chi tiết
																	</span>
																</div>
															</div>

															<CloseIcon
																className={classes.closeModalIcon}
																onClick={handleCLick_closeItem}
															/>
														</ListItemLink>
													))
												) : (
													<p>Không có thông báo</p>
												)}
												<div className={classes.boxBtn} mt={1}>
													{dataNotification?.length > 0 ? (
														<Button
															variant="contained"
															color="primary"
															style={{ fontSize: '13px' }}
															onClick={handleClick_removeAllItems}
														>
															Xóa tất cả
														</Button>
													) : (
														''
													)}
												</div>
											</List>
										</Box>
									</DropDownMenu>
								</Box>
								<Divider
									orientation="vertical"
									flexItem
									className={styles.divider}
								/>

								<ShowUser
									dataUser={dataProfile ? dataProfile : ''}
									logoutAccount={() => handleClick_logout()}
								/>
							</Box>
						</>
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default Header;
