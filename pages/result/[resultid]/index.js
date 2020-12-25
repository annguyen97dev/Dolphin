import React, {
	useReducer,
	useEffect,
	createContext,
	useLayoutEffect,
} from 'react';
import { useRouter } from 'next/router';
import { getLayout } from '~/components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Chip, Box, Tooltip } from '@material-ui/core';
import {
	Menu,
	LocalLibrary,
	ArrowRightAlt,
	KeyboardBackspace,
} from '@material-ui/icons';
import { colors } from '~/config';
import ResultSection from '~/page-components/Result/ResultDetail/ResultSection';
import { randomId } from '~/utils';
import { useWindowSize } from '~/hooks/useWindowSize';

import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import ExerciseResult from '~/page-components/Result/ResultDetail/ExerciseResult';
import Paper from '@material-ui/core/Paper';
import { courseAPI } from '~api/courseAPI';

const contentDemo = `<h2>What is a CSS Sprite</h2>
<p>We need to know about an image sprite before we start talking about CSS sprites. An image sprite is a compilation of different image assets that we want to use on our web application.</p>
<p>These images could fit in any of the below given cases…</p>
<ul>
<li>Icon assets like social media, fancy bullets etc.</li>
<li>Different states for a button roll-over</li>
<li>A fixed background eg. a logo</li>
</ul>
<iframe src="https://www.youtube.com/embed/72RKuc7Vbk0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>After generating a spritesheet, we can use it further in our UI with the help of some simple CSS properties.</p>
<p>It’s also that using image sprites doesn’t fit in the modern-day web designer’s workflow. People now consider using icon fonts or <a>SVG sprites</a> rather than using CSS image sprites.</p>
<h2>Why use CSS Sprites?</h2>
<iframe src="https://www.youtube.com/embed/sAcj8me7wGI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Whenever you open a website in your web browser, all its files eg. HTML, JavaScript, images etc. start to load up.</p>
<p>More the files, more will be the number of requests made to load the website in the browser. </p>
<p>More the requests, more will be the load time of the website. Now, this high load time is the enemy of UX and SEO.</p>`;

import { courseSectionAPI } from '~/api/courseAPI';
import { detailLessonAPI } from '~/api/courseAPI';

const exerciseLists = [
	{
		sectionId: randomId(),
		sectionName: 'Section 1: Tổng quan hàng nhập',
		playlists: [
			{
				id: randomId(),
				title: 'Cơ cấu phòng và dịch vụ của phòng',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 7.5,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Incoterm',
				typeQuestion: 2,
				lastUpdated: '20/07/2020',
				score: 6,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Vận đơn và các thuật ngữ trong logistics',
				typeQuestion: 2,
				lastUpdated: '20/07/2020',
				score: 7,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn lập file trên phàn mềm excel',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: null,
				finished: false,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn submit MNF',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: null,
				finished: false,
			},
		],
	},
	{
		sectionId: randomId(),
		sectionName: 'Section 2: Quy trình làm hàng nhập',
		playlists: [
			{
				id: randomId(),
				title: 'Hướng dẫn quy trình làm document hàng Air + SEA',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Giới thiệu các loại hình vận chuyển quốc tế',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Sơ đồ handle hàng và form',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn viết mail báo handle hàng cho đại lý',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Quy trình chi tiết handle hàng Air',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Quy trình chi tiết handle hàng SEA',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
		],
	},
	{
		sectionId: randomId(),
		sectionName: 'Section 3: Hướng dẫn bổ sung',
		playlists: [
			{
				id: randomId(),
				title: 'Các luồng tuyến chính + thời gian vận chuyển',
				typeQuestion: 2,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn các viết mail check giá',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn đặc tính khách hàng trong quá trình handle hàng',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: null,
				finished: false,
			},
		],
	},
	{
		sectionId: randomId(),
		sectionName: 'Section 4: Complete deploy app on Heroku !',
		playlists: [
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
			{
				id: randomId(),
				title: 'How to play e-learning web application',
				typeQuestion: 1,
				lastUpdated: '20/07/2020',
				score: 8,
				finished: true,
			},
		],
	},
];

const initialState = {
	isLoading: true,
	videoPlaylists: [],
	activeVideo: null,
	detailLesson: null,
	activeTab: 0,
	hideSidebar: false,
	courseName: '',
};

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
		color: '#000',
	},
	progressBar: {
		height: '4px',
		borderRightTopRadius: 4,
		borderRightBottomRadius: 4,
		backgroundColor: colors.primary,
		width: 0,
		position: 'absolute',
		bottom: '-2px',
		left: 0,
	},
	summaryBar: {
		position: 'relative',
		paddingLeft: '1rem',
		width: 400,
		flexShrink: 0,
		transition: 'width .3s ease',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
		'&.closed': {
			width: 70,
			[theme.breakpoints.down('xs')]: {
				width: 55,
			},
			paddingLeft: 0,
			justifyContent: 'center',
			'& .summary, & .progressbar': {
				display: 'none',
			},
			'& .MuiIconButton-root': {
				marginRight: 0,
				marginLeft: 0,
			},
		},
	},

	sidebarWrap: {
		width: 400,
		flexShrink: 0,
		overflowX: 'hidden',
		overflowY: 'auto',
		backgroundColor: '#fff',
		boxShadow: 'rgba(0,0,0, .075)',
		transition: 'width .3s ease',
		height: 'calc(var(--app-height) - 174px)',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
		'&.closed': {
			width: 0,
		},
		'& .MuiAccordion-root.Mui-expanded:first-child': {
			marginBottom: 0,
		},
		'& .MuiAccordion-root.Mui-expanded': {
			margin: 0,
		},
		'& .MuiAccordionSummary-content.Mui-expanded, & .MuiAccordionSummary-content': {
			margin: 0,
		},
	},
	videoWrap: {
		position: 'relative',
	},
	contentWrap: {
		flexGrow: 1,
		height: 'calc(var(--app-height) - 174px)',
		overflow: 'auto',
		padding: '2rem 0',
	},

	contentEditor: {
		'& iframe': {
			width: '100%',
			minHeight: 450,
		},
	},
}));

