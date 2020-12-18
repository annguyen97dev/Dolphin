import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { useRouter } from 'next/router';
import { ArrowRightAlt } from '@material-ui/icons';
import Link from 'next/link';
import { Skeleton } from '@material-ui/lab';
import { appSettings } from '~/config';
import ReactHtmlParser from 'react-html-parser';

const linkImg = appSettings.link;

const blogCardStyles = makeStyles((theme) => ({
	media: {
		height: 235,
	},
	truncateText: {
		fontSize: '0.875rem',
		color: '#999',
		width: '100%',
		overflow: 'hidden',
		display: '-webkit-box',
		'-webkit-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
	},
	title: {
		transition: 'color .3s ease',
		cursor: 'pointer',
		fontSize: '1rem',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	meta: {
		marginBottom: '0.5rem',
		color: '#ccc',
	},
}));

export const BlogCard = ({
	ID,
	TitlePost,
	PostIMG,
	ContentPost,
	PostDate,
	isLoading,
}) => {
	const classes = blogCardStyles();
	const router = useRouter();

	// useEffect(() => {

	// 	let htmlObj = null;
	// 	$('.MuiTypography-body2').each(function () {
	// 		let s = $(this).text();
	// 		console.log('S: ', s);
	// 		htmlObj = $.parseHTML(s);
	// 		console.log('html: ', htmlObj[0]);
	// 		$(this).replaceWith(htmlObj[0]);
	// 	});
	// });

	return (
		<Card className={classes.cardContainer}>
			{isLoading ? (
				<Skeleton className={classes.media} />
			) : (
				<CardActionArea
					onClick={(e) => {
						e.preventDefault();
						router.push(`/blog/post/[[...slug]]`, `/blog/post/${ID}`);
					}}
				>
					<CardMedia
						className={classes.media}
						image={`${linkImg}${PostIMG}`}
						title={TitlePost}
					/>
				</CardActionArea>
			)}

			<CardContent>
				{isLoading ? (
					<Skeleton />
				) : (
					<Link href={`/blog/post/[[...slug]]`} as={`/blog/post/${ID}`}>
						<Typography
							gutterBottom
							variant="h6"
							component="h2"
							className={classes.title}
						>
							{TitlePost || ''}
						</Typography>
					</Link>
				)}
				{isLoading ? (
					<Skeleton width={120} />
				) : (
					<Typography
						variant="caption"
						className={classes.meta}
						component={`p`}
					>
						{PostDate}
					</Typography>
				)}
				{isLoading ? (
					<>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</>
				) : (
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.truncateText}
					>
						{ReactHtmlParser(ContentPost) || ''}
					</Typography>
				)}
			</CardContent>
			{
				<CardActions disableSpacing style={{ padding: '0 1rem 1rem' }}>
					{isLoading ? (
						<Skeleton height={36} width={100} />
					) : (
						<Button
							variant={`text`}
							color={`primary`}
							endIcon={<ArrowRightAlt />}
							onClick={(e) => {
								e.preventDefault();
								router.push(`/blog/post/[[...slug]]`, `/blog/post/${ID}`);
							}}
						>
							Đọc tiếp
						</Button>
					)}
				</CardActions>
			}
		</Card>
	);
};
