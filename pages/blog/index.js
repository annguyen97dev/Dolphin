import React, { useEffect, useState, useReducer } from 'react';
import { getLayout } from '~/components/Layout';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { AccordionActions, Fade, Typography } from '@material-ui/core';
import { ErrorChip } from '~/components/common/Chip';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { BlogCard } from '~/components/common/BlogCard';
import Grid from '@material-ui/core/Grid';
import { randomId } from '~/utils';
import Link from 'next/link';
import { useAuth } from '~/api/auth.js';

import { Pagination } from '@material-ui/lab';

import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

// GET API
import { newsAPI_page } from '~/api/newsAPI';

// import './styles.scss';

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

const Blog = () => {
	const classes = useStyles();
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = React.useState(false);
	const [dataNews, setDataNews] = useState();
	const [currentPage, setCurrentPage] = useState(0);
	const [state, dispatch] = useReducer(reducer, initialState);

	const router = useRouter();
	// Check Authenticated
	const { isAuthenticated, changeIsAuth } = useAuth();
	const [checkToken, setCheckToken] = useState();

	// const token = isAuthenticated.token;

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

	// Pagination post
	const PER_PAGE = 6;
	const offset = currentPage * PER_PAGE;

	// const currentPageData =
	// 	dataNews &&
	// 	dataNews
	// 		.slice(offset, offset + PER_PAGE)
	// 		.map(({ id, ...otherSectionProps }) => (
	// 			<Fade in={true}>
	// 				<Grid key={id} item xs={12} sm={6} md={6} lg={4}>
	// 					{' '}
	// 					<BlogCard {...otherSectionProps} />{' '}
	// 				</Grid>
	// 			</Fade>
	// 		));

	// const pageCount = Math.ceil(dataNews && dataNews.length / PER_PAGE);

	// function handlePageClick({ selected: selectedPage }) {
	// 	setCurrentPage(selectedPage);
	// 	setChecked(true);
	// }

	const currentPageData =
		dataNews &&
		dataNews.map((blog) => (
			<Fade in={true}>
				<Grid key={blog.ID} item xs={12} sm={6} md={6} lg={4}>
					{' '}
					<BlogCard dataBlog={blog} isLoading={loading} />{' '}
				</Grid>
			</Fade>
		));

	useEffect(() => {
		setLoading(true);
		const t = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(t);
		};
	}, [state.page]);

	useEffect(() => {
		if (localStorage.getItem('TokenUser') !== null) {
			const token = localStorage.getItem('TokenUser');
			// Get news API
			(async () => {
				try {
					const res = await newsAPI_page(state?.page, token);
					res.Code === 1
						? (setDataNews(res.Data), dispatch({ type: 'ADD_PAGE', res }))
						: '';
					res.Code === 0 && setCheckToken(res.Code);
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [state.page]);

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
									href={`/blog/post/slug`}
									as={`/blog/post/slug?${dataNews && dataNews[0].ID}`}
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
							<Box display={`flex`} justifyContent={`center`} mt={4}>
								<Pagination
									count={Math.round(state?.TotalResult / state?.PageSize)}
									color="primary"
									// onClick={choosePage}
									onChange={(obj, page) =>
										dispatch({ type: 'SELECT_PAGE', page })
									}
								/>
							</Box>
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
					</Container>
				</Paper>
			</Container>
		</>
	);
};

Blog.getLayout = getLayout;

export default Blog;
