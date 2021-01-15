import { useRouter } from 'next/router';
import { getLayout } from '~/components/Layout';
import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Avatar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ArrowDownward } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { scrollToSmoothly } from '~/utils';
import Divider from '@material-ui/core/Divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { BlogCard } from '~/components/common/BlogCard';
import { newsDetailAPI } from '~/api/newsDetailAPI';
import { newsAPI } from '~/api/newsAPI';
import ReactHtmlParser from 'react-html-parser';
import { appSettings } from '~/config';
import { useAuth } from '~/api/auth.js';

const linkImg = appSettings.link;

SwiperCore.use([Navigation, Pagination, A11y]);
const useStyles = makeStyles((theme) => ({
	featuredContainer: {
		zIndex: 2,
		position: 'relative',
		height: 'calc(var(--app-height) - 124px)',
	},
	featuredBlog: {
		backgroundImage: `url('/static/img/blog-banner.jpg')`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		position: 'relative',
		height: '500px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			height: '300px',
		},
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
		zIndex: 2,
		padding: '0 1.5rem',
		color: '#fff',
		textAlign: 'center',
	},
	categoryFeatured: {
		fontWeight: 'bold',
		color: theme.palette.error.light,
		marginBottom: '0.5rem',
		textTransform: 'uppercase',
	},
	containerBlog: {
		marginTop: '4rem',
		marginBottom: '4rem',
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
	buttonScroll: {
		'&.MuiButton-textPrimary': {
			color: '#fff',
		},
		'&.MuiButton-outlinedPrimary': {
			borderColor: '#fff',
			color: '#fff',
			'&:hover': {
				boxShadow: 'inset 0px 0px 50px 50px #fff',
				color: theme.palette.secondary.main,
			},
		},
	},
	author: {
		color: theme.palette.error.main,
		fontWeight: 600,
	},
	avatar: {
		width: 50,
		height: 50,
		marginRight: '1rem',
	},
	categoryTitle: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '24px',
		},
	},
}));
let bodyEl;

const RenderSlider = ({ data, isLoading }) => {
	return (
		<Swiper
			spaceBetween={16}
			slidesPerView={4}
			breakpoints={{
				320: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				960: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
			}}
			navigation
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}
		>
			{data
				? data.map((blog) => (
						<SwiperSlide key={blog.ID}>
							<BlogCard dataBlog={blog} isLoading={isLoading} />
						</SwiperSlide>
				  ))
				: ''}
		</Swiper>
	);
};

const Post = () => {
	const classes = useStyles();
	const router = useRouter();
	const [relatedBlogs, setRelatedBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dataDetail, setDataDetail] = useState();
	const [dataNews, setDataNews] = useState();
	const [link, setLink] = useState();

	const scrollDownSection = (e) => {
		e.preventDefault();
		bodyEl = document.querySelector('#__next > div > div:nth-child(2)');
		if (!bodyEl) return;
		const scrollPost = bodyEl.offsetHeight - 124;
		scrollToSmoothly(bodyEl, scrollPost, 800);
	};

	const cleanComponent = () => {
		bodyEl = null;
	};

	// Check Authenticated
	const { isAuthenticated, changeIsAuth } = useAuth();
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

	useEffect(() => {
		let linkClone = null;
		let link = window.location.href;
		link = link.split('/');

		link.forEach((item, index) => {
			if (item === 'slug') {
				linkClone = link[index + 1].substring(1);
			}
		});

		let postID = parseInt(linkClone);

		// Get News Detail API
		(async () => {
			try {
				const res = await newsDetailAPI(postID, token);
				res.Code === 1 ? setDataDetail(res.Data) : '';
				res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();

		// Get News API
		(async () => {
			setIsLoading(false);
			try {
				const res = await newsAPI(token);
				res.Code === 1 ? setDataNews(res.Data) : '';
				res.Code === 0 && setCheckToken(res.Code);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [isAuthenticated.isLogin, link]);

	useEffect(() => {
		let linkClone = null;
		let link = window.location.href;
		link = link.split('/');

		link.forEach((item, index) => {
			if (item === 'slug') {
				linkClone = link[index + 1].substring(1);
			}
		});
		setLink(linkClone);
	});

	return (
		<>
			<section>
				<Box className={classes.featuredBlog}>
					<Container maxWidth={`lg`} className={classes.featuredContainer}>
						<Box className={classes.textBox}>
							<Typography
								variant={`h4`}
								component={`h4`}
								className={classes.categoryTitle}
							>
								{dataDetail && dataDetail.TitlePost}
							</Typography>
							{/* <Box mt={{ xs: 4, sm: 4, md: 6, lg: 8 }}>
								<Button
									variant={`contained`}
									color={`primary`}
									endIcon={<ArrowDownward />}
									size={`large`}
									onClick={scrollDownSection}
									className={classes.buttonScroll}
								>
									Đọc bài viết
								</Button>
							</Box> */}
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
								alignItems={`center`}
								mb={4}
								className={classes.blogAuthor}
							>
								<Avatar
									src={`${linkImg}${
										dataDetail?.AvatarCreated ? dataDetail.AvatarCreated : ''
									}`}
									size={`large`}
									className={classes.avatar}
								/>
								<Box>
									<Typography
										variant={`body2`}
										className={classes.author}
										component={`p`}
									>
										{dataDetail && dataDetail.FullName}
									</Typography>
									<Typography variant={`caption`} className={classes.meta}>
										{dataDetail && dataDetail.PostDate}
									</Typography>
								</Box>
							</Box>
							<Box className={classes.blogContent}>
								{dataDetail && ReactHtmlParser(dataDetail.ContentPost)}
							</Box>
							<Box my={4}>
								<Divider />
							</Box>
							<Box>
								<Typography variant={`h6`} className={classes.titleSec}>
									Bài viết khác
								</Typography>
								<Box mt={4}>
									{dataNews?.length > 0 ? (
										<RenderSlider data={dataNews} isLoading={isLoading} />
									) : (
										<p style={{ textAlign: 'center' }}>Chưa có dữ liệu</p>
									)}
								</Box>
							</Box>
						</Box>
					</Container>
				</Paper>
			</Container>
		</>
	);
};
Post.getLayout = getLayout;

export default Post;
