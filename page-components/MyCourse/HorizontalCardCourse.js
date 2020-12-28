import React, { useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { PlayCircleFilled, CheckCircle, Assignment } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import { colors } from '~/config';
import Link from 'next/link';
import Hidden from '@material-ui/core/Hidden';
import { Skeleton } from '@material-ui/lab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';

import { courseRating } from '~/api/courseAPI';
import CircularProgress from '@material-ui/core/CircularProgress';

const SuccessProgressBar = withStyles((theme) => ({
	barColorPrimary: {
		backgroundColor: green[400],
	},
}))((props) => (
	<Box display="flex" alignItems="center">
		<Box width="100%" mr={1}>
			<LinearProgress
				style={{ height: 5 }}
				variant="determinate"
				color={`primary`}
				{...props}
			/>
		</Box>
		<Box minWidth={35}>
			<Typography variant="body2" color="textSecondary">{`${Math.round(
				props.value,
			)}%`}</Typography>
		</Box>
	</Box>
));

const WarningProgressBar = withStyles((theme) => ({
	barColorPrimary: {
		backgroundColor: theme.palette.warning.light,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
}))((props) => (
	<Box display="flex" alignItems="center">
		<Box width="100%" mr={1}>
			<LinearProgress
				style={{ height: 5 }}
				variant="determinate"
				color={`primary`}
				{...props}
			/>
		</Box>
		<Box minWidth={35}>
			<Typography variant="body2" color="textSecondary">{`${Math.round(
				props.value,
			)}%`}</Typography>
		</Box>
	</Box>
));

const LinearProgressWithLabel = (props) => {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress
					style={{ height: 5 }}
					variant="determinate"
					{...props}
				/>
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	boxFlex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
		},
	},
	progress: {
		width: 120,
		marginRight: '1rem',
	},
	title: {
		[theme.breakpoints.down('sm')]: {
			flexBasis: '100%',
		},
	},
	btnSuccess: {
		marginRight: '1rem',
		minWidth: 121,
		// [theme.breakpoints.down('xs')]: {
		// 	marginLeft: '3.5rem',
		// 	marginTop: '1rem',
		// },
		color: 'white',
	},
	errorText: {
		color: theme.palette.error.main,
	},
	metaColor: {
		color: '#b4b4b4',
	},
	btnResult: {
		'&:hover': {
			backgroundColor: '#ffd753!important',
		},
	},
	btnPoint: {
		color: 'white',
		marginRight: '1rem',
		minWidth: 121,
		// [theme.breakpoints.down('xs')]: {
		// 	marginLeft: '3.5rem',
		// 	marginTop: '1rem',
		// },
		backgroundColor: '#e43232',
		'&:hover': {
			backgroundColor: '#d41c1c',
		},
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
		width: '448px',
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
	},
	boxRating: {
		width: '70%',
		textAlign: 'center',
		border: '3px solid #ececec',
		borderRadius: '5px',
		margin: 'auto',
		paddingBottom: '1px',
		background: '#fdfdfd',
		marginBottom: '18px',
	},
	styleRating: {
		fontSize: '1.8rem',
	},
	styleLoading: {
		margin: 'auto',
	},
}));

