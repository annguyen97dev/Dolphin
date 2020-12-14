import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, Link, Typography } from '@material-ui/core';
import {
	ArrowDropDown,
	PlayCircleFilled,
	Description,
	LibraryAddCheck,
} from '@material-ui/icons';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import { randomId } from '~/utils';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import { CourseContext } from '~/pages/result/[resultid]';
import { colors } from '~/config';

const useStyles = makeStyles((theme) => ({
	secWrap: {
		backgroundColor: '#F5F5F5',
		padding: '0.75rem 1rem',
		borderBottom: '1px solid #e1e1e1',
	},
	title: {
		fontSize: '1rem',
		fontWeight: '600',
	},
	meta: {
		fontSize: '0.875rem',
		marginTop: 3,
		color: '#707070',
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
	checkboxDisabled: {
		color: `${colors.green} !important`,
	},
	Point: {
		backgroundColor: '#e6e6e6',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 45,
		height: 45,
		borderRadius: 45 / 2,
		flexShrink: 0,
		'&.finished': {
			backgroundColor: `#FFE05D`,
			backgroundImage: `linear-gradient(62deg, #FBAB7E 0%, #FFE05D 25%)`,
		},
	},
}));

const ListItem = ({ data, onClickLink, onCheckbox }) => {
	const classes = useStyles();
	const { id = 0, title = '', type = 1, finished = false, Point } = data;
	const [checked, setChecked] = useState(finished);

	const _handleCheckbox = (event) => {
		setChecked(event.target.checked);
		//	onCheckbox(event.target.checked)
	};
	const _handleLinkClick = (event) => {
		onClickLink(data);
	};
	return (
		<CourseContext.Consumer>
			{(context) => {
				return (
					<Box
						display={`flex`}
						alignItems={`flex-start`}
						className={`${classes.itemContainer} ${
							context?.activeVideo?.id === id ? 'actived' : ''
						}`}
					>
						<Box className={`${classes.Point} ${finished ? 'finished' : ''}`}>
							<Typography variant={`h6`}>{Point}</Typography>
						</Box>
						<Box ml={1.5}>
							<Link
								onClick={() => context?.onClickLinkVideo(data)}
								className={classes.titleVideo}
							>
								<Typography>{title}</Typography>
							</Link>
							<Box
								display={`flex`}
								alignItems={`center`}
								justifyContent={`space-between`}
								className={classes.meta}
								style={{ fontSize: '0.875rem' }}
							>
								<Box>
									{type === 1 ? (
										<Box display={`flex`} alignItems={`center`}>
											<LibraryAddCheck className={classes.metaIcon} />
											<Box ml={0.5}>Trắc nghiệm</Box>
										</Box>
									) : (
										<Box display={`flex`} alignItems={`center`}>
											<Description className={classes.metaIcon} />
											<Box ml={0.5}>Tự luận</Box>
										</Box>
									)}
								</Box>
							</Box>
						</Box>
					</Box>
				);
			}}
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
						type: item.TypeName,
					}}
				/>
			))}
		</>
	);
};

const ResultSection = ({ data: { groupName, meta, playlists, Point } }) => {
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
						<Typography
							component={`p`}
							className={classes.meta}
							style={{ color: colors.green }}
						>
							{meta}
						</Typography>
					</Box>
				</Box>
				<Box className={classes.secBody}></Box>
			</AccordionSummary>
			<AccordionDetails className={classes.listBody}>
				<RenderListItem data={playlists} Point={Point} />
			</AccordionDetails>
		</Accordion>
	);
};

export default ResultSection;
