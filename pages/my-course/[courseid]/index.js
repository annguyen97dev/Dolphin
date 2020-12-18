import React, {
	useReducer,
	useEffect,
	createContext,
	useLayoutEffect,
	useState,
} from 'react';
import { useRouter } from 'next/router';
import { getLayout } from '~/components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Typography,
	Chip,
	Box,
	AppBar,
	Tooltip,
} from '@material-ui/core';
import {
	LocalLibrary,
	OndemandVideo,
	Assignment,
	ArrowRightAlt,
	KeyboardBackspace,
} from '@material-ui/icons';
import { colors } from '~/config';
import SectionGroup from '~/page-components/CourseDetail/SectionCourse';
import { randomId } from '~/utils';
import { useWindowSize } from '~/hooks/useWindowSize';
import {
	WhiteTab,
	WhiteTabs,
	a11yProps,
	TabPanel,
} from '~/page-components/CourseDetail/WhiteTabs';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Exercises from '~/page-components/CourseDetail/Exercises';

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
import { courseAPI } from '~api/courseAPI';

const videoPlaylistsDemo = [
	{
		sectionId: randomId(),
		sectionName: 'Section 1: Tổng quan hàng nhập',
		playlists: [
			{
				id: randomId(),
				title: 'Cơ cấu phòng và dịch vụ của phòng',
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Incoterm',
				videoUrl: 'https://www.youtube.com/watch?v=FjHGZj2IjBk',
				type: 2, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Vận đơn và các thuật ngữ trong logistics',
				videoUrl: 'https://www.youtube.com/watch?v=RYcaG64JkqM',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn lập file trên phàn mềm excel',
				videoUrl: 'https://www.youtube.com/watch?v=g8NVwN0_mks',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn submit MNF',
				videoUrl: 'https://www.youtube.com/watch?v=aG51brxM1kk',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
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
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Giới thiệu các loại hình vận chuyển quốc tế',
				videoUrl: 'https://www.youtube.com/watch?v=FjHGZj2IjBk',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Sơ đồ handle hàng và form',
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn viết mail báo handle hàng cho đại lý',
				videoUrl: 'https://www.youtube.com/watch?v=FjHGZj2IjBk',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Quy trình chi tiết handle hàng Air',
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Quy trình chi tiết handle hàng SEA',
				videoUrl: 'https://www.youtube.com/watch?v=FjHGZj2IjBk',
				type: 2, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
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
				videoUrl: 'https://www.youtube.com/watch?v=FjHGZj2IjBk',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn các viết mail check giá',
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
			{
				id: randomId(),
				title: 'Hướng dẫn đặc tính khách hàng trong quá trình handle hàng',
				videoUrl: 'https://www.youtube.com/embed/FDa5r8AvGig',
				type: 1, // 1 Bài học + bài tập || 2 Chỉ có bài tập
				timeLength: 30,
			},
		],
	},
];

const initialState = {
	isLoading: true,
	videoPlaylists: [],
	courseName: '',
	activeVideo: null,
	detailLesson: null,
	activeTab: 0,
	hideSidebar: false,
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
		display: 'flex',
		flexDirection: 'column',
	},
	tabPanel: {
		height: 'calc(var(--app-height) - 222px)',
		minHeight: 'calc(var(--app-height) - 222px)',
		overflow: 'auto',
	},
	contentEditor: {
		'& iframe': {
			width: '100%',
			minHeight: 450,
		},
	},
	[theme.breakpoints.down('md')]: {
		sidebarWrap: {
			position: 'absolute',
			zIndex: 2,
		},
		contentWrap: {
			position: 'relative',
			zIndex: 1,
		},
	},
}));

