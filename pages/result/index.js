import React, { useEffect, useState, useReducer } from 'react';
import { getLayout } from '~/components/Layout';
import Link from 'next/link';
import {
	Container,
	Grid,
	Link as LinkMU,
	ListItem,
	ListItemIcon,
	Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HorizontalCardCourse from '~/page-components/MyCourse/HorizontalCardCourse';
import { Pagination } from '@material-ui/lab';
import { colors } from '~/config';
import MyRanking from '~/page-components/Result/MyRanking';
import { randomId } from '~/utils';
import { resultDeadlineAPI } from '~/api/resultAPI';
import { resultFinishAPI } from '~/api/resultAPI';
import ReactPaginate from 'react-paginate';
import { rankStudy } from '~/api/resultAPI';
import { useAuth } from '~/api/auth.js';

const useStyles = makeStyles((theme) => ({
	tabWrap: {
		backgroundColor: 'transparent',
		boxShadow: '0px 1px 0px 0px #e1e1e1',
	},
	tabPanel: {
		'& > .MuiBox-root': {
			padding: '1.5rem 0',
		},
	},
	goalWrap: {
		background: `radial-gradient(${colors.primaryLighten}, ${colors.primary})`,
		color: '#fff',
		paddingBottom: '2rem',
		zIndex: '-1',
		position: 'relative',
	},
	label: {
		color: '#fff',
		fontWeight: '600',
	},
	value: {
		color: '#ccc',
		fontWeight: '400',
	},
	iconCourse: {
		width: 35,
		height: 35,
		color: colors.primaryLighten,
	},
	boxRanking: {
		[theme.breakpoints.down('xs')]: {
			paddingBottom: '40px',
		},
	},
}));

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

const a11yProps = (index) => ({
	id: `scrollable-force-tab-${index}`,
	'aria-controls': `scrollable-force-tabpanel-${index}`,
});

const ListCourseDeadline = ({ data, warningDate = false, offset, perPage }) => {
	return (
		<>
			{data.map((item) => (
				<Box key={item.ID} mb={2} component={'div'}>
					<HorizontalCardCourse data={item} />
				</Box>
			))}
		</>
	);
};

const ListCourseFinish = ({
	data,
	warningDate = false,
	offset,
	perPage,
	afterRating,
}) => {
	return (
		<>
			{data.map((item) => (
				<Box key={item.ID} mb={2} component={'div'}>
					<HorizontalCardCourse
						data={item}
						afterRating={(status) => afterRating(status)}
					/>
				</Box>
			))}
		</>
	);
};

// const ListCourseFinish = ({
// 	data,
// 	warningDate = false,
// 	offset,
// 	perPage,
// 	afterRating,
// }) => {
// 	return (
// 		<>
// 			{data.slice(offset, offset + perPage).map((item) => (
// 				<Box key={item.ID} mb={2} component={'div'}>
// 					<HorizontalCardCourse
// 						data={item}
// 						afterRating={(status) => afterRating(status)}
// 					/>
// 				</Box>
// 			))}
// 		</>
// 	);
// };

let PER_PAGE = 5;
let pageCount = null;

const initialState = {
	pageFinish: 1,
	pageDeadline: 1,
	TotalResultFinish: null,
	PageSizeFinish: null,
	TotalResultDeadline: null,
	PageSizeDeadline: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_PAGE_FINISH':
			return {
				...state,
				TotalResultFinish: action.res.TotalResult,
				PageSizeFinish: action.res.PageSize,
			};
		case 'ADD_PAGE_DEADLINE':
			return {
				...state,
				TotalResultDeadline: action.res.TotalResult,
				PageSizeDeadline: action.res.PageSize,
			};
		case 'SELECT_PAGE_FINISH':
			return {
				...state,
				pageFinish: action.page,
			};
		case 'SELECT_PAGE_DEADLINE':
			return {
				...state,
				pageDeadline: action.page,
			};
		default:
			throw new Error();
	}
};

