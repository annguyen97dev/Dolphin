import React, { useEffect, useState } from 'react';
import { getLayout } from '~/components/Layout';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Typography } from '@material-ui/core';
import { ErrorChip } from '~/components/common/Chip';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { BlogCard } from '~/components/common/BlogCard';
import Grid from '@material-ui/core/Grid';
import { randomId } from '~/utils';
import Link from 'next/link';

import { Pagination } from '@material-ui/lab';

import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

// GET API
import { newsAPI } from '~/api/newsAPI';

// import './styles.scss';

export const blogDemo = [
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image: 'https://huflit.edu.vn/uploads/news/2020_06/ba.jpg',
		imageThumbnail: 'https://huflit.edu.vn/uploads/news/2020_06/ba.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://webtiengtrung.com/wp-content/uploads/2018/07/tu-vung-tieng-trung-chu-de-kinh-doanh.jpg',
		imageThumbnail:
			'https://webtiengtrung.com/wp-content/uploads/2018/07/tu-vung-tieng-trung-chu-de-kinh-doanh.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://gcs.thesouthafrican.com/2019/08/08162a40-accounting-aerial-businesswoman-1043506-1200x858.jpg',
		imageThumbnail:
			'https://gcs.thesouthafrican.com/2019/08/08162a40-accounting-aerial-businesswoman-1043506-1200x858.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/businesses-need-seo-1520x800.png',
		imageThumbnail:
			'https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/businesses-need-seo-1520x800.png',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image: 'https://blog.hubspot.com/hubfs/business-plan-1.jpg',
		imageThumbnail: 'https://blog.hubspot.com/hubfs/business-plan-1.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Test title',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
	{
		id: randomId(),
		title: 'Cards contain content and actions about a single subject',
		time: 'Thứ hai, 15 tháng 4 năm 2020',
		image:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		imageThumbnail:
			'https://cdn.vietnambiz.vn/2019/8/9/business-charts-15653501729972115166047.jpg',
		description:
			"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
	},
];

const useStyles = makeStyles((theme) => ({
	featuredBlog: {
		backgroundImage: `url('/static/img/blog-banner.jpg')`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		position: 'relative',
	},
	featureOverlay: {
		content: '',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,.6)',
		zIndex: 1,
	},
	textBox: {
		position: 'absolute',
		zIndex: 2,
		top: 'calc(50% - 1rem)',
		left: 0,
		padding: '0 1.5rem',
		transform: `translateY(-50%)`,
		maxWidth: 600,
		color: '#fff',
		marginBottom: '2rem',
	},
	categoryFeatured: {
		fontWeight: 'bold',
		color: theme.palette.error.light,
		marginBottom: '0.5rem',
		textTransform: 'uppercase',
	},
	containerBlog: {
		marginTop: '-2rem',
		marginBottom: '2rem',
		position: 'relative',
		zIndex: 2,
		padding: '0 -4rem',
	},
	titleSec: {
		fontSize: '2.25rem',
		fontWeight: 200,
		fontFamily: 'Roboto',
	},
	meta: {
		fontWeight: 400,
		fontFamily: 'Roboto',
		fontSize: 14,
		color: '#ccc',
	},
	limitText: {
		overflow: 'hidden',
		display: '-webkit-box',
		'-webkit-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
	},
	elipsis: {
		width: '100%',
		overflow: 'hidden',
		display: '-webkit-box',
		'-webkit-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
	},
	categoryList: {
		margin: '0 -0.5rem',
	},
}));

const ChipCategory = ({ id, isActive, ...otherProps }) => {
	const classes = makeStyles((theme) => ({
		activeChip: {
			'& .MuiChip-root': {
				backgroundColor: theme.palette.primary.light,
				color: '#fff',
				boxShadow: '0px 4px 12px 0px rgba(0,0,0,.15)',
			},
		},
	}))();
	return (
		<Box m={1} className={isActive ? classes.activeChip : ''}>
			<Chip {...otherProps} />
		</Box>
	);
};

