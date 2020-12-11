import React from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import { colors } from '~/config';
import { Tabs, Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export const a11yProps = (index) => ({
	id: `scrollable-force-tab-${index}`,
	'aria-controls': `scrollable-force-tabpanel-${index}`,
});

export const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box style={{ overflow: 'auto' }} py={2} flexGrow={1}>
					<Container maxWidth={`lg`}>
						<Paper elevation={0}>
							<Box p={2}>{children}</Box>
						</Paper>
					</Container>
				</Box>
			)}
		</Box>
	);
};

export const WhiteTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		color: colors.grayText,
		fontSize: '1.15rem',
		'&:focus': {
			opacity: 1,
		},
	},
	selected: {
		color: colors.primary,
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		'& .MuiSvgIcon-root': {
			marginBottom: '0 !important',
			marginRight: '0.5rem',
		},
	},
	labelIcon: {
		minHeight: 40,
	},
}))((props) => <Tab disableRipple {...props} />);

export const WhiteTabs = withStyles({
	indicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > span': {
			width: '100%',
			backgroundColor: colors.primary,
		},
	},
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
