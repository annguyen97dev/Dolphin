import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, Link, Typography } from '@material-ui/core';
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
import { CourseContext } from '~/pages/my-course/[courseid]';

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
		'&:hover': {
			color: theme.palette.primary.main,
		},
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
}));

const ListItem = ({ data, onClickLink, onCheckbox }) => {
	const classes = useStyles();
	const { ID, LessonName, completed = false, Type } = data;
	const [checked, setChecked] = useState(completed);

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
							onClick={() => context.onClickLinkVideo(data)}
							className={classes.titleVideo}
						>
							<Typography>{LessonName}</Typography>
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
			)}
		</CourseContext.Consumer>
	);
};

const RenderListItem = ({ data }) => {
	return (
		<>
			{data.map((item, index) => (
				<ListItem
					key={`${item.ID}`}
					data={{
						...item,
						title: `${index + 1}. ${item.LessonName}`,
					}}
				/>
			))}
		</>
	);
};

const SectionGroup = ({ data: { groupName, meta, playlists, score } }) => {
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
				<RenderListItem data={playlists} />
			</AccordionDetails>
		</Accordion>
	);
};

export default SectionGroup;
