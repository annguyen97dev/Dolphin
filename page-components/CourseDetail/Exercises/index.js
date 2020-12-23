import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CourseContext } from '~/pages/my-course/[courseid]';
import Choice from '~/components/common/TestQuestion/Choice';
import { randomId } from '~/utils';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReactHtmlParser from 'react-html-parser';
import { Alert, AlertTitle } from '@material-ui/lab';
import { submitResult } from '~/api/courseAPI';
import { useAuth } from '~/api/auth.js';
import CountDown from './CountDown/CountDown';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WhiteTab } from '../WhiteTabs';

const useStyles = makeStyles((theme) => ({
	startBtn: {
		marginTop: '20px',
		backgroundColor: '#D5A900',
		'&:hover': {
			backgroundColor: '#d4b027',
		},
	},
	boxTime: {
		width: '20%',
	},
	meta: {
		marginTop: '10px',
	},
	clock: {
		marginRight: '5px',
		color: '#ce9800',
	},
	modal: {
		minWidth: '500px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
	},
	mgBtn: {
		minWidth: '100px',
	},
	fontWeightNormal: {
		fontWeight: '600',
	},
	styleSvg: {
		color: '#deb900',
		fontSize: '3.5rem',
	},
	textSuccess: {
		color: '#01a05e',
		fontWeight: '700',
		marginTop: '10px',
	},
	styleLoading: {
		color: 'white',
		outline: '0',
		'&:focus': {
			outline: '0',
		},
	},
}));

// let dataAnswerClone = null;
const RenderQuestion = ({ data, getDataAnswer, dataResult }) => {
	// console.log('test: ', data);
	// return data.map((item) => <div>{item.TypeName}</div>);

	// const [dataAnswer, setDataAnswer] = useState();
	// console.log('Get result Quiz: ', dataAnswer);

	// const getResultQuiz = (rs) => {
	// 	console.log('RS: ', rs);
	// 	setDataAnswer(rs);
	// };

	return data.map((item, index) => (
		<Choice
			key={item.ExerciseID}
			exID={item.ExerciseID}
			multiple={item.Type}
			title={item.ExerciseTitle}
			subTitle={item.TypeName}
			answers={item.ListDapAn}
			getResultQuiz={(rs) => getDataAnswer(rs)}
		/>
	));
	// return <div>fjkdhfsdjkf</div>;
};

