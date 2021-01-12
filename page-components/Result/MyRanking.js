import React, { useState } from 'react';
import {
	Assignment,
	Filter1Rounded,
	Filter2Rounded,
	Filter3Rounded,
	LocalLibrary,
	Stars,
	SupervisedUserCircle,
} from '@material-ui/icons';
import { Typography, Popover } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { randomId } from '~/utils';
import { AvatarGenerator } from 'random-avatar-generator';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '~/config';
const randomAvatar = () => new AvatarGenerator().generateRandomAvatar();
import { appSettings } from '~/config';
import Skeleton from '@material-ui/lab/Skeleton';

const linkImg = appSettings.link;

const rankPeople = [
	{
		id: randomId(),
		name: 'Trương Văn Lam',
		rank: 1,
		score: 9.8,
		avatar: randomAvatar(),
		position: 'Nhân sự',
		role: 'Quản lý nhân sự',
		branch: '275 Mạc Đỉnh Chi',
	},
	{
		id: randomId(),
		name: 'Phạm Hồng Ánh',
		rank: 2,
		score: 8.7,
		avatar: randomAvatar(),
		position: 'Nhân sự',
		role: 'Quản lý nhân sự',
		branch:
			'275 Mạc Đỉnh Chi 275 Mạc Đỉnh Chi 275 Mạc Đỉnh Chi 275 Mạc Đỉnh Chi 275 Mạc Đỉnh Chi 275 Mạc Đỉnh Chi',
	},
	{
		id: randomId(),
		name: 'Nguyễn Vũ Cảnh',
		rank: 3,
		score: 8.6,
		avatar: randomAvatar(),
		position: 'Nhân sự',
		role: 'Quản lý nhân sự',
		branch: '275 Mạc Đỉnh Chi',
	},
	{
		id: randomId(),
		name: 'Nguyễn Thanh Tuyền',
		rank: 4,
		score: 8.5,
		avatar: randomAvatar(),
		position: 'Nhân sự',
		role: 'Quản lý nhân sự',
		branch: '275 Mạc Đỉnh Chi',
	},
	{
		id: randomId(),
		name: 'Trần Đức Trung',
		rank: 5,
		score: 6.7,
		avatar: randomAvatar(),
		position: 'Nhân sự',
		role: 'Quản lý nhân sự',
		branch: '275 Mạc Đỉnh Chi',
	},
	// {
	// 	id: randomId(),
	// 	name: 'Phạm Hồng Phước',
	// 	rank: 6,
	// 	score: 2214,
	// 	avatar: randomAvatar(),
	// },
	// {
	// 	id: randomId(),
	// 	name: 'Lương Minh Tùng',
	// 	rank: 7,
	// 	score: 2019,
	// 	avatar: randomAvatar(),
	// },
	// {
	// 	id: randomId(),
	// 	name: 'Trương Hồng Minh',
	// 	rank: 8,
	// 	score: 1988,
	// 	avatar: randomAvatar(),
	// },
	// {
	// 	id: randomId(),
	// 	name: 'Phạm Minh Đăng',
	// 	rank: 9,
	// 	score: 1765,
	// 	avatar: randomAvatar(),
	// },
	// {
	// 	id: randomId(),
	// 	name: 'Vũ Phong Loan',
	// 	rank: 10,
	// 	score: 1522,
	// 	avatar: randomAvatar(),
	// },
];

