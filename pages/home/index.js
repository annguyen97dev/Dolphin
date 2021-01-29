import React, { useEffect, useState } from 'react';
import { getLayout } from '~/components/Layout';
import {
	Container,
	Paper,
	Avatar,
	Box,
	Typography,
	Button,
	Grid,
	CardHeader,
	CardMedia,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Link as LinkMU,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	PhoneIphoneRounded,
	EmailRounded,
	PlayCircleOutline,
	Assignment,
	AssignmentTurnedIn,
	Subscriptions,
	LibraryBooksRounded,
	LocationCity,
} from '@material-ui/icons';
import CircularProgressWithLabel from '~/components/common/CircularProgressWithLabel';
import { colors } from '~/config';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
	Navigation,
	Pagination,
	A11y,
	Autoplay,
	EffectFade,
} from 'swiper';
import { blogDemo } from '~/pages/blog';
import { BlogCard } from '~/components/common/BlogCard';
import { useRouter } from 'next/router';

// GET API
import { appSettings } from '~/config';
import { bannerAPI } from '~/api/bannerAPI';
import { newsAPI } from '~/api/newsAPI';
import { studyingAPI } from '~/api/resultAPI';
import { useAuth } from '~/api/auth.js';
import { statisticFinish } from '~/api/resultAPI';
import { profileAPI } from '~/api/profileAPI';
import Skeleton from '@material-ui/lab/Skeleton';

import style from './home.module.scss';

const linkImg = appSettings.link;

SwiperCore.use([Navigation, Pagination, A11y, Autoplay, EffectFade]);

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: 125,
		height: 125,
		[theme.breakpoints.down(`sm`)]: {
			width: 75,
			height: 75,
		},
		[theme.breakpoints.down(`xs`)]: {
			width: 55,
			height: 55,
		},
	},
	media: {
		width: '100%',
		backgroundSize: 'contain',
		height: 200,
	},
	iconCourse: {
		width: 35,
		height: 35,
		color: colors.primaryLighten,
	},
	lightPrimaryBtn: {
		backgroundColor: 'rgba(0, 108, 255, 0.1)',
		paddingRight: '1rem',
		paddingLeft: '1rem',
	},
	cardHeader: {
		paddingBottom: 0,
		paddingTop: 0,
		'& .MuiCardHeader-action': {
			marginTop: 0,
			marginRight: 0,
		},
	},
	infoBoxWrap: {
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			flexWrap: 'wrap',

			'& .MuiListItem-root': {
				borderBottom: '1px solid #e1e1e1',
			},
		},
	},
	cardContainer: {
		height: '100%',
	},
	iconInfo: {
		color: colors.grayText,
		marginRight: '0.5rem',
	},
	bannerWelcome: {
		'& > img': {
			width: '100%',
			height: 'auto',
			objectFit: 'cover',
			borderRadius: 8,
			boxShadow: '0px 4px 24px 0px rgba(0,0,0,.2)',
		},
	},
	paddingNone: {
		paddingTop: 0,
	},
	styleLoadLayout: {
		margin: 'auto',
		marginTop: '40px',
		width: '300px',
	},
	listQuizNeedHandle: {
		height: '228px',
		overflow: 'auto',
		[theme.breakpoints.down('sm')]: {
			height: 'auto',
		},
	},
	loadBanner: {
		width: '100%',
		height: '400px',
		[theme.breakpoints.down('sm')]: {
			height: '200px',
		},
	},
}));

const RowItem = ({ item, courseID }) => {
	const classes = makeStyles({
		rowStyle: {
			borderBottom: '1px solid #e1e1e1',
		},
		leftIcon: {
			width: 30,
			height: 30,
			color: colors.primaryLighten,
		},
		rightIcon: {
			fontSize: 48,
		},
		link: {
			color: '#000',
			'&:hover': {
				color: colors.primary,
			},
		},
		deadline: {
			fontWeight: 600,
			letterSpacing: 1,
			fontFamily: 'Roboto',
		},
	})();
	return (
		<ListItem className={classes.rowStyle}>
			<ListItemIcon>
				<LibraryBooksRounded className={classes.leftIcon} />
			</ListItemIcon>
			<Box>
				<Link
					href={`/my-course/course`}
					as={`/my-course/course?${courseID}&${item.ID}`}
					passHref
				>
					<LinkMU className={classes.link}>
						<Typography variant={`subtitle2`}>{item.LessonName}</Typography>
					</LinkMU>
				</Link>

				<Box component={`div`} display={`flex`}>
					<Typography
						variant={`caption`}
						component={`span`}
						color="textSecondary"
						style={{ marginRight: 5 }}
					>
						Hạn nộp:
					</Typography>
					<Typography
						variant={`caption`}
						component={`span`}
						color="textSecondary"
						className={classes.deadline}
					>
						{item.HanNop}
					</Typography>
				</Box>
			</Box>
			{/*<ListItemText*/}
			{/*	primary={item.courseName}*/}
			{/*	secondary={`Deadline: ${item.deadline}`}*/}
			{/*/>*/}
		</ListItem>
	);
};

