import React, { useEffect, useState } from 'react';
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

const courseDemo = [
	{
		courseId: 1,
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
		courseId: 3,
		src: null,
		courseName: 'Ứng dụng của Microsoft Office',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 25,
		totalVideo: 56,
		totalExercise: 45,
		finishedExercise: 15,
		finished: false,
		categoryName: 'Đào tạo kỹ năng cơ bản',
		categoryId: 2,
	},
	{
		courseId: 4,
		src: null,
		courseName: 'Kỹ năng làm MS PowerPoint',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 37,
		totalVideo: 37,
		totalExercise: 45,
		finishedExercise: 45,
		finished: true,
		categoryName: 'Đào tạo kỹ năng cơ bản',
		categoryId: 2,
	},
	{
		courseId: 5,
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
		courseId: 6,
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
		courseId: 7,
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
	{
		courseId: 8,
		src: null,
		courseName: 'Kỹ năng thuyết trình dự án',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 37,
		totalVideo: 37,
		totalExercise: 45,
		finishedExercise: 45,
		finished: true,
		categoryName: 'Đào tạo nghiệp vụ nâng cao',
		categoryId: 3,
	},
	{
		courseId: 9,
		src: null,
		courseName: 'Estimate tiến độ của dự án',
		time: '20/10/2020 - 25/12/2020',
		finishedVideo: 37,
		totalVideo: 37,
		totalExercise: 45,
		finishedExercise: 45,
		finished: true,
		categoryName: 'Đào tạo nghiệp vụ nâng cao',
		categoryId: 3,
	},
];

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
			{data.slice(offset, offset + perPage).map((item) => (
				<Box key={item.ID} mb={2} component={'div'}>
					<HorizontalCardCourse data={item} />
				</Box>
			))}
		</>
	);
};

const ListCourseFinish = ({ data, warningDate = false, offset, perPage }) => {
	return (
		<>
			{data.slice(offset, offset + perPage).map((item) => (
				<Box key={item.ID} mb={2} component={'div'}>
					<HorizontalCardCourse data={item} />
				</Box>
			))}
		</>
	);
};

let PER_PAGE = 5;
let pageCount = null;

const Result = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [courseLists, setCourseLists] = useState(courseDemo);
	const [isLoading, setIsloading] = useState(true);
	const [resultDeadline, setResultDeadline] = useState();
	const [resultFinish, setResultFinish] = useState();
	const [currentPage, setCurrentPage] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		// Pagination post
	};

	let offset = currentPage * PER_PAGE;

	value === 0
		? (pageCount = Math.ceil(resultFinish && resultFinish.length / PER_PAGE))
		: (pageCount = Math.ceil(
				resultDeadline && resultDeadline.length / PER_PAGE,
		  ));

	console.log('Page Count: ', pageCount);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
		setChecked(true);
	}
	//---------

	useEffect(() => {
		setIsloading(true);
		const t = setTimeout(() => {
			setIsloading(false);
		}, 1500);
		return () => clearTimeout(t);
	}, [value]);

	useEffect(() => {
		// Get result DEADLINE API
		(async () => {
			try {
				const res = await resultDeadlineAPI();
				res.Code === 1 && setResultDeadline(res.Data), setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();

		// Get result  FINISH API
		(async () => {
			try {
				const res = await resultFinishAPI();
				res.Code === 1 && setResultFinish(res.Data), setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

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
									{resultFinish ? (
										<>
											<ListCourseFinish
												data={resultFinish && resultFinish}
												warningDate={true}
												offset={offset}
												perPage={PER_PAGE}
											/>

											<Box display={`flex`} justifyContent={`center`} mt={4}>
												<ReactPaginate
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
												/>
											</Box>
										</>
									) : (
										<p>Chưa có dữ liệu</p>
									)}
								</>
							</TabPanel>
							<TabPanel value={value} index={1} className={classes.tabPanel}>
								{resultDeadline ? (
									<>
										<ListCourseDeadline
											data={resultDeadline && resultDeadline}
											warningDate={true}
											offset={offset}
											perPage={PER_PAGE}
										/>
										<Box display={`flex`} justifyContent={`center`} mt={4}>
											{/* <Pagination count={10} color="primary" /> */}
											<ReactPaginate
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
											/>
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
						<MyRanking />
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
Result.getLayout = getLayout;
export default Result;
