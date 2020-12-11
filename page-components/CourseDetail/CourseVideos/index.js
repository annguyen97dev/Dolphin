import React from 'react'
import {
	NextButton,
	PrevButton,
} from '~/page-components/CourseDetail/CourseVideos/NavigationVideo'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CourseContext } from '~/pages/my-course/[courseid]'
import ReactPlayer from 'react-player'
const useStyles = makeStyles((theme) => ({
	videoPlayback: {
		height: '100%',
		overflow: 'hidden',
	},
}))

const CourseVideos = () => {
	const classes = useStyles()
	return (
		<CourseContext.Consumer>
			{(context) => (
				<Box className={classes.videoPlayback}>
					<ReactPlayer
						controls={true}
						loop={false}
						width="100%"
						height="100%"
						config={{
							youtube: {
								playerVars: {
									autohide: 1,
									modestbranding: 1,
									rel: 0,
								},
							},
						}}
						url={context?.activeVideo?.videoUrl ?? 'about:blank'}
					/>
					<PrevButton />
					<NextButton />
				</Box>
			)}
		</CourseContext.Consumer>
	)
}

export default CourseVideos
