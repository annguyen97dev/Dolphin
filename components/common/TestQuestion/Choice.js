import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import ReactHtmlParser from 'react-html-parser';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useCourse } from '~/pages/my-course/course';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: '1rem 0',
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
	title: {
		fontWeight: '600',
		fontSize: '1rem',
	},
	subTitle: {
		color: '#707070',
	},
	container: {
		borderBottom: `1px solid #e1e1e1`,
		'&:last-child': {
			borderBottom: 0,
		},
	},
	styleTexarea: {
		fontSize: '16px',
		width: '100%',
		resize: 'none',
		padding: '5px',
		paddingLeft: '10px',
		border: '1px solid rgba(0, 0, 0, 0.25)',
		'&:focus': {
			border: '1px solid rgb(0 0 0 / 38%)',
			outline: '0',
		},
	},
}));

const RenderAnswer = ({
	answers,
	multiple,
	disabled = false,
	handleChangeText,
	exID,
}) => {
	const classes = useStyles();
	const [checkData, setCheckData] = useState([]);
	const _handleCheckboxChange = (event) => {
		const indexed = checkData.findIndex(
			(item) => item.value === event.target.value,
		);
		const newState = [...checkData].map((item, index) => {
			return index === indexed
				? {
						...item,
						isChecked: !!!item.isChecked,
				  }
				: item;
		});
		setCheckData(newState);
	};

	useEffect(() => {
		if (multiple !== 2) return;
		setCheckData(
			[...answers].map((answer) => ({
				...answer,
				isChecked: false,
			})),
		);
	}, []);

	return (
		<>
			{multiple === 2 && (
				// [...checkData].map((answer, index) => (
				// 	<FormControlLabel
				// 		key={`${index}`}
				// 		value={answer?.value}
				// 		control={
				// 			<Checkbox
				// 				checked={answer.isChecked}
				// 				onChange={_handleCheckboxChange}
				// 				name={`checkBoxGroup`}
				// 				color="primary"
				// 				disabled={disabled}
				// 			/>
				// 		}
				// 		label={answer?.label}
				// 	/>
				// ))
				<TextareaAutosize
					exid={exID}
					className={classes.styleTexarea}
					aria-label="empty textarea"
					placeholder="Nhập câu trả lời của bạn tại đây..."
					rowsMin={5}
					style={{ width: '100%' }}
					onChange={handleChangeText}
				/>
			)}
			{multiple === 1 &&
				[...answers].map((answer, index) => (
					<FormControlLabel
						key={index}
						value={answer?.AnswerID.toString()}
						control={<Radio color="primary" />}
						label={answer?.AnswerTitle}
					/>
				))}
		</>
	);
};

let dataAnswer = [];

const Choice = (props) => {
	const classes = useStyles();
	const {
		exID,
		multiple,
		title = '',
		subTitle = '',
		answers = [],
		helperText = '',
		disabled = false,
		getResultQuiz,
	} = props;

	let { doingQuiz } = useCourse();

	useEffect(() => {
		dataAnswer = [];
	}, [doingQuiz]);

	const [value, setValue] = useState('');
	const [textQuiz, setTextQuiz] = useState('');

	const ExistInArray = (id) => {
		let check = false;
		dataAnswer.forEach((item, index) => {
			if (item.ExerciseID === id) {
				check = true;
			}
		});
		return check;
	};

	const UpdateInArray = (id, rs) => {
		dataAnswer.forEach((item, index) => {
			if (item.ExerciseID === id) {
				item.AnswerID = rs;
			}
		});
		let newData = [...dataAnswer];
		getResultQuiz(newData);
	};

	const AddToArray = (id, rs) => {
		dataAnswer.push({
			ExerciseID: id,
			ExerciseType: multiple,
			AnswerID: rs,
		});
		let newData = [...dataAnswer];
		getResultQuiz(newData);
	};

	const handleChange_getText = (id, rs) => {
		id = parseInt(id);
		if (dataAnswer == []) {
			AddToArray(id, rs);
		} else {
			if (ExistInArray(id)) {
				UpdateInArray(id, rs);
			} else {
				AddToArray(id, rs);
			}
		}
	};

	const _handleRadioChange = (event) => {
		let rs = event.target.value;
		if (dataAnswer == []) {
			AddToArray(exID, rs);
		} else {
			if (ExistInArray(exID)) {
				UpdateInArray(exID, rs);
			} else {
				AddToArray(exID, rs);
			}
		}

		setValue(rs);
	};

	return (
		<Box mb={2} className={classes.container}>
			<Box className={classes.header}>
				<Box className={classes.title}>{ReactHtmlParser(title)}</Box>
				<Box className={classes.subTitle}>{subTitle}</Box>
			</Box>
			<Box className={classes.body}>
				<FormControl
					component="fieldset"
					className={classes.formControl}
					style={{ width: '100%' }}
				>
					{multiple === 1 ? (
						<RadioGroup
							aria-label="quiz"
							name="quiz"
							value={value}
							exid={exID}
							onChange={_handleRadioChange}
						>
							<RenderAnswer
								disabled={disabled}
								answers={answers ? answers : ''}
								multiple={multiple}
							/>
						</RadioGroup>
					) : (
						<RenderAnswer
							disabled={disabled}
							answers={answers ? answers : ''}
							multiple={multiple}
							exID={exID}
							handleChangeText={(e) =>
								handleChange_getText(
									e.target.getAttribute('exid'),
									e.target.value,
								)
							}
						/>
					)}
				</FormControl>
			</Box>
		</Box>
	);
};

export default Choice;
