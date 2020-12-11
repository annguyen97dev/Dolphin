import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CourseContext } from '~/pages/my-course/[courseid]';
import Choice from '~/components/common/TestQuestion/Choice';
import { randomId } from '~/utils';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { submitResult } from '~/api/courseAPI';
import { useAuth } from '~/api/auth.js';

const useStyles = makeStyles((theme) => ({}));
const questionDemo = [
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 1, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 2, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 1, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 2, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 1, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 2, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 1, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 2, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 1, // 1 Single, 2 Multiple
	},
	{
		id: randomId(),
		title:
			'Checkbox can be provided with a label thanks to the FormControlLabel component.',
		subTitle: `All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the  element (FormControlLabel).`,
		answers: [
			{
				label: 'Answer 1',
				value: 'opt1',
			},
			{
				label: 'Answer 2',
				value: 'opt2',
			},
			{
				label: 'Answer 3',
				value: 'opt3',
			},
			{
				label: 'Answer 4',
				value: 'opt4',
			},
		],
		questionType: 2, // 1 Single, 2 Multiple
	},
];

// let dataAnswerClone = null;
const RenderQuestion = ({ data, getDataAnswer }) => {
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
			multiple={item.Type === 1 ? false : true}
			title={item.ExerciseTitle}
			subTitle={item.TypeName}
			answers={item.ListDapAn}
			getResultQuiz={(rs) => getDataAnswer(rs)}
		/>
	));
	// return <div>fjkdhfsdjkf</div>;
};
const Excercises = ({ dataQuiz, lessonID }) => {
	let dataEx = [...dataQuiz];
	const { dataProfile } = useAuth();
	const [dataResult, setDataResult] = useState();

	const getDataAnswer = (data) => {
		setDataResult({
			UID: dataProfile && dataProfile.UID,
			token: dataProfile && dataProfile.TokenApp,
			lessonID: lessonID,
			data: data,
		});
	};

	const classes = useStyles();

	const _handleSubmitExercise = (event) => {
		event.preventDefault();
		(async () => {
			try {
				const res = await submitResult(dataResult);
				res.Code === 1 ? alert('submit success') : alert('Submit NOT success');
			} catch (error) {
				alert('Không kết nối dc');
			}
		})();
	};

	return (
		<CourseContext.Consumer>
			{(context) => (
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
									Số lượng: <strong>15 câu</strong>
								</Typography>
							</Box>
							<Box>
								<Typography variant={`body1`}>
									Thời gian làm: <strong>30 phút</strong>
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
		</CourseContext.Consumer>
	);
};
export default Excercises;
