import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Divider,
	IconButton,
	Typography,
	Link as LinkMU,
} from '@material-ui/core';
import Link from 'next/link';
import {
	ArrowDropDown,
	PlayCircleFilled,
	Description,
	Bookmark,
} from '@material-ui/icons';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import { randomId } from '~/utils';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import { useCourse } from '~/pages/my-course/[courseid]';
import { CourseContext } from '~/pages/my-course/[courseid]';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	secWrap: {
		backgroundColor: '#F5F5F5',
		padding: '0.75rem 1rem',
		borderBottom: '1px solid #e1e1e1',
	},
	title: {
		fontSize: '1rem',
		fontWeight: 600,
	},
	meta: {
		fontSize: '0.875rem',
		color: '#b4b4b4',
	},
	titleVideo: {
		fontSize: '1rem',
		color: '#000',
	},
	listBody: {
		display: 'block',
		padding: 0,
	},
	metaIcon: {
		fontSize: '1rem',
	},
	itemContainer: {
		padding: '0.75rem',
		borderBottom: '1px solid #e1e1e1',
		'&.actived': {
			backgroundColor: 'rgba(0, 108, 255, 0.08)',
		},
	},
	modal: {
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
		fontSize: '16px',
		fontWeight: '500',
	},
	mgBtn: {
		marginRight: '10px',
	},
}));

const ListItem = ({ data, onClickLink, courseID }) => {
	const classes = useStyles();
	const { ID, LessonName, IsDone, Type } = data;
	const [checked, setChecked] = useState(IsDone);
	const [open, setOpen] = React.useState(false);

	const { onClickLinkVideo, doingQuiz } = useCourse();

	const handleOpen = () => {
		doingQuiz ? setOpen(true) : onClickLinkVideo(data);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleMove = () => {
		setOpen(false);
		onClickLinkVideo(data);
	};

	const _handleCheckbox = (event) => {
		setChecked(event.target.checked);
		//	onCheckbox(event.target.checked)
	};
	const _handleLinkClick = (event) => {
		onClickLink(data);
	};
	return (
		<CourseContext.Consumer>
			{(context) => (
				<>
					<Box
						display={`flex`}
						alignItems={`flex-start`}
						className={`${classes.itemContainer} ${
							context?.activeVideo?.ID === ID ? 'actived' : ''
						}`}
					>
						<Checkbox
							checked={checked}
							onChange={_handleCheckbox}
							color="primary"
							inputProps={{ 'aria-label': 'primary checkbox' }}
						/>
						<Box ml={1.5}>
							<Link
								// onClick={handleOpen}
								href="/my-course/[courseid]"
								as={`/my-course/${courseID}/?${ID}`}
								passHref
							>
								<LinkMU className={classes.titleVideo}>
									<Typography>{LessonName}</Typography>
								</LinkMU>
							</Link>
							<Box
								display={`flex`}
								alignItems={`center`}
								className={classes.meta}
								style={{ fontSize: '0.875rem', marginTop: 3 }}
							>
								{Type === 1 ? (
									<>
										<Bookmark className={classes.metaIcon} />
										<Box ml={0.5}>Bài học</Box>
										<Divider
											mx={0.5}
											orientation={`vertical`}
											style={{ margin: '0 0.5rem', height: 15 }}
										/>
										<Description className={classes.metaIcon} />
										<Box ml={0.5}>Bài quiz</Box>
									</>
								) : (
									<>
										<Description className={classes.metaIcon} />
										<Box ml={0.5}>Bài thi</Box>
									</>
								)}
							</Box>
						</Box>
					</Box>
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
									Bài quiz sẽ không được lưu lại nếu bạn thoát ra <br></br> Bạn
									có chắc chắn muốn thoát không?
								</p>
								<div className={classes.boxBtn}>
									<Button
										className={classes.mgBtn}
										variant="contained"
										color="primary"
										onClick={handleMove}
									>
										OK
									</Button>
									<Button
										onClick={handleClose}
										variant="contained"
										color="default"
									>
										Cancel
									</Button>
								</div>
							</div>
						</Fade>
					</Modal>
				</>
			)}
		</CourseContext.Consumer>
	);
};

const RenderListItem = ({ data, courseID }) => {
	return (
		<>
			{data.map((item, index) => (
				<ListItem
					key={`${item.ID}`}
					data={{
						...item,
						title: `${index + 1}. ${item.LessonName}`,
					}}
					courseID={courseID}
				/>
			))}
		</>
	);
};

const SectionGroup = ({
	data: { groupName, meta, playlists, score, courseID },
	doingQuiz,
}) => {
	const classes = useStyles();
	return (
		<Accordion
			elevation={0}
			TransitionProps={{ unmountOnExit: true }}
			defaultExpanded={true}
		>
			<AccordionSummary
				expandIcon={<ArrowDropDown />}
				IconButtonProps={{
					size: 'medium',
					style: { color: '#000' },
				}}
				className={classes.secWrap}
			>
				<Box className={classes.secHeader}>
					<Box>
						<Typography component={`h3`} className={classes.title}>
							{groupName}
						</Typography>
						<Typography component={`p`} className={classes.meta}>
							{meta}
						</Typography>
					</Box>
				</Box>
				<Box className={classes.secBody}></Box>
			</AccordionSummary>
			<AccordionDetails className={classes.listBody}>
				<RenderListItem data={playlists} courseID={courseID} />
			</AccordionDetails>
		</Accordion>
	);
};

export default SectionGroup;