const reducer = (prevState, { type, payload }) => {
	switch (type) {
		case 'SET_VIDEO_SOURCE': {
			return {
				...prevState,
				videoPlaylists: payload, // arr
			};
		}
		case 'SET_COURSE': {
			return {
				...prevState,
				courseName: payload, // arr
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
	console.log('Video play list: ', videoPlaylists);
	return (
		<>
			{[...videoPlaylists].map((section) => (
				<SectionGroup
					key={`${section.ID}`}
					data={{
						groupName: section?.SectionName ?? '',
						meta: section.TotalTime,
						playlists: section.DataLesson,
					}}
				/>
			))}
		</>
	);
};

export const CourseContext = createContext({});

const CourseDetail = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();
	const { courseid } = router.query;
	const classes = useStyles();
	const { width, height } = useWindowSize();
	const [clickNew, setClickNew] = useState(false);

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
		dispatch({
			type: 'TOGGLE_SIDEBAR',
			payload: !state.hideSidebar,
		});
	};

	const _handleClickPlaylist = (video) => {
		setActiveVideo(video);
		setClickNew(true);
	};

	const responsiveSidebar = () => {
		if (window.matchMedia('(max-width: 1280px)').matches) {
			_toggleSidenav(false);
		}
	};

	useEffect(() => {
		let link = window.location.href;
		link = link.split('/');
		let courseID = link[link.length - 1];

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
							console.log('RUNNNNNNNNNNNNNNNNNNNN');
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

	useEffect(() => {}, [state.detailLesson]);

	const checkClickNew = () => {
		setClickNew(false);
	};

	return (
		<CourseContext.Provider
			value={{
				onClickLinkVideo: _handleClickPlaylist,
				activeVideo: state?.activeVideo,
				detailLesson: state?.detailLesson,
				checkDoing: checkClickNew,
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
									style={{
										fontWeight: 600,
										fontSize: '1.15rem',
										fontFamily: 'Roboto',
									}}
									color={`primary`}
								>
									Danh sách bài học
								</Typography>
							</Box>
							{/* <Typography
								component={`span`}
								style={{ color: '#b4b4b4', verticalAlign: 'middle' }}
							>
								Danh sách bài học
							</Typography> */}
						</Box>
						<Tooltip
							title={state.hideSidebar ? 'Hiện danh sách' : 'Ẩn danh sách'}
						>
							<IconButton
								edge="start"
								className={classes.menuButton}
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
							{state.courseName}
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
						<AppBar
							position="static"
							style={{
								backgroundColor: '#fff',
								boxShadow: '0px 4px 12px 0px rgba(0,0,0,.15)',
							}}
							component={`div`}
						>
							<Container maxWidth={`lg`}>
								<WhiteTabs
									value={
										!!state.activeVideo && state.activeVideo.Type === 1
											? state.activeTab
											: 0
									}
									onChange={setActiveTab}
									aria-label="Tab content"
									centered
									variant="fullWidth"
								>
									{!!state.activeVideo && state.activeVideo.Type === 1 && (
										<WhiteTab
											label="Bài học"
											icon={<OndemandVideo />}
											{...a11yProps(0)}
										/>
									)}

									<WhiteTab
										label={
											!!state.activeVideo && state.activeVideo.Type === 1
												? 'Bài quiz'
												: 'Bài thi'
										}
										icon={<Assignment />}
										{...a11yProps(1)}
									/>
								</WhiteTabs>
							</Container>
						</AppBar>
						{!!state.activeVideo && state.activeVideo.Type === 1 && (
							<TabPanel
								value={state.activeTab}
								index={0}
								className={classes.tabPanel}
							>
								<Box
									className={classes.contentEditor}
									dangerouslySetInnerHTML={{
										__html:
											state.detailLesson &&
											state.detailLesson.DataBaiHoc &&
											state.detailLesson.DataBaiHoc.LessonContent
												? state.detailLesson.DataBaiHoc.LessonContent
												: '',
									}}
								></Box>
							</TabPanel>
						)}

						<TabPanel
							value={
								!!state.activeVideo && state.activeVideo.Type === 1
									? state.activeTab
									: 1
							}
							index={1}
							className={classes.tabPanel}
						>
							<Exercises
								dataQuiz={
									state.detailLesson ? state.detailLesson.ListCauHoi : ''
								}
								dataLesson={state.detailLesson && state.detailLesson}
								lessonID={state.detailLesson && state.detailLesson.LessonID}
								clickNew={clickNew}
							/>
						</TabPanel>
					</Box>
				</Box>
			</Container>
		</CourseContext.Provider>
	);
};

CourseDetail.getLayout = getLayout;

export default CourseDetail;