const Blog = () => {
	const classes = useStyles();
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);
	const [checked, setChecked] = React.useState(false);
	const [dataNews, setDataNews] = useState();
	const [currentPage, setCurrentPage] = useState(0);
	// const [blogDemo, setData] = useState([]);

	// Pagination post
	const PER_PAGE = 6;
	const offset = currentPage * PER_PAGE;

	const currentPageData =
		dataNews &&
		dataNews
			.slice(offset, offset + PER_PAGE)
			.map(({ id, ...otherSectionProps }) => (
				<Fade in={true}>
					<Grid key={id} item xs={12} sm={6} md={6} lg={4}>
						{' '}
						<BlogCard {...otherSectionProps} />{' '}
					</Grid>
				</Fade>
			));

	const pageCount = Math.ceil(dataNews && dataNews.length / PER_PAGE);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
		setChecked(true);
	}

	useEffect(() => {
		// Get news API
		(async () => {
			try {
				const res = await newsAPI();
				res.Code === 1 ? setDataNews(res.Data) : '';
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	// -------------- //
	useEffect(() => {
		const t = setTimeout(() => {
			setBlogs(blogDemo);
			setLoading(false);
		}, 1500);
		return () => clearTimeout(t);
	}, []);
	return (
		<>
			<section>
				<Box className={classes.featuredBlog}>
					<Container
						maxWidth={`lg`}
						style={{ zIndex: 2, position: 'relative', minHeight: 400 }}
					>
						<Box className={classes.textBox}>
							<Typography variant={`h6`} className={classes.categoryFeatured}>
								BÀI VIẾT MỚI NHẤT
							</Typography>
							<Typography variant={`h5`} style={{ fontWeight: 600 }}>
								{dataNews && dataNews[0].TitlePost}
							</Typography>
							<Typography
								variant={`overline`}
								component={`div`}
								className={(classes.meta, classes.limitText)}
							>
								{ReactHtmlParser(dataNews && dataNews[0].ContentPost) || ''}
							</Typography>
							{/* <Box mt={1}>
								<Typography variant={`paragraph`} className={classes.elipsis}>
									Anim pariatur cliche reprehenderit, enim eiusmod high life
									accusamus terry richardson ad squid. 3 wolf moon officia aute,
									non cupidatat skateboard dolor brunch. Food truck quinoa
									nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
									aliqua put a bird on it squid single-origin coffee nulla
									assumenda shoreditch et.
								</Typography>
							</Box> */}

							<Box mt={4}>
								<Link
									href={`/blog/post/[[...slug]]`}
									as={`/blog/post/${dataNews && dataNews[0].ID}`}
								>
									<Button
										variant={`contained`}
										color={`primary`}
										endIcon={<ChevronRight />}
									>
										Đọc bài viết
									</Button>
								</Link>
							</Box>
						</Box>
					</Container>
					<Box className={classes.featureOverlay} />
				</Box>
			</section>
			<Container maxWidth={`xl`} className={classes.containerBlog}>
				<Paper>
					<Container maxWidth={`lg`} style={{ minHeight: 400 }}>
						<Box py={4}>
							<Box
								display={`flex`}
								justifyContent={`space-between`}
								alignItems={`center`}
								flexWrap={`wrap`}
							>
								<Box flexShrink={0}>
									<Typography variant={`h6`} className={classes.titleSec}>
										Bài viết mới
									</Typography>
								</Box>
								{/*<Box*/}
								{/*	className={classes.categoryList}*/}
								{/*	display={`flex`}*/}
								{/*	flexWrap={`wrap`}*/}
								{/*>*/}
								{/*	<ChipCategory label={`Tất cả`} isActive={true} />*/}
								{/*	<ChipCategory label={`Sự kiện`} />*/}
								{/*	<ChipCategory label={`Đời sống`} />*/}
								{/*	<ChipCategory label={`Quản trị doanh nghiệm`} />*/}
								{/*	<ChipCategory label={`Ngoại ngữ`} />*/}
								{/*</Box>*/}
							</Box>
							<Box mt={4}>
								<Grid container spacing={4}>
									{dataNews ? currentPageData : ''}
								</Grid>
							</Box>
							{/* <Box display={`flex`} justifyContent={`center`} mt={4}>
								<Pagination count={10} color="primary" />
							</Box> */}
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
					</Container>
				</Paper>
			</Container>
		</>
	);
};

Blog.getLayout = getLayout;

export default Blog;
