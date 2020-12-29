import React, { useEffect, useState, useReducer } from 'react';
import { getLayout } from '~/components/Layout';
import Link from 'next/link';
import {
	Container,
	Grid,
	Link as LinkMU,
	List,
	ListItem,
	ListItemIcon,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import HorizontalCardCourse from '~/page-components/MyCourse/HorizontalCardCourse';
import { Pagination } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import { colors } from '~/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LibraryBooksRounded } from '@material-ui/icons';
import { randomId } from '~/utils';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { MyFilledInput } from '~/components/common/Input';
import ReactPaginate from 'react-paginate';
import { courseAPI } from '~/api/courseAPI';
import { courseGroupAPI } from '~/api/courseAPI';
import { studyingAPI } from '~/api/resultAPI';
import { outcomeAPI } from '~/api/resultAPI';

export const courseDemo = [
	{
		courseId: randomId(),
		src: null,
		courseName: 'Bộ phận hàng nhập trong công ty',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 15,
		totalVideo: 45,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo nhân viên mới',
		categoryId: 1,
	},
	{
		courseId: randomId(),
		src: null,
		courseName: 'Ứng dụng của Microsoft Office',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 35,
		totalVideo: 38,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo kỹ năng cơ bản',
		categoryId: 2,
	},
	{
		courseId: randomId(),
		src: null,
		courseName: 'Kỹ năng làm MS PowerPoint',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 35,
		totalVideo: 38,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo kỹ năng cơ bản',
		categoryId: 2,
	},
	{
		courseId: randomId(),
		src: null,
		courseName: 'Ứng dụng của Microsoft Office',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 35,
		totalVideo: 38,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo kỹ năng cơ bản',
		categoryId: 2,
	},
	{
		courseId: randomId(),
		src: null,
		courseName: 'Inferring dimensions Finished Course',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 25,
		totalVideo: 50,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo nghiệp vụ nâng cao',
		categoryId: 3,
	},
	{
		courseId: randomId(),
		src: null,
		courseName: 'Kỹ năng cần có của trường nhóm (TEAM LEARDER)',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 33,
		totalVideo: 78,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo quản lý cấp trung',
		categoryId: 4,
	},

	{
		courseId: randomId(),
		src: null,
		courseName: 'Kỹ năng đánh giá và quy hoạch nhân sự',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 37,
		totalVideo: 37,
		totalExercise: 45,
		finishedExercise: 45,
		finished: true,
		categoryName: 'Đào tạo quản lý cấp cao',
		categoryId: 5,
	},
];

const RowItem = ({ item }) => {
	const classes = makeStyles({
		rowStyle: {
			borderBottom: '1px solid #e1e1e1',
		},
		leftIcon: {
			width: 30,
			height: 30,
			color: colors.primaryLighten,
		},
		rightIcon: {
			fontSize: 48,
		},
		link: {
			color: '#000',
			'&:hover': {
				color: colors.primary,
			},
		},
		deadline: {
			fontWeight: 600,
			letterSpacing: 1,
			fontFamily: 'Roboto',
		},
	})();
	return (
		<ListItem className={classes.rowStyle}>
			<ListItemIcon>
				<LibraryBooksRounded className={classes.leftIcon} />
			</ListItemIcon>
			<Box>
				<Link
					href={`/my-course/${item.ID}`}
					as={`/my-course/${item.ID}`}
					passHref
				>
					<LinkMU className={classes.link}>
						<Typography variant={`subtitle2`}>{item.LessonName}</Typography>
					</LinkMU>
				</Link>

				<Box component={`div`} display={`flex`}>
					<Typography
						variant={`caption`}
						component={`span`}
						color="textSecondary"
						style={{ marginRight: 5 }}
					>
						Hạn nộp:
					</Typography>
					<Typography
						variant={`caption`}
						component={`span`}
						color="textSecondary"
						className={classes.deadline}
					>
						{item.HanNop}
					</Typography>
				</Box>
			</Box>
			{/*<ListItemText*/}
			{/*	primary={item.courseName}*/}
			{/*	secondary={`Deadline: ${item.deadline}`}*/}
			{/*/>*/}
		</ListItem>
	);
};

const RenderRow = ({ lists }) => {
	return [...lists].map((item, index) => (
		<RowItem key={`${index}`} item={item} />
	));
};

const CircularProgressWithLabel = (props) => {
	return (
		<Box position="relative" display="inline-flex">
			<Box top={0} left={0} bottom={0} right={0} position="absolute">
				<CircularProgress
					variant="static"
					{...props}
					style={{ color: 'rgba(255,255,255,.35)' }}
					value={100}
				/>
			</Box>
			<CircularProgress variant="static" {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				{!!props.number && !!props.totalnumber && (
					<Box align={`center`}>
						<Typography
							variant="h5"
							component="div"
							fontSize="large"
							style={{ fontWeight: 600 }}
						>
							{`${Math.round(props?.number ?? 0)} / ${Math.round(
								props?.totalnumber ?? 0,
							)}`}
						</Typography>
						{!!props.label && (
							<Typography variant={'subtitle1'} style={{ color: '#fff' }}>
								{props.label}
							</Typography>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
};

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
		fontWeight: 400,
	},
	value: {
		color: '#fff',
		fontWeight: 600,
	},
	iconCourse: {
		width: 35,
		height: 35,
		color: colors.primaryLighten,
	},
	formControl: {
		minWidth: 200,
		marginRight: '1rem',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			marginBottom: '1rem',
			marginRight: 0,
		},
		'& .MuiSelect-select:focus': {
			backgroundColor: '#fff',
		},
	},
	select: {
		backgroundColor: '#fff',
		borderRadius: 4,
		'&:hover': {
			backgroundColor: '#fff',
		},
		'&:before, &:after': {
			display: 'none',
		},
	},
}));

// const ListCourse = ({ data }) => {
// 	return (
// 		<>
// 			{[...data].map((item) => (
// 				<Box key={`${item.ID}`} mb={2} component={'div'}>
// 					<HorizontalCardCourse
// 						courseName={item.courseName}
// 						time={item.CourseDuration}
// 						finishedVideo={item.finishedVideo}
// 						totalVideo={item.totalVideo}
// 						finished={item.finished}
// 						courseId={item.ID}
// 						finishedExercise={item.finishedExercise}
// 						totalExercise={item.totalExercise}
// 						src={item.src}
// 						category={item.categoryName}
// 					/>
// 				</Box>
// 			))}
// 		</>
// 	);
// };

const ListCourse = ({ data, loading, offset, perPage, afterRating }) => {
	return data.map((item) => {
		return (
			<Box key={item.ID} mb={2} component={'div'}>
				<HorizontalCardCourse
					data={item}
					loading={loading}
					afterRating={(status) => afterRating(status)}
				/>
			</Box>
		);
	});
};

const RenderSelectOption = ({ data }) => {
	return (
		<>
			{data.map((item) => (
				<option key={`${item.ID}`} value={item.ID}>
					{item.GroupName}
				</option>
			))}
		</>
	);
};

const initialState = {
	page: 1,
	TotalResult: null,
	PageSize: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_PAGE':
			return {
				...state,
				TotalResult: action.res.TotalResult,
				PageSize: action.res.PageSize,
			};
		case 'SELECT_PAGE':
			return {
				...state,
				page: action.page,
			};
		default:
			throw new Error();
	}
};

const MyCourse = () => {
	const classes = useStyles();

	const [filterValue, setFilterValue] = useState(0);
	const [statusRating, setStatusRating] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = React.useState('');

	const [dataCourse, setDataCourse] = useState();
	const [courseGroup, setCourseGroup] = useState();

	const [checked, setChecked] = React.useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [dataStudying, setDataStudying] = useState();
	const [dataOutCome, setDataOutCome] = useState();

	const [state, dispatch] = useReducer(reducer, initialState);

	console.log('STATE: ', state);

	const handleFilterChange = (event) => {
		const categoryID = parseInt(event.target.value);
		setFilterValue(categoryID);
	};

	// Pagination post
	// const PER_PAGE = 5;
	// const offset = currentPage * PER_PAGE;

	// const pageCount = Math.ceil(dataCourse && dataCourse.length / PER_PAGE);

	// function handlePageClick({ selected: selectedPage }) {
	// 	setCurrentPage(selectedPage);
	// 	setChecked(true);
	// }
	//---------

	useEffect(() => {
		// Get Group Course API
		(async () => {
			try {
				const res = await courseGroupAPI();
				res.Code === 1 && setCourseGroup(res.Data), setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();

		// Get result Studying API
		(async () => {
			try {
				const res = await studyingAPI();
				res.Code === 1 ? setDataStudying(res.Data) : '';
			} catch (error) {
				console.log(error);
			}
		})();

		// Get result thanh tich API
		(async () => {
			try {
				const res = await outcomeAPI();
				res.Code === 1 ? setDataOutCome(res.Data) : '';
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		// Get course APi
		console.log('Start GET COURSE API');
		(async () => {
			try {
				const res = await courseAPI(filterValue, state.page);
				res.Code === 1 && setDataCourse(res.Data),
					setIsLoading(false),
					dispatch({ type: 'ADD_PAGE', res });
			} catch (error) {
				console.log(error);
			}
		})();
	}, [filterValue, statusRating, state.page]);

	React.useEffect(() => {
		// Get course APi

		if (searchTerm) {
			(async () => {
				try {
					const res = await courseAPI();
					if (res.Code === 1) {
						const cloneData = res.Data.filter((course) =>
							course.CourseName.toLowerCase().includes(
								searchTerm.toLowerCase(),
							),
						);
						setDataCourse(cloneData);
					}
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			(async () => {
				try {
					const res = await courseAPI();
					res.Code === 1 && setDataCourse(res.Data), setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			})();
		}

		// const results =
		// 	dataCourse &&
		// 	(!searchTerm
		// 		? dataCourse
		// 		: dataCourse.filter((course) =>
		// 				course.CourseName.toLowerCase().includes(searchTerm),
		// 		  ));

		// setDataCourse(results);
	}, [searchTerm]);

	return (
		<>
			<Box my={4}>
				<Container maxWidth={`xl`}>
					<h1 className="title-page">Khóa học của tôi</h1>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={12} md={12} lg={8}>
							<Box
								mb={2}
								pb={2}
								display={`flex`}
								alignItems={`center`}
								flexWrap={`wrap`}
								style={{ borderBottom: '1px solid #e1e1e1' }}
							>
								<FormControl variant="filled" className={classes.formControl}>
									<InputLabel shrink htmlFor="filter-category">
										Danh mục khóa học
									</InputLabel>
									<Select
										disabled={isLoading}
										native
										value={filterValue}
										onChange={handleFilterChange}
										className={classes.select}
										inputProps={{
											name: 'category',
											id: 'filter-category',
										}}
									>
										{
											<RenderSelectOption
												data={courseGroup ? courseGroup : []}
											/>
										}
									</Select>
								</FormControl>
								<FormControl variant="filled" className={classes.formControl}>
									<InputLabel shrink htmlFor="search-course">
										Tìm kiếm khóa học
									</InputLabel>
									<MyFilledInput
										id="search-course"
										type={'text'}
										text={`Search`}
										value={''}
										className={classes.select}
										handleSearchCourse={(value) => setSearchTerm(value)}
										placeholder={`Nhập tên khóa học`}
										endAdornment={
											<InputAdornment position="end">
												<IconButton aria-label="Tìm kiếm" edge="end">
													<Search />
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Box>
							<Divider style={{ backgroundColor: '#e1e1e1' }} />
							{isLoading ? (
								<>
									<Box mb={2} component={'div'}>
										<HorizontalCardCourse loading={isLoading} />
									</Box>
									<Box mb={2} component={'div'}>
										<HorizontalCardCourse loading={isLoading} />
									</Box>
									<Box mb={2} component={'div'}>
										<HorizontalCardCourse loading={isLoading} />
									</Box>
								</>
							) : (
								<>
									<ListCourse
										data={dataCourse ? dataCourse : []}
										loading={isLoading}
										searchTerm={searchTerm}
										// offset={offset}
										// perPage={PER_PAGE}
										afterRating={(status) => {
											setStatusRating(status);
										}}
									/>
									{/* {dataCourse &&
										dataCourse.map((item) => {
											console.log('filterValue: ', filterValue);
											console.log('Group ID: ', item.GroupCourseID);
											if (item.GroupCourseID === filterValue) {
												console.log('runnn');
												return (
													<Box key={item.ID} mb={2} component={'div'}>
														<HorizontalCardCourse
															data={item}
															loading={isLoading}
														/>
													</Box>
												);
											}
										})} */}
									<Box display={`flex`} justifyContent={`center`} mt={4}>
										<Pagination
											count={Math.ceil(state?.TotalResult / state?.PageSize)}
											color="primary"
											onChange={(obj, page) =>
												dispatch({ type: 'SELECT_PAGE', page })
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
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={4}>
							<Box>
								<Paper className={classes.goalWrap}>
									<Box p={{ md: 4, xs: 2, sm: 2 }}>
										<Typography variant={`h6`} align={`center`}>
											Thành tích của bạn
										</Typography>
										<Box align={`center`} mt={2}>
											<CircularProgressWithLabel
												number={dataOutCome && dataOutCome.TotalLessonFinish}
												totalnumber={dataOutCome && dataOutCome.TotalLesson}
												value={
													dataOutCome &&
													(dataOutCome.TotalLessonFinish * 100) /
														dataOutCome.TotalLesson
												}
												size={250}
												color={`secondary`}
												thickness={4}
												label={`Bài tập hoàn thành`}
												style={{ color: '#fff' }}
											/>
										</Box>
										<Box mt={2}>
											<Grid container spacing={4}>
												<Grid item md={6}>
													<Box display={`flex`} alignItems={`center`}>
														<CircularProgressWithLabel
															size={35}
															value={35}
															style={{
																marginRight: '1rem',
																color: 'rgb(79, 255, 86)',
															}}
														/>
														<Box>
															<Typography
																variant={`subtitle1`}
																className={classes.label}
															>
																Nộp đúng hạn
															</Typography>
															<Typography
																variant={`subtitle2`}
																className={classes.value}
															>
																{dataOutCome && dataOutCome.NopDungHan}
															</Typography>
														</Box>
													</Box>
												</Grid>
												<Grid item md={6}>
													<Box display={`flex`} alignItems={`center`}>
														<CircularProgressWithLabel
															size={35}
															value={35}
															style={{
																marginRight: '1rem',
																color: 'rgb(255, 182, 194)',
															}}
														/>
														<Box>
															<Typography
																variant={`subtitle1`}
																className={classes.label}
															>
																Nộp trễ hạn
															</Typography>
															<Typography
																variant={`subtitle2`}
																className={classes.value}
															>
																{dataOutCome && dataOutCome.NopTreHan}
															</Typography>
														</Box>
													</Box>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Paper>
								<Paper
									style={{
										marginTop: '-1rem',
										borderRadius: '16px 16px 4px 4px',
										boxShadow: '0px -10px 16px 0px rgba(255,255,255,.25)',
									}}
								>
									<Box p={{ md: 4, xs: 2, sm: 2 }}>
										<Typography variant={`h6`}>Bài tập sắp tới hạn</Typography>
										<Box
											style={{
												paddingTop: 0,
												flexGrow: 1,
												maxHeight: '18.5rem',
												overflow: 'auto',
												marginTop: '0.5rem',
											}}
										>
											<List>
												{dataStudying &&
													(dataStudying.BaiQuizCanHoanThanh ? (
														<RenderRow
															lists={dataStudying.BaiQuizCanHoanThanh}
														/>
													) : (
														<Typography variant="subtitle2" gutterBottom>
															Chưa có dữ liệu
														</Typography>
													))}
											</List>
										</Box>
									</Box>
								</Paper>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

MyCourse.getLayout = getLayout;

export default MyCourse;