const useStyles = makeStyles((theme) => ({
	rankIcon: {
		fontSize: '2rem',
	},
	one: {
		color: theme.palette.error.main,
	},
	two: {
		color: theme.palette.info.main,
	},
	three: {
		color: theme.palette.success.main,
	},
	valuePop: {
		maxWidth: 200,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	popover: {
		pointerEvents: 'none',
	},
	skeText: {
		width: '200px',
		margin: 'auto',
	},
}));

const RankPeople = ({
	rank = '',
	name = '',
	score = '',
	avatar = '',
	isLoading,
	position = '',
	role = '',
	branch = '',
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverOpen = (event) => {
		console.log('overred');
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		console.log('leaved');
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Box
				className={`people__wrap`}
				display={`flex`}
				justifyContent={`space-between`}
				alignItems={`center`}
				mb={2}
			>
				<Box
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup="true"
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
					display={`flex`}
					alignItems={`center`}
				>
					{isLoading ? (
						<Skeleton
							variant="rect"
							style={{ marginRight: '16px' }}
							width={32}
							height={32}
						/>
					) : (
						<>
							<Box
								mr={2}
								width={40}
								display={`flex`}
								alignItems={`center`}
								justifyContent={`center`}
								className={
									rank === 1
										? 'one'
										: rank === 2
										? 'two'
										: rank === 3
										? 'three'
										: '' + ' rank__number'
								}
							>
								{rank === 1 && (
									<Filter1Rounded
										className={`${classes.rankIcon} ${classes.one}`}
									/>
								)}
								{rank === 2 && (
									<Filter2Rounded
										className={`${classes.rankIcon} ${classes.two}`}
									/>
								)}
								{rank === 3 && (
									<Filter3Rounded
										className={`${classes.rankIcon} ${classes.three}`}
									/>
								)}
								{rank > 3 && (
									<Typography variant={`h5`} style={{ color: '#ccc' }}>
										{rank}
									</Typography>
								)}
							</Box>
						</>
					)}

					{isLoading ? (
						<Skeleton variant="circle" width={40} height={40} />
					) : (
						<Avatar src={`${linkImg}${avatar}`} />
					)}
					<Box ml={2}>
						{isLoading ? (
							<Skeleton
								variant="text"
								width={200}
								style={{ marginLeft: '16px' }}
							/>
						) : (
							<Typography variant={`body1`}>{name}</Typography>
						)}
					</Box>
				</Box>
				<Box>
					{isLoading ? (
						<Skeleton width={50} variant="text" />
					) : (
						<Typography variant={`h6`} color={`primary`}>
							{score}
						</Typography>
					)}
				</Box>
			</Box>
			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.paper,
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Box p={2}>
					<Box mb={2} display="flex">
						<Avatar size="medium" src={`${linkImg}${avatar}`} />
						<Box ml={2}>
							<Typography variant="body1" color="primary">
								{name}
							</Typography>
							<Typography variant="caption">{position}</Typography>
						</Box>
					</Box>
					<Box
						display="flex"
						alignItems="flex-start"
						justifyContent="space-between"
						mb={2}
					>
						<Box variant="body2" fontWeight={500}>
							Văn phòng:
						</Box>
						<Box ml={2} align="right" className={classes.valuePop}>
							<Typography variant="body2"> {branch}</Typography>
						</Box>
					</Box>
					{/* <Box
						display="flex"
						alignItems="flex-start"
						justifyContent="space-between"
					>
						<Box variant="body2" fontWeight={500}>
							Chi nhánh:
						</Box>
						<Box ml={2} align="right">
							<Typography variant="body2" className={classes.valuePop}>
								{role}
							</Typography>
						</Box>
					</Box> */}
				</Box>
			</Popover>
		</>
	);
};

const MyRanking = ({ dataRank, isLoading }) => {
	const classes = useStyles();
	return (
		<div className={`rankink_profile`}>
			<div className="profile">
				<div className="profile__group">
					<div className="profile__picture">
						{isLoading ? (
							<Skeleton variant="circle" width={105} height={105} />
						) : (
							<img src={`${linkImg}${dataRank?.Avatar}`} alt="Image User" />
						)}
					</div>
					<div className="profile__header">
						<div className="profile__account">
							{isLoading ? (
								<>
									<Skeleton variant="text" className={classes.skeText} />
									<Skeleton variant="text" className={classes.skeText} />
								</>
							) : (
								<>
									<h4 className="profile__username">{dataRank?.FullName}</h4>
									<p className="profile__userrole">{dataRank?.Position}</p>
								</>
							)}
						</div>
					</div>
					<div className="profile__stats">
						{isLoading ? (
							<>
								<Skeleton variant="text" className={classes.skeText} />
								<Skeleton variant="text" className={classes.skeText} />
							</>
						) : (
							<>
								<div className="profile__stat">
									<div className="profile__icon profile__icon--gold">
										<SupervisedUserCircle style={{ fontSize: '2rem' }} />
									</div>
									<div className="profile__value">
										{dataRank?.Ratings}
										<div className="profile__key">Xếp hạng</div>
									</div>
								</div>
								<div className="profile__stat">
									<div className="profile__icon profile__icon--blue">
										<Stars style={{ fontSize: '2rem' }} />
									</div>
									<div className="profile__value">
										{dataRank?.TotalPoint}
										<div className="profile__key">Tổng điểm</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<Box className="ranking__wrap" mt={2}>
					<Typography style={{ color: '#b4b4b4' }}>
						Bảng xếp hạng điểm
					</Typography>
					<Box mt={2}>
						{isLoading ? (
							<Box>
								<RankPeople isLoading={isLoading} />
								<RankPeople isLoading={isLoading} />
								<RankPeople isLoading={isLoading} />
							</Box>
						) : dataRank?.ListRank ? (
							dataRank?.ListRank.map((people) => (
								<RankPeople
									key={people.id}
									avatar={people.Avatar}
									rank={people.Ratings}
									name={people.FullName}
									score={people.TotalPoint}
									branch={people.CategoryEmployee}
									role={people.SchoolName}
									position={people.Position}
								/>
							))
						) : (
							<p style={{ textAlign: 'center' }}>Chưa có dữ liệu</p>
						)}
					</Box>
				</Box>
			</div>
		</div>
	);
};

export default MyRanking;