const RenderRow = ({ lists, courseID }) => {
	return [...lists].map((item, index) => (
		<RowItem key={`${index}`} item={item} courseID={courseID} />
	));
};

const RenderBanner = ({ data }) => {
	const classes = useStyles();
	return (
		<Swiper
			spaceBetween={16}
			slidesPerView={1}
			pagination={{
				type: 'bullets',
				clickable: true,
			}}
			autoHeight={true}
			effect="coverflow"
			autoplay={{
				delay: 3000,
			}}
			// onSwiper={(swiper) => console.log(swiper)}
			// onSlideChange={() => console.log('slide change')}
		>
			{data
				? data.map((item) => (
						<SwiperSlide key={`${item.ID}`}>
							<Box className={classes.bannerWelcome}>
								<img alt={`banner`} src={`${linkImg}${item.Image}`} />
							</Box>
						</SwiperSlide>
				  ))
				: ''}
		</Swiper>
	);
};

const RenderSlider = ({ data, isLoading }) => {
	return (
		<Swiper
			className={style.swiperContainer}
			spaceBetween={16}
			slidesPerView={4}
			breakpoints={{
				320: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				960: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
			}}
			navigation
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}
		>
			{data
				? data.map((blog) => (
						<SwiperSlide key={blog.ID} style={{ height: 'auto' }}>
							<BlogCard dataBlog={blog} isLoading={isLoading} />
						</SwiperSlide>
				  ))
				: ''}
		</Swiper>
	);
};