const reducer = (prevState, { type, payload }) => {
	switch (type) {
		case 'SET_COURSE': {
			return {
				...prevState,
				courseName: payload, // arr
			};
		}
		case 'SET_VIDEO_SOURCE': {
			return {
				...prevState,
				videoPlaylists: payload, // arr
			};
		}
		case 'SET_LOADING': {
			return {
				...prevState,
				isLoading: payload, // bool
			};
		}
		case 'SET_ACTIVE_VIDEO': {
			return {
				...prevState,
				activeVideo: payload,
			};
		}
		case 'SET_ACTIVE_TAB': {
			return {
				...prevState,
				activeTab: payload,
			};
		}
		case 'TOGGLE_SIDEBAR': {
			return {
				...prevState,
				hideSidebar: payload,
			};
		}
		case 'GET_DETAIL_LESSON': {
			return {
				...prevState,
				detailLesson: payload,
			};
		}
		default:
			return prevState;
	}
};

const Playlists = ({ videoPlaylists }) => {
	return (
		<>
			{[...videoPlaylists].map((section) => (
				<ResultSection
					key={`${section.sectionId}`}
					data={{
						groupName: section?.SectionName ?? '',
						// meta: `Đã hoàn thành: ${
						// 	section.DataLesson.filter((item) => item.TypeFinished === 1)
						// 		.length
						// } / ${section.playlists.length}`,
						meta: `Tổng thời lượng: ${section.TotalTime} phút`,
						playlists: section.DataLesson,
						score: section.Point,
					}}
				/>
			))}
		</>
	);
};

export const CourseContext = createContext({});

