import React from 'react'
import { Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: 'rgba(31,64,105, .55)',
		borderRadius: 4,
		transition: 'all .3s ease',
		position: 'absolute',
		top: '50%',
		padding: '0.75rem',
		transform: 'translateY(-50%)',
		color: '#fff',
		minWidth: 'auto',
		boxShadow: '0px 0px 12px 0px rgba(0,0,0,.15)',
		'& .MuiButton-startIcon': {
			margin: 0,
		},
		'&.prev': {
			left: 0,
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			'& .text': {
				marginLeft: '0.25rem',
			},
		},
		'&.next': {
			right: 0,
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			'& .text': {
				marginRight: '0.25rem',
			},
		},
		'&:hover': {
			opacity: 1,
			backgroundColor: 'rgba(31,64,105, 1)',
			'& .text': {
				display: 'block',
			},
		},
		'& .text': {
			display: 'none',
		},
	},
}))

export const PrevButton = (props) => {
	const classes = useStyles()
	return (
		<Button
			variant="contained"
			color="secondary"
			className={`${classes.button} prev`}
			startIcon={<SkipPreviousIcon style={{ fontSize: '2rem' }} />}
			{...props}
		>
			<Box component={`span`} className={`text`}>
				Bài trước
			</Box>
		</Button>
	)
}

export const NextButton = (props) => {
	const classes = useStyles()
	return (
		<Button
			variant="contained"
			color="secondary"
			className={`${classes.button} next`}
			endIcon={<SkipNextIcon style={{ fontSize: '2rem' }} />}
			{...props}
		>
			<Box component={`span`} className={`text`}>
				Bài sau
			</Box>
		</Button>
	)
}
