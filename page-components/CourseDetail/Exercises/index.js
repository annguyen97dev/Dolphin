import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CourseContext } from '~/pages/my-course/course';
import Choice from '~/components/common/TestQuestion/Choice';
import { randomId } from '~/utils';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReactHtmlParser from 'react-html-parser';
import { Alert, AlertTitle } from '@material-ui/lab';
import { submitResult } from '~/api/courseAPI';
import { updateToken } from '~/api/courseAPI';
import { useAuth } from '~/api/auth.js';
import CountDown from './CountDown/CountDown';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import { Refresh } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WhiteTab } from '../WhiteTabs';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
		position: 'absolute',
		top: '10px',
		right: '0px',
		width: '170px',
		height: '46px',
		borderRadius: '5px',
		border: '2px solid #ce9800',
		background: 'white',
		boxShadow: '1px 3px 8px #0000003d',
		zIndex: '999',
		[theme.breakpoints.down('xs')]: {
			position: 'absolute',
			top: '0',
			right: '0',
			width: '130px',
			height: '40px',
		},
	},
	meta: {
		marginTop: '10px',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			alignItems: 'normal',
		},
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
		width: '490px',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
		'&:focus': {
			outline: 'none',
			border: 'none',
		},
	},
	modalQuiz: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paperQuiz: {
		width: '90%',
		height: '96%',
		border: 'none',
		borderRadius: '5px',
		padding: '15px',
		paddingBottom: '0',
		paddingTop: '15px',
		background: 'white',
		'&:focus': {
			outline: 'none',
			border: 'none',
		},
	},
	footerModal: {
		padding: '15px 0',
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
		margin: '0 10px',
	},
	fontWeightNormal: {
		fontWeight: '600',
	},
	styleSvg: {
		color: '#01a05e',
		fontSize: '3.5rem',
	},
	styleSvgWarn: {
		color: 'red',
		fontSize: '3.5rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.8rem',
		},
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
	btnSuccess: {
		marginTop: '15px',
		backgroundColor: green['500'],
		color: '#fff',
		'&:hover': {
			backgroundColor: green['700'],
		},
	},
	formEx: {
		height: 'calc(100% - 160px)',
		overflowY: 'auto',
		paddingRight: '15px',
		[theme.breakpoints.down('sm')]: {
			height: 'calc(100% - 185px)',
		},
	},
	styleTitleLesson: {
		fontSize: '18px',
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
let checkClick = false;
// ------------ EXERCISE -------------
const Excercises = ({
	dataQuiz,
	lessonID,
	dataLesson,
	doingQuiz,
	changeDoingQuiz,
}) => {
	let dataEx = [...dataQuiz];

	const { isAuthenticated, changeIsAuth } = useAuth();
	const [dataResult, setDataResult] = useState({
		token: isAuthenticated && isAuthenticated.token,
		lessonID: lessonID,
		data: [],
	});
	const [checkDone, setCheckDone] = useState();
	const [dataSubmit, setDataSubmit] = useState();
	const [open, setOpen] = useState();
	const [modalCancel, setModalCancel] = useState(false);
	const [loadSubmit, isLoadSubmit] = useState(false);
	const [progress, setProgress] = React.useState(0);
	const [openQuiz, setOpenQuiz] = useState(false);
	const [heightEx, setHeightEx] = useState();
	const getDataAnswer = (data) => {
		setDataResult({
			token: isAuthenticated && isAuthenticated.token,
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
		// Handle update token
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			(async () => {
				try {
					const res = await updateToken(token, timeQuiz);

					res.Code === 1 && console.log('Update token success');
					res.Code === 0 && changeIsAuth();
				} catch (error) {
					console.log('Error: ', error);
				}
			})();
		}

		setOpenQuiz(true);
		changeDoingQuiz(status);
		// setDataResult('');
	};

	const classes = useStyles();

	let emptyAnswer = [];

	const checkEmptyAnswer = () => {
		dataResult?.data?.length < 1
			? dataEx.forEach((item) => {
					setDataResult(
						dataResult.data.push({
							ExerciseID: item.ExerciseID,
							ExerciseType: item.Type,
							AnswerID: item.Type === 1 ? '0' : '',
						}),
					);
			  })
			: dataEx.forEach((item) => {
					let count = 0;
					dataResult?.data?.forEach((obj) => {
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

	console.log('OPEN: ', open);
	const _handleSubmitExercise = (event) => {
		event && event.preventDefault();

		checkEmptyAnswer();
		emptyAnswer.length > 0 &&
			emptyAnswer.forEach((item) => {
				setDataResult(dataResult.data.push(item));
			});

		isLoadSubmit(true);
		setOpen(true);

		// Handle submit
		(async () => {
			try {
				const res = await submitResult({
					...dataResult,
					data: JSON.stringify(dataResult.data),
				});

				res.Code === 1 &&
					setDataResult({
						token: isAuthenticated && isAuthenticated.token,
						lessonID: lessonID,
						data: [],
					});
				setTimeout(() => {
					isLoadSubmit(false);
					setDataSubmit(res.Data);
				}, 2000);
				res.Code === 0 && changeIsAuth();
			} catch (error) {
				console.log('Error: ', error);
			}
		})();

		// setTimeout(() => {
		// 	checkClick = false;
		// }, 3000);
	};

	const _handleCancelExercise = (event) => {
		event.preventDefault();
		setModalCancel(true);
	};

	const handleSubmit_final = () => {
		setOpen(false);
		setOpenQuiz(false);
		let status = false;
		changeDoingQuiz(status);
	};

	const handleCancel_final = () => {
		setModalCancel(false);
		let status = false;
		changeDoingQuiz(status);
	};

	// const handleCloseModalQuiz = () => {
	// 	alert("");
	// };

	const handleCancel_modal = () => {
		setModalCancel(false);
	};

	const handleClose = () => {
		console.log('click close');
		setOpen(false);
		setModalCancel(false);
	};

	useEffect(() => {}, []);

	return (
		<CourseContext.Consumer>
			{(context) => (
				<>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className={classes.modal}
						open={open}
						// onClose={handleClose}
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

					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className={classes.modal}
						open={modalCancel}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={modalCancel}>
							<div className={classes.paper}>
								<Box style={{ textAlign: 'center' }}>
									<ErrorOutlineIcon className={classes.styleSvgWarn} />
								</Box>
								<p id="spring-modal-description" className={classes.textModal}>
									Kết quả sẽ không được lưu lại nếu bạn thoát ra <br></br> Bạn
									có chắc muốn thoát không?
								</p>
								<div className={classes.boxBtn}>
									<Button
										className={classes.mgBtn}
										variant="contained"
										color="primary"
										onClick={handleCancel_final}
									>
										OK
									</Button>
									<Button
										className={classes.mgBtn}
										variant="contained"
										onClick={handleCancel_modal}
									>
										Cancel
									</Button>
								</div>
							</div>
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
								<Box display={`flex`} mt={2} mb={1}>
									<MenuBookIcon style={{ color: '#3e3e3e' }} />
									<Typography
										variant={`body1`}
										className={classes.styleTitleLesson}
										style={{ marginLeft: '10px' }}
									>
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
								!dataLesson.IsDone ? (
									<>
										<Typography variant="body1">
											Điểm: <strong>{dataLesson?.Point}</strong>
										</Typography>
										<Box>
											<Button
												variant={`contained`}
												color={`secondary`}
												className={classes.btnSuccess}
												startIcon={<Refresh />}
												onClick={handleClick_startQuiz}
											>
												Làm lại bài này
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
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								className={classes.modalQuiz}
								open={openQuiz}
								// onClose={handleCloseModalQuiz}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={openQuiz}>
									<div className={classes.paperQuiz}>
										<Box
											display={`flex`}
											justifyContent="space-between"
											alignItems="center"
											style={{ position: 'relative' }}
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
													mt={0}
												>
													<Box mr={2}>
														<Typography variant={`body1`}>
															Số lượng: <strong> {dataEx.length} câu</strong>
														</Typography>
													</Box>
													<Box>
														<Typography variant={`body1`}>
															Thời gian làm:{' '}
															<strong>
																{dataLesson && dataLesson.Timeout} phút
															</strong>
														</Typography>
													</Box>
												</Box>
											</Box>
											<Box
												className={classes.boxTime}
												display={`flex`}
												alignItems="center"
												justifyContent="center"
											>
												<AccessAlarmsIcon className={classes.clock} />
												<CountDown
													addMinutes={timeQuiz}
													doingQuiz={doingQuiz}
													onFinish={(e) => _handleSubmitExercise(e)}
												/>
											</Box>
										</Box>
										<Box my={2}>
											<Divider />
										</Box>

										<form className={classes.formEx}>
											<Box>
												<RenderQuestion
													data={dataEx}
													getDataAnswer={(data) => getDataAnswer(data)}
												/>
											</Box>
											<Box my={2}>
												<Divider />
											</Box>
										</form>
										<Box display={`flex`} className={classes.footerModal}>
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
													onClick={_handleCancelExercise}
													mr={2}
												>
													Hủy bỏ
												</Button>
											</Box>
										</Box>
									</div>
								</Fade>
							</Modal>
						</>
					)}
				</>
			)}
		</CourseContext.Consumer>
	);
};
export default Excercises;