const Result = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [resultDeadline, setResultDeadline] = useState();
	const [resultFinish, setResultFinish] = useState();
	const [currentPage, setCurrentPage] = useState(0);
	const [dataRank, setDataRank] = useState();
	const [statusRating, setStatusRating] = useState(false);

	const [test, setTest] = useState();

	const [state, dispatch] = useReducer(reducer, initialState);

	const router = useRouter();
	const { isAuthenticated, dataProfile, changeIsAuth } = useAuth();
	const [checkToken, setCheckToken] = useState();
	const token = isAuthenticated.token;

	useEffect(() => {
		if (localStorage.getItem('TokenUser') === null) {
			router.push({
				pathname: '/auth/login',
			});
		} else {
			if (checkToken === 0) {
				changeIsAuth();
			}
		}
	}, [checkToken]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// let offset = currentPage * PER_PAGE;

	// value === 0
	// 	? (pageCount = Math.ceil(resultFinish && resultFinish.length / PER_PAGE))
	// 	: (pageCount = Math.ceil(
	// 			resultDeadline && resultDeadline.length / PER_PAGE,
	// 	  ));

	// console.log('Page Count: ', pageCount);

	// function handlePageClick({ selected: selectedPage }) {
	// 	setCurrentPage(selectedPage);
	// 	setChecked(true);
	// }
	//---------

	useEffect(() => {
		setIsLoading(true);
		const t = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return () => clearTimeout(t);
	}, [value]);

	useEffect(() => {
		// Get result DEADLINE API
		(async () => {
			try {
				const res = await resultDeadlineAPI(state.pageFinish, token);
				res.Code === 1 && dispatch({ type: 'ADD_PAGE_FINISH', res }),
					setResultDeadline(res.Data);

				res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();

		// Get result  FINISH API
		(async () => {
			try {
				const res = await resultFinishAPI(state.pageDeadline, token);
				res.Code === 1 && dispatch({ type: 'ADD_PAGE_DEADLINE', res }),
					setResultFinish(res.Data),
					res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();

		// Get result rank API
		(async () => {
			try {
				const res = await rankStudy(token);
				res.Code === 1 && setDataRank(res.Data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [statusRating, state.page, isAuthenticated.isLogin]);

	return (
		<Container maxWidth={`xl`}>
			<h1 className="title-page">Kết quả học tập</h1>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={12} md={12} lg={8}>
					<AppBar position="static" color="default" className={classes.tabWrap}>
						<Tabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="off"
							indicatorColor="primary"
							textColor="primary"
							aria-label="scrollable force tabs example"
						>
							<Tab label="Khóa học đã hoàn thành" {...a11yProps(0)} />
							<Tab label="Khóa học sắp hết hạn" {...a11yProps(1)} />
						</Tabs>
					</AppBar>
					{isLoading ? (
						<TabPanel className={classes.tabPanel}>
							<Box mb={2} component={'div'}>
								<HorizontalCardCourse loading={isLoading} />
							</Box>
							<Box mb={2} component={'div'}>
								<HorizontalCardCourse loading={isLoading} />
							</Box>
							<Box mb={2} component={'div'}>
								<HorizontalCardCourse loading={isLoading} />
							</Box>
						</TabPanel>
					) : (
						<>
							<TabPanel value={value} index={0} className={classes.tabPanel}>
								<>
									{resultFinish?.length > 0 ? (
										<>
											<ListCourseFinish
												data={resultFinish && resultFinish}
												warningDate={true}
												// offset={offset}
												// perPage={PER_PAGE}
												afterRating={(status) => {
													setStatusRating(status);
												}}
											/>

											<Box display={`flex`} justifyContent={`center`} mt={4}>
												{/* <ReactPaginate
													previousLabel={'←'}
													nextLabel={'→'}
													pageCount={pageCount}
													onPageChange={handlePageClick}
													containerClassName={'paginate-wrap'}
													subContainerClassName={'paginate-inner'}
													pageClassName={'paginate-li'}
													pageLinkClassName={'paginate-a'}
													activeClassName={'paginate-active'}
													nextLinkClassName={'paginate-next-a'}
													previousLinkClassName={'paginate-prev-a'}
													breakLinkClassName={'paginate-break-a'}
												/> */}
												<Pagination
													count={Math.ceil(
														state?.TotalResultFinish / state?.PageSizeFinish,
													)}
													color="primary"
													onChange={(obj, page) =>
														dispatch({ type: 'SELECT_PAGE_FINISH', page })
													}
												/>
											</Box>
										</>
									) : (
										<p>Chưa có dữ liệu</p>
									)}
								</>
							</TabPanel>
							<TabPanel value={value} index={1} className={classes.tabPanel}>
								{resultDeadline?.length > 0 ? (
									<>
										<ListCourseDeadline
											data={resultDeadline && resultDeadline}
											warningDate={true}
											// offset={offset}
											// perPage={PER_PAGE}
										/>
										<Box display={`flex`} justifyContent={`center`} mt={4}>
											<Pagination
												count={Math.ceil(
													state?.TotalResultDeadline / state?.PageSizeDeadline,
												)}
												color="primary"
												onChange={(obj, page) =>
													dispatch({ type: 'SELECT_PAGE_DEADLINE', page })
												}
											/>
											{/* <ReactPaginate
												previousLabel={'←'}
												nextLabel={'→'}
												pageCount={pageCount}
												onPageChange={handlePageClick}
												containerClassName={'paginate-wrap'}
												subContainerClassName={'paginate-inner'}
												pageClassName={'paginate-li'}
												pageLinkClassName={'paginate-a'}
												activeClassName={'paginate-active'}
												nextLinkClassName={'paginate-next-a'}
												previousLinkClassName={'paginate-prev-a'}
												breakLinkClassName={'paginate-break-a'}
											/> */}
										</Box>
									</>
								) : (
									<p>Chưa có dữ liệu</p>
								)}
							</TabPanel>
						</>
					)}
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={4}>
					<Box className={classes.boxRanking}>
						<MyRanking dataRank={dataRank} isLoading={isLoading} />
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
Result.getLayout = getLayout;
export default Result;
