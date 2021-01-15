import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CourseContext } from '~/pages/my-course/course';
import Choice from '~/components/common/TestQuestion/Choice';
import { randomId } from '~/utils';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { colors } from '~/config';
import Link from 'next/link';
import { green } from '@material-ui/core/colors';
import { Refresh } from '@material-ui/icons';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
	score: {
		backgroundColor: `#FFE05D`,
		backgroundImage: `linear-gradient(62deg, #FBAB7E 0%, #FFE05D 25%)`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80,
		height: 80,
		borderRadius: 80 / 2,
		flexShrink: 0,
	},
	btnSuccess: {
		backgroundColor: green['500'],
		color: '#fff',
		'&:hover': {
			backgroundColor: green['700'],
		},
	},
	fontWeightNormal: {
		fontWeight: '600',
	},
	styleTitleLesson: {
		fontSize: '18px',
	},
	boxPoint: {
		display: 'inline-block',
		padding: '7px 15px',
		background: '#a7a7a71f',
		fontWeight: '500',
		color: '#01a05e',
	},
	styleLoading: {
		width: '100%',
		height: '100px',
	},
}));

const RenderQuestion = ({ data }) => {
	return data.map((item, index) => (
		<Choice
			key={item.ExerciseID}
			exID={item.ExerciseID}
			multiple={item.Type === 1 ? false : true}
			title={item.ExerciseTitle}
			subTitle={item.TypeName}
			answers={item.ListDapAn}
			getResultQuiz={(rs) => getDataAnswer(rs)}
		/>
	));
};
const ExerciseResult = ({ dataQuiz, dataLesson, lessonID, isLoading }) => {
	const classes = useStyles();

	let dataEx = [...dataQuiz];

	// console.log('Data Lesson: ', dataLesson);

	const [dataResult, setDataResult] = useState();

	const _handleSubmitExercise = (event) => {
		event.preventDefault();
		alert('Submit exercise');
	};
	return (
		<CourseContext.Consumer>
			{(context) => (
				<>
					{isLoading ? (
						<Skeleton className={classes.styleLoading} />
					) : (
						<>
							<Box display={`flex`} alignItems={`center`}>
								{dataLesson?.Type === 1 ? (
									<Typography variant={`h6`} color={'error'}>
										Bài trắc nghiệm
									</Typography>
								) : (
									<Typography variant={`h6`} color={'error'}>
										{dataLesson?.TypeName}
									</Typography>
								)}
							</Box>
							<Box
								display={`flex`}
								justifyContent={`space-between`}
								alignItems={`center`}
							>
								<Box>
									{dataLesson?.Type === 1 ? (
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
										flexWrap={`wrap`}
									>
										<Box mr={2} mb={1}>
											<Typography variant={`body1`}>
												Số lượng: <strong>{dataQuiz?.length} câu</strong>
											</Typography>
										</Box>
										<Box mb={1}>
											<Typography variant={`body1`}>
												Thời gian làm:{' '}
												<strong>{dataLesson?.Timeout} phút</strong>
											</Typography>
										</Box>
									</Box>
									<Box>
										<Typography variant="body1" className={classes.boxPoint}>
											Điểm: <strong>{dataLesson?.Point}</strong>
										</Typography>
									</Box>
								</Box>
								{/* <Box display={`flex`} alignItems={`center`}>
							<Box className={classes.score} ml={2} color={`error.main`}>
								<Typography variant={`h4`} style={{ fontWeight: 'bold' }}>
									7.5
								</Typography>
								<Typography variant={`caption`}>Điểm</Typography>
							</Box>
						</Box> */}
							</Box>
						</>
					)}
				</>
			)}
		</CourseContext.Consumer>
	);
};
export default ExerciseResult;
