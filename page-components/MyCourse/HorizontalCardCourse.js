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
		marginLeft: '1rem',
		minWidth: 121,
		[theme.breakpoints.down('xs')]: {
			marginLeft: '3.5rem',
			marginTop: '1rem',
		},
	},
	errorText: {
		color: theme.palette.error.main,
	},
	metaColor: {
		color: '#b4b4b4',
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

const HorizontalCardCourse = ({
	ID,
	CourseName,
	GroupID,
	GroupCourseName,
	CourseLessonPercent,
	CourseTestPercent,
	CourseLesson,
	CourseTest,
	CourseDuration,
	loading,
	TypeFinish,
}) => {
	const classes = useStyles();
	return (
		<Paper elevation={0}>
			<Box className={classes.boxFlex} p={3}>
				<Box
					flexGrow={1}
					display={`flex`}
					alignItems={`center`}
					className={classes.title}
				>
					{/* <Box mr={2}>
						{loading ? (
							<Skeleton
								animation="wave"
								variant="circle"
								width={40}
								height={40}
							/>
						) : (
							<Avatar
								src={!!src ? src : '/static/img/book.svg'}
								className={classes.icon}
							/>
						)}
					</Box> */}
					<Box flexGrow={1}>
						<Typography
							variant={'subtitle1'}
							color={`primary`}
							style={{ fontSize: '0.85rem' }}
						>
							{GroupCourseName}
						</Typography>
						<Typography variant={'subtitle2'} style={{ fontSize: '1rem' }}>
							{loading ? <Skeleton /> : CourseName}
						</Typography>
						{TypeFinish === 1 ? (
							<Box color={`success.main`} display="flex" alignItems={`center`}>
								<CheckCircle />
								<Typography variant={`body2`} style={{ marginLeft: '0.25rem' }}>
									{loading ? <Skeleton width="30%" /> : 'Hoàn thành'}
								</Typography>
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
								{loading ? <Skeleton width="30%" /> : CourseDuration}
							</Typography>
						)}
					</Box>
				</Box>

				<Box flexShrink={0} display={`flex`} alignItems={`center`}>
					<Hidden xsDown>
						<Box className={classes.progress} ml={{ xs: 6.5, sm: 6.5, md: 4 }}>
							<Box display={`flex`} alignItems={`center`}>
								{loading ? (
									<Skeleton width={100} />
								) : (
									<>
										<PlayCircleFilled />
										<Box ml={0.5}>
											<Typography component={`span`}>{CourseLesson}</Typography>
										</Box>
									</>
								)}
							</Box>
							{loading ? (
								<Skeleton width={100} />
							) : (
								<WarningProgressBar value={CourseLessonPercent} />
							)}
						</Box>
					</Hidden>
					<Hidden xsDown>
						<Box className={classes.progress} ml={{ xs: 6.5, sm: 6.5, md: 4 }}>
							<Box display={`flex`} alignItems={`center`}>
								{loading ? (
									<Skeleton width={100} />
								) : (
									<>
										<Assignment />
										<Box ml={0.5}>
											<Typography component={`span`}>{CourseTest}</Typography>
										</Box>
									</>
								)}
							</Box>
							{loading ? (
								<Skeleton width={100} />
							) : (
								<WarningProgressBar value={CourseTestPercent} />
							)}
						</Box>
					</Hidden>
					{loading ? (
						<Skeleton height={60} width={100} />
					) : TypeFinish === 1 ? (
						<Link href={'/result/[resultid]'} as={`/result/${ID}`}>
							<WarningButton
								variant="contained"
								size="large"
								className={classes.btnSuccess}
							>
								Kết quả
							</WarningButton>
						</Link>
					) : (
						<Link href={'/my-course/[ID]'} as={`/my-course/${ID}`}>
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