const ResultDetail = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();
	const { courseid } = router.query;
	const classes = useStyles();
	const { width, height } = useWindowSize();
	const setLoading = (value) => {
		dispatch({ type: 'SET_LOADNG', payload: value });
	};

	const getDeitalLesson = async (lessonID) => {
		try {
			const res = await detailLessonAPI({ lessonID });
			res.Code === 1
				? dispatch({ type: 'GET_DETAIL_LESSON', payload: res.Data })
				: alert('Lỗi !!! ');
		} catch (error) {
			console.log(error);
		}
	};

	const setActiveVideo = (video) => {
		let lessonID = video.ID;
		getDeitalLesson(lessonID);
		dispatch({ type: 'SET_ACTIVE_VIDEO', payload: video });
	};

	const setActiveTab = (event, newValue) => {
		dispatch({ type: 'SET_ACTIVE_TAB', payload: newValue });
	};

	const _toggleSidenav = () => {
		dispatch({ type: 'TOGGLE_SIDEBAR', payload: !state.hideSidebar });
	};

	const _handleClickPlaylist = (video) => {
		setActiveVideo(video);
	};

	const responsiveSidebar = () => {
		if (window.matchMedia('(max-width: 1280px)').matches) {
			_toggleSidenav(false);
		}
	};

	console.log('COURSE NAME: ', state.courseName);

	// useEffect(() => {
	// 	dispatch({ type: 'SET_VIDEO_SOURCE', payload: exerciseLists });
	// 	setTimeout(() => setLoading(false), 2000);
	// }, []);

	useEffect(() => {
		let link = window.location.href;
		link = link.split('/');
		let courseID = parseInt(link[link.length - 1]);

		// Get course section API
		(async () => {
			try {
				const res = await courseSectionAPI({ courseID });
				res.Code === 1
					? dispatch({ type: 'SET_VIDEO_SOURCE', payload: res.Data })
					: '';
			} catch (error) {
				console.log(error);
			}
		})();

		// Get course API
		(async () => {
			try {
				const res = await courseAPI();
				if (res.Code === 1) {
					courseID = parseInt(courseID);
					res.Data.forEach((item) => {
						if (item.ID === courseID) {
							dispatch({ type: 'SET_COURSE', payload: item.CourseName });
						}
					});
				}
			} catch (error) {
				console.log(error);
			}
		})();

		setTimeout(() => setLoading(false), 2000);
		window.addEventListener('resize', responsiveSidebar);
		return () => {
			window.removeEventListener('resize', responsiveSidebar);
		};
	}, []);

	useEffect(() => {
		if (!!!state.videoPlaylists || !!!state.videoPlaylists[0]?.DataLesson[0])
			return;
		setActiveVideo(state.videoPlaylists[0].DataLesson[0]);
	}, [state.videoPlaylists]);

	useEffect(() => {
		window.addEventListener('resize', responsiveSidebar);
		return () => {
			window.removeEventListener('resize', responsiveSidebar);
		};
	}, []);

	return (
		<CourseContext.Provider
			value={{
				onClickLinkVideo: _handleClickPlaylist,
				activeVideo: state?.activeVideo,
				detailLesson: state?.detailLesson,
			}}
		>
			<Container maxWidth={`xl`} spacing={0} style={{ padding: 0 }}>
				<Box display={`flex`} style={{ backgroundColor: '#fff', height: 50 }}>
					<Box
						display={`flex`}
						justifyContent={`space-between`}
						alignItems={`center`}
						border={1}
						style={{ borderColor: '#e1e1e1', borderRight: 0 }}
						className={`${classes.summaryBar} ${
							!!state.hideSidebar ? 'closed' : ''
						}`}
					>
						<Box className={`summary`}>
							<Box
								display={`inline-block`}
								pr={2}
								style={{ verticalAlign: 'middle' }}
							>
								<Typography
									style={{ fontWeight: 600, fontSize: '1.15rem' }}
									color={`primary`}
								>
									25 / 45
								</Typography>
							</Box>
							<Typography
								component={`span`}
								style={{ color: '#b4b4b4', verticalAlign: 'middle' }}
							>
								Đã hoàn thành
							</Typography>
						</Box>
						<Tooltip
							title={state.hideSidebar ? 'Hiện danh sách' : 'Ẩn danh sách'}
						>
							<IconButton
								edge="start"
								className={classes.menuButton}
								size="small"
								color="inherit"
								aria-label="sidenav"
								onClick={_toggleSidenav}
								disableRipple={true}
							>
								{state.hideSidebar ? (
									<ArrowRightAlt style={{ fontSize: 30 }} />
								) : (
									<KeyboardBackspace style={{ fontSize: 30 }} />
								)}
							</IconButton>
						</Tooltip>
						<Box
							component={`span`}
							className={classes.progressBar + ` progressbar`}
							style={{ width: '50%' }}
						/>
					</Box>
					<Box
						pl={2}
						border={1}
						style={{ borderColor: '#e1e1e1', overflow: 'hidden' }}
						flexGrow={1}
						display={`flex`}
						alignItems={`center`}
					>
						<Hidden smDown>
							<Box mr={2}>
								<Chip
									label="Khóa học"
									color="primary"
									size="small"
									icon={<LocalLibrary />}
								/>
							</Box>
						</Hidden>
						<Typography
							variant={`h5`}
							component="h1"
							noWrap={true}
							className={classes.courseName}
						>
							{state.courseName && state.courseName}
						</Typography>
					</Box>
				</Box>
				<Box display={`flex`}>
					<Box
						className={`${classes.sidebarWrap} ${
							!!state.hideSidebar ? 'closed' : ''
						}`}
					>
						<Playlists videoPlaylists={state?.videoPlaylists ?? []} />
					</Box>
					<Box className={classes.contentWrap}>
						<Container maxWidth={`lg`}>
							<Paper>
								<Box p={2}>
									<ExerciseResult
										dataQuiz={
											state.detailLesson ? state.detailLesson.ListCauHoi : ''
										}
										dataLesson={state.detailLesson && state.detailLesson}
										lessonID={state.detailLesson && state.detailLesson.LessonID}
									/>
								</Box>
							</Paper>
						</Container>
					</Box>
				</Box>
			</Container>
		</CourseContext.Provider>
	);
};

ResultDetail.getLayout = getLayout;

export default ResultDetail;