// ------------ EXERCISE -------------
const Excercises = ({
	dataQuiz,
	lessonID,
	dataLesson,
	doingQuiz,
	changeDoingQuiz,
}) => {
	let dataEx = [...dataQuiz];

	const { dataProfile } = useAuth();
	const [dataResult, setDataResult] = useState();
	const [checkDone, setCheckDone] = useState();
	const [dataSubmit, setDataSubmit] = useState();
	const [open, setOpen] = useState();
	const [loadSubmit, isLoadSubmit] = useState(false);
	const [progress, setProgress] = React.useState(0);

	console.log('DATA RESULT: ', dataResult);
	const getDataAnswer = (data) => {
		setDataResult({
			token: dataProfile && dataProfile.TokenApp,
			lessonID: lessonID,
			data: data,
		});
	};

	let timeQuiz = null;
	(function convertTimes() {
		// setHandleclick(true);
		timeQuiz = (function (dt, minutes) {
			return new Date(dt.getTime() + minutes * 60000);
		})(new Date(), dataLesson ? dataLesson?.Timeout : 60);
	})();

	// const handleClick_doAgain = () => {
	// 	setCheckDone(false);
	// };

	const handleClick_startQuiz = () => {
		let status = true;
		changeDoingQuiz(status);
		setDataResult('');
	};

	const classes = useStyles();

	let emptyAnswer = [];

	const checkEmptyAnswer = () => {
		dataEx.forEach((item) => {
			let count = 0;
			dataResult.data.forEach((obj) => {
				if (obj.ExerciseID === item.ExerciseID) {
					count++;
				}
			});
			count == 0 &&
				emptyAnswer.push({
					ExerciseID: item.ExerciseID,
					ExerciseType: item.Type,
					AnswerID: item.Type === 1 ? '0' : '',
				});
		});
	};

	const _handleSubmitExercise = (event) => {
		event.preventDefault();

		checkEmptyAnswer();
		emptyAnswer !== [] &&
			emptyAnswer.forEach((item) => {
				setDataResult(dataResult.data.push(item));
			});

		isLoadSubmit(true);
		setOpen(true);

		(async () => {
			try {
				const res = await submitResult({
					...dataResult,
					data: JSON.stringify(dataResult.data),
				});

				res.Code === 1
					? setTimeout(() => {
							isLoadSubmit(false);
							setDataSubmit(res.Data);
					  }, 2000)
					: alert('Submit NOT success');
			} catch (error) {
				console.log('Error: ', error);
			}
		})();
	};

	const handleSubmit_final = () => {
		setOpen(false);
		let status = false;
		changeDoingQuiz(status);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<CourseContext.Consumer>
			{/* {(context) => (
				<>
					{checkDone ? (
						<Alert severity="success">
							<AlertTitle>Success</AlertTitle>
							{ReactHtmlParser(dataSubmit?.Notifition)}
							{isDone ? (
								<Button
									variant="contained"
									color="primary"
									onClick={handleClick_doAgain}
								>
									Làm lại
								</Button>
							) : (
								''
							)}
						</Alert>
					) : (
						<>
							<Box>
								<Box display={`flex`} alignItems={`center`}>
									<Typography variant={`h6`} color={'error'}>
										Bài trắc nghiệm
									</Typography>
								</Box>

								<Box
									className={classes.meta}
									display={`flex`}
									alignItems={`center`}
								>
									<Box mr={2}>
										<Typography variant={`body1`}>
											Số lượng: <strong> {dataEx.length} câu</strong>
										</Typography>
									</Box>
									<Box>
										<Typography variant={`body1`}>
											Thời gian làm:{' '}
											<strong>{dataLesson && dataLesson.Timeout} phút</strong>
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box my={2}>
								<Divider />
							</Box>

							<form>
								<Box>
									<RenderQuestion
										data={dataEx}
										getDataAnswer={(data) => getDataAnswer(data)}
									/>
								</Box>
								<Box my={2}>
									<Divider />
								</Box>
								<Box display={`flex`}>
									<Box mr={2}>
										<Button
											type="submit"
											color={`primary`}
											variant="contained"
											onClick={_handleSubmitExercise}
										>
											Nộp bài tập
										</Button>
									</Box>

									<Box>
										<Button
											type="submit"
											color={`inherit`}
											variant="contained"
											onClick={_handleSubmitExercise}
											mr={2}
										>
											Hủy bỏ
										</Button>
									</Box>
								</Box>
							</form>
						</>
					)}
				</>
			)} */}

			{(context) => (
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
							{!loadSubmit ? (
								<div className={classes.paper}>
									<Box style={{ textAlign: 'center' }}>
										<CheckCircleOutlineIcon className={classes.styleSvg} />
									</Box>
									<p
										id="spring-modal-description"
										className={classes.textModal}
									>
										{ReactHtmlParser(dataSubmit?.Notifition)}
									</p>
									<div className={classes.boxBtn}>
										<Button
											className={classes.mgBtn}
											variant="contained"
											color="primary"
											onClick={handleSubmit_final}
										>
											OK
										</Button>
									</div>
								</div>
							) : (
								<CircularProgress className={classes.styleLoading} />
							)}
						</Fade>
					</Modal>

					{!doingQuiz ? (
						<Box>
							<Box display={`flex`} alignItems={`center`}>
								<Typography variant={`h6`} color={'error'}>
									{dataLesson?.Type === 2 ? 'Bài thi' : 'Bài trắc nghiệm'}
								</Typography>
							</Box>
							{dataLesson?.DataBaiHoc !== null ? (
								<Box display={`flex`} alignItems={`center`}>
									<MenuBookIcon style={{ color: '#3e3e3e' }} />
									<Typography variant={`body1`} style={{ marginLeft: '10px' }}>
										<strong className={classes.fontWeightNormal}>
											{dataLesson?.DataBaiHoc.LessonName}
										</strong>
									</Typography>
								</Box>
							) : (
								''
							)}
							<Box
								className={classes.meta}
								display={`flex`}
								alignItems={`center`}
							>
								<Box mr={2}>
									<Typography variant={`body1`}>
										Số lượng:{' '}
										<strong className={classes.fontWeightNormal}>
											{' '}
											{dataEx.length} câu
										</strong>
									</Typography>
								</Box>
								<Box>
									<Typography variant={`body1`}>
										Thời gian làm:{' '}
										<strong className={classes.fontWeightNormal}>
											{dataLesson && dataLesson.Timeout} phút
										</strong>
									</Typography>
								</Box>
							</Box>
							{dataLesson?.Point > 0 ? (
								!dataLesson?.IsDone ? (
									<>
										<Typography variant="body1">
											Điểm: <strong>{dataLesson?.Point}</strong>
										</Typography>
										<Box>
											<Button
												className={classes.startBtn}
												variant="contained"
												color="primary"
												onClick={handleClick_startQuiz}
											>
												Làm lại
											</Button>
										</Box>
									</>
								) : (
									<Typography variant="body1" className={classes.textSuccess}>
										Bạn đã hoàn thành quiz này!
									</Typography>
								)
							) : (
								<Box>
									<Button
										className={classes.startBtn}
										variant="contained"
										color="primary"
										onClick={handleClick_startQuiz}
									>
										Bắt đầu
									</Button>
								</Box>
							)}
						</Box>
					) : (
						<>
							<Box
								display={`flex`}
								justifyContent="space-between"
								alignItems="center"
							>
								<Box>
									<Box display={`flex`} alignItems={`center`}>
										<Typography variant={`h6`} color={'error'}>
											Bài trắc nghiệm
										</Typography>
									</Box>

									<Box
										className={classes.meta}
										display={`flex`}
										alignItems={`center`}
									>
										<Box mr={2}>
											<Typography variant={`body1`}>
												Số lượng: <strong> {dataEx.length} câu</strong>
											</Typography>
										</Box>
										<Box>
											<Typography variant={`body1`}>
												Thời gian làm:{' '}
												<strong>{dataLesson && dataLesson.Timeout} phút</strong>
											</Typography>
										</Box>
									</Box>
								</Box>
								<Box
									className={classes.boxTime}
									display={`flex`}
									alignItems="center"
									justifyContent="flex-end"
								>
									<AccessAlarmsIcon className={classes.clock} />
									<CountDown addMinutes={timeQuiz} doingQuiz={doingQuiz} />
								</Box>
							</Box>
							<Box my={2}>
								<Divider />
							</Box>

							<form>
								<Box>
									<RenderQuestion
										data={dataEx}
										getDataAnswer={(data) => getDataAnswer(data)}
									/>
								</Box>
								<Box my={2}>
									<Divider />
								</Box>
								<Box display={`flex`}>
									<Box mr={2}>
										<Button
											type="submit"
											color={`primary`}
											variant="contained"
											onClick={_handleSubmitExercise}
										>
											Nộp bài tập
										</Button>
									</Box>

									<Box>
										<Button
											type="submit"
											color={`inherit`}
											variant="contained"
											onClick={_handleSubmitExercise}
											mr={2}
										>
											Hủy bỏ
										</Button>
									</Box>
								</Box>
							</form>
						</>
					)}
				</>
			)}
		</CourseContext.Consumer>
	);
};
export default Excercises;