const Home = (props) => {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(true);
	const [dataBanner, setDataBanner] = useState();
	const [dataNews, setDataNews] = useState();
	const [dataProfile, setDataProfile] = useState();
	const [dataStudying, setDataStudying] = useState();
	const [dataStatistic, setDataStatistic] = useState();
	const [loadLayout, setLoadLayout] = useState(false);

	const router = useRouter();
	// Check Authenticated
	const { isAuthenticated, changeIsAuth } = useAuth();
	const [checkToken, setCheckToken] = useState();

	const token = isAuthenticated.token;

	console.log('token home: ', token);

	useEffect(() => {
		if (localStorage.getItem('TokenUser') === null) {
			router.push({
				pathname: '/auth/login',
			});
		} else {
			if (checkToken === 0) {
				setLoadLayout(false);
				changeIsAuth();
			} else {
				setLoadLayout(true);
			}
		}
	}, [checkToken]);

	useEffect(() => {
		// let t = setTimeout(() => setIsLoading(false), 4000);

		if (token !== null) {
			// const token = localStorage.getItem('TokenUser');
			//LOAD DATA PROFILE
			(async () => {
				try {
					console.log('chạy vô thag này');
					const res = await profileAPI(token);
					res.Code === 1 ? setDataProfile(res.Data) : '';
					res.Code === 0 && setCheckToken(res.Code);
				} catch (error) {
					console.log(error);
				}
			})();

			// Get banner API
			(async () => {
				try {
					const res = await bannerAPI(token);
					res.Code === 1 ? (setDataBanner(res.Data), setIsLoading(false)) : '';
				} catch (error) {
					console.log(error);
				}
			})();

			// Get news API
			(async () => {
				try {
					const res = await newsAPI(token);
					res.Code === 1 ? (setDataNews(res.Data), setIsLoading(false)) : '';
				} catch (error) {
					console.log(error);
				}
			})();

			// Get result Studying API
			(async () => {
				try {
					const res = await studyingAPI(token);
					res.Code === 1 ? setDataStudying(res.Data) : '';
				} catch (error) {
					console.log(error);
				}
			})();

			// Get statistic finish API
			(async () => {
				try {
					const res = await statisticFinish(token);
					res.Code === 1 ? setDataStatistic(res.Data) : '';
				} catch (error) {
					console.log(error);
				}
			})();
		}

		// return () => clearTimeout(t);
	}, [isAuthenticated.isLogin]);

	return (
		<div>
			{!loadLayout ? (
				<div className={classes.styleLoadLayout}>
					<Skeleton />
					<Skeleton animation={false} />
					<Skeleton animation="wave" />
				</div>
			) : (
				<Box py={4} className={classes.paddingNone}>
					<Container maxWidth={`xl`}>
						{!isLoading ? (
							dataBanner?.length > 0 ? (
								<RenderBanner data={dataBanner} />
							) : (
								<p style={{ textAlign: 'center' }}>Chưa có dữ liệu</p>
							)
						) : (
							<Skeleton className={classes.loadBanner} />
						)}

						<h1 className="title-page">Trang chủ</h1>
						<Paper style={{ overflow: 'hidden' }}>
							{dataProfile && (
								<Box p={4}>
									<Grid container>
										<Grid item xs={12} sm={12} md={6}>
											<Box mb={{ xs: 4, md: 0 }} display={`flex`}>
												<Avatar
													alt="User name"
													src={`${linkImg}${dataProfile?.Avatar}`}
													className={classes.avatar}
												/>
												<Box pl={2}>
													<Typography
														variant={`subtitle1`}
														style={{ fontWeight: '600' }}
													>
														{dataProfile.FullName}
													</Typography>
													<Typography
														variant={`subtitle2`}
														style={{ color: '#b4b4b4' }}
														gutterBottom
													>
														{dataProfile.RoleName}
													</Typography>
													<Box
														display={`flex`}
														alignItems={`center`}
														mt={1}
														flexWrap={`wrap`}
													>
														<Box
															display={`flex`}
															alignItems={`center`}
															mr={2}
															mb={1}
														>
															<PhoneIphoneRounded
																className={classes.iconInfo}
															/>
															<Typography>{dataProfile.Phone}</Typography>
														</Box>
														<Box display={`flex`} alignItems={`center`} mb={1}>
															<EmailRounded className={classes.iconInfo} />
															<Typography>{dataProfile.Email}</Typography>
														</Box>
													</Box>
													<Box display={`flex`} alignItems={`center`} mb={1}>
														<LocationCity className={classes.iconInfo} />
														<Typography>{dataProfile.Address}</Typography>
													</Box>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} md={6}>
											<Grid spacing={4} container>
												<Grid xs={6} sm={6} item>
													<Box align={`center`}>
														<Typography>Khóa học đã hoàn thành</Typography>
														<Box mt={2}>
															<CircularProgressWithLabel
																color={`primary`}
																thickness={4}
																size={100}
																value={
																	dataStatistic &&
																	(dataStatistic.TotalCourseFinish * 100) /
																		dataStatistic.TotalCourse
																}
															/>
														</Box>
													</Box>
												</Grid>
												<Grid xs={6} item>
													<Box align={`center`}>
														<Typography>Tổng bài hoàn thành</Typography>
														<Box mt={2}>
															<CircularProgressWithLabel
																color={`primary`}
																thickness={4}
																size={100}
																value={
																	dataStatistic &&
																	(dataStatistic.TotalQuizFinish * 100) /
																		dataStatistic.TotalQuiz
																}
															/>
														</Box>
													</Box>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
							)}
							{/* <Box p={4}>
									<Grid container>
										<Grid
											item
											xs={12}
											direction="row"
											justify="center"
											alignItems="center"
										>
											<Typography variant="subtitle1" gutterBottom align="center">
												Bạn cần{' '}
												<a href="#" onClick={handleClick_moveLogin}>
													đăng nhập
												</a>{' '}
												hoặc <a href="/signup">đăng kí</a> để biết thêm thông tin
											</Typography>
										</Grid>
									</Grid>
								</Box> */}
						</Paper>

						<Box my={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6}>
									<Card>
										<Box p={2}>
											<CardHeader
												title="Khóa học đang học"
												className={classes.cardHeader}
												titleTypographyProps={{
													variant: 'h5',
													color: 'primary',
												}}
												action={
													<Link
														href={`/my-course/course`}
														as={`/my-course/course?${dataStudying?.ID}`}
														passHref
													>
														<Button
															color="primary"
															startIcon={<PlayCircleOutline />}
															className={classes.lightPrimaryBtn}
															size="medium"
														>
															Học tiếp
														</Button>
													</Link>
												}
											/>
											<CardContent>
												<Box mb={2}>
													<Grid container>
														<Grid item xs={12} sm={6} md={6} lg={7}>
															<CardMedia
																className={classes.media}
																image="/static/img/learning.svg"
																title="Complete React Hooks 2020"
															/>
														</Grid>
														<Grid item xs={12} sm={6} md={6} lg={5}>
															<Box ml={{ sm: 2 }}>
																<List className={classes.infoBoxWrap}>
																	<ListItem disableGutters>
																		<ListItemIcon style={{ minWidth: 45 }}>
																			<Subscriptions
																				className={classes.iconCourse}
																			/>
																		</ListItemIcon>
																		<ListItemText
																			primaryTypographyProps={{
																				variant: 'subtitle2',
																			}}
																			secondaryTypographyProps={{
																				variant: 'caption',
																				color: 'textSecondary',
																			}}
																			primary="Bài học"
																			secondary={`Số lượng: ${
																				dataStudying &&
																				dataStudying.CourseLesson
																					? dataStudying.CourseLesson
																					: 'Chưa có dữ liệu'
																			}`}
																		/>
																	</ListItem>
																	<ListItem disableGutters>
																		<ListItemIcon style={{ minWidth: 45 }}>
																			<Assignment
																				className={classes.iconCourse}
																			/>
																		</ListItemIcon>
																		<ListItemText
																			primaryTypographyProps={{
																				variant: 'subtitle2',
																			}}
																			secondaryTypographyProps={{
																				variant: 'caption',
																				color: 'textSecondary',
																			}}
																			primary="Bài thi"
																			secondary={`Số lượng: ${
																				dataStudying && dataStudying.CourseTest
																					? dataStudying.CourseTest
																					: 'Chưa có dữ liệu'
																			}`}
																		/>
																	</ListItem>
																	{/* <ListItem disableGutters>
																		<ListItemIcon style={{ minWidth: 45 }}>
																			<AssignmentTurnedIn
																				className={classes.iconCourse}
																			/>
																		</ListItemIcon>
																		<ListItemText
																			primaryTypographyProps={{
																				variant: 'subtitle2',
																			}}
																			secondaryTypographyProps={{
																				variant: 'caption',
																				color: 'textSecondary',
																			}}
																			primary="Bài thi"
																			secondary={`Hoàn thành ${dataStudying.CourseLesson}`}
																		/>
																	</ListItem> */}
																</List>
															</Box>
														</Grid>
													</Grid>
												</Box>

												<Typography
													variant={`h6`}
													component={`a`}
													align={`center`}
												>
													<Link
														href={`/my-course/course`}
														as={`/my-course/course?${dataStudying?.ID}`}
														passHref
													>
														<Typography
															style={{ fontWeight: 700, fontFamily: 'Roboto' }}
														>
															{dataStudying?.CourseName}
														</Typography>
													</Link>
												</Typography>
											</CardContent>
										</Box>
									</Card>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<Card className={classes.cardContainer}>
										<Box
											p={2}
											flexDirection={`column`}
											display={`flex`}
											height={`100%`}
										>
											<CardHeader
												title="Bài quiz cần hoàn thành"
												className={classes.cardHeader}
												titleTypographyProps={{
													variant: 'h5',
													color: 'primary',
												}}
											/>
											<CardContent
												style={{
													paddingTop: 0,
													flexGrow: 1,
													maxHeight: '18.5rem',
													overflow: 'auto',
													marginTop: '0.5rem',
												}}
											>
												<List className={classes.listQuizNeedHandle}>
													{dataStudying ? (
														dataStudying.BaiQuizCanHoanThanh?.length > 0 ? (
															<RenderRow
																lists={dataStudying.BaiQuizCanHoanThanh}
																courseID={dataStudying.ID}
															/>
														) : (
															<Typography variant="subtitle2" gutterBottom>
																Chưa có dữ liệu
															</Typography>
														)
													) : (
														<Typography variant="subtitle2" gutterBottom>
															Chưa có dữ liệu
														</Typography>
													)}
												</List>
											</CardContent>
										</Box>
									</Card>
								</Grid>
							</Grid>
						</Box>
						<Box mt={4}>
							<Typography variant={`h5`} color="primary">
								Bài viết mới
							</Typography>
							<Box mt={2}>
								{dataNews?.length > 0 ? (
									<RenderSlider data={dataNews} isLoading={isLoading} />
								) : (
									<p style={{ textAlign: 'center' }}>Chưa có dữ liệu</p>
								)}
							</Box>
						</Box>
					</Container>
				</Box>
			)}
		</div>
	);
};

Home.getLayout = getLayout;

export default Home;