const SuccessButton = withStyles((theme) => ({
	root: {
		color: '#fff',
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
}))(Button);

const WarningButton = withStyles((theme) => ({
	root: {
		color: theme.palette.warning.contrastText,
		backgroundColor: theme.palette.warning.main,
		'&:hover': {
			backgroundColor: theme.palette.warning.dark,
		},
	},
}))(Button);

const HorizontalCardCourse = ({ data, loading, afterRating }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [value, setValue] = React.useState(0);
	const [ratingSuccess, setRatingSuccess] = useState({
		noti: '',
		status: false,
	});
	const [loadRating, isLoadRating] = useState(false);

	let dataCourse = { ...data };

	console.log('Rating Status: ', ratingSuccess.status);

	const handleClick_Open = () => {
		setOpen(true);
		setValue(0);
		setRatingSuccess({
			...ratingSuccess,
			status: false,
		});
		let status = false;
		afterRating(status);
	};

	const handleClose = () => {
		setOpen(false);
		let status = true;
		afterRating(status);
	};

	const handleRating = async () => {
		isLoadRating(true);
		try {
			const res = await courseRating(value, dataCourse.SettingCourseID);
			res.Code === 1
				? setTimeout(() => {
						isLoadRating(false),
							setRatingSuccess({
								noti: res.Data.Notifition,
								status: true,
							});
				  }, 1000)
				: alert('Submit NOT success');
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Paper elevation={0}>
			<>
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
							<p id="spring-modal-description" className={classes.textModal}>
								Đánh giá
							</p>
							{!loadRating ? (
								!ratingSuccess.status ? (
									<>
										<Box
											component="fieldset"
											mb={3}
											className={classes.boxRating}
										>
											<Rating
												name="simple-controlled"
												value={value}
												onChange={(event, newValue) => {
													setValue(newValue);
												}}
												className={classes.styleRating}
											/>
										</Box>
										<div className={classes.boxBtn}>
											<Button
												className={classes.mgBtn}
												variant="contained"
												color="primary"
												onClick={handleRating}
											>
												GỬI ĐÁNH GIÁ
											</Button>
										</div>
									</>
								) : (
									<>
										<Typography variant={`body1`} align={'center'}>
											{ratingSuccess.noti}
										</Typography>
										<div className={classes.boxBtn}>
											<Button
												className={classes.mgBtn}
												variant="contained"
												color="primary"
												onClick={handleClose}
											>
												OK
											</Button>
										</div>
									</>
								)
							) : (
								<Box display={`flex`} justifyContent="center">
									<CircularProgress />
								</Box>
							)}
						</div>
					</Fade>
				</Modal>
			</>
			<Box p={3}>
				<Box className={classes.boxFlex}>
					<Box
						flexGrow={1}
						display={`flex`}
						alignItems={`center`}
						className={classes.title}
					>
						<Box flexGrow={1}>
							<Typography
								variant={'subtitle1'}
								color={`primary`}
								style={{ fontSize: '0.85rem' }}
							>
								{dataCourse.GroupCourseName}
							</Typography>
							<Typography variant={'subtitle2'} style={{ fontSize: '1rem' }}>
								{loading ? <Skeleton /> : dataCourse.CourseName}
							</Typography>
							{dataCourse.TypeFinish === 1 ? (
								<Box
									color={`success.main`}
									display="flex"
									alignItems={`center`}
								>
									<CheckCircle />
									<Typography
										variant={`body2`}
										style={{ marginLeft: '0.25rem' }}
									>
										{loading ? <Skeleton width="30%" /> : 'Hoàn thành'}
									</Typography>
									<Box
										component="fieldset"
										borderColor="transparent"
										style={{ paddingBottom: '4px' }}
									>
										<Rating
											name="read-only"
											value={dataCourse?.Rate}
											readOnly
											style={{ fontSize: '1.3rem' }}
										/>
									</Box>
								</Box>
							) : (
								<Typography
									variant={'body2'}
									style={{
										marginBottom: 0,
										fontFamily: 'Roboto',
									}}
									className={classes.metaColor}
								>
									{loading ? (
										<Skeleton width="30%" />
									) : (
										dataCourse.CourseDuration
									)}
								</Typography>
							)}
						</Box>
					</Box>

					<Box flexShrink={0} display={`flex`} alignItems={`center`}>
						<Hidden xsDown>
							<Box
								className={classes.progress}
								ml={{ xs: 6.5, sm: 6.5, md: 4 }}
							>
								<Box display={`flex`} alignItems={`center`}>
									{loading ? (
										<Skeleton width={100} />
									) : (
										<>
											<PlayCircleFilled />
											<Box ml={0.5}>
												<Typography component={`span`}>
													{dataCourse.CourseLesson}
												</Typography>
											</Box>
										</>
									)}
								</Box>
								{loading ? (
									<Skeleton width={100} />
								) : (
									<WarningProgressBar value={dataCourse.CourseLessonPercent} />
								)}
							</Box>
						</Hidden>
						<Hidden xsDown>
							<Box
								className={classes.progress}
								ml={{ xs: 6.5, sm: 6.5, md: 4 }}
							>
								<Box display={`flex`} alignItems={`center`}>
									{loading ? (
										<Skeleton width={100} />
									) : (
										<>
											<Assignment />
											<Box ml={0.5}>
												<Typography component={`span`}>
													{dataCourse.CourseTest}
												</Typography>
											</Box>
										</>
									)}
								</Box>
								{loading ? (
									<Skeleton width={100} />
								) : (
									<WarningProgressBar value={dataCourse.CourseTestPercent} />
								)}
							</Box>
						</Hidden>
					</Box>
				</Box>
				<Box mt={2}>
					{loading ? (
						<Skeleton height={60} width={100} />
					) : dataCourse.TypeFinish === 1 ? (
						<>
							<Link
								href={'/result/[resultid]'}
								as={`/result/${dataCourse.ID}`}
								passHref
							>
								<WarningButton
									variant="contained"
									size="large"
									className={`${classes.btnSuccess} ${classes.btnResult}`}
								>
									Kết quả
								</WarningButton>
							</Link>
							<Button
								size="large"
								variant="contained"
								className={classes.btnPoint}
								onClick={handleClick_Open}
							>
								Đánh giá
							</Button>
						</>
					) : (
						<Link
							href={'/my-course/[ID]'}
							as={`/my-course/${dataCourse.ID}`}
							passHref
						>
							<Button
								variant="contained"
								size="large"
								color={`primary`}
								className={classes.btnSuccess}
							>
								Học ngay
							</Button>
						</Link>
					)}
				</Box>
			</Box>
		</Paper>
	);
};

export default HorizontalCardCourse;
