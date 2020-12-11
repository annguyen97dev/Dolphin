import React from 'react'
import { Chip, withStyles } from '@material-ui/core'

export const SuccessChip = withStyles((theme) => ({
	colorPrimary: {
		color: '#fff',
		backgroundColor: theme.palette.success.main,
	},
}))((props) => <Chip color={`primary`} {...props} />)

export const ErrorChip = withStyles((theme) => ({
	colorPrimary: {
		color: '#fff',
		backgroundColor: theme.palette.error.main,
	},
}))((props) => <Chip color={`primary`} {...props} />)
