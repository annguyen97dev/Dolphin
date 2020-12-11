export const randomId = () => {
	let dt = new Date().getTime()
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (dt + Math.random() * 16) % 16 | 0
		dt = Math.floor(dt / 16)
		return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
	})
	return uuid
}

export const convertDay = (date) => {
	let arrayDate = date.split('/')
	date = new Date(`${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`).getDay()
	switch (date) {
		case 0:
			return 'Sunday'
			break
		case 1:
			return 'Monday'
			break
		case 2:
			return 'Tuesday'
			break
		case 3:
			return 'Wednesday'
			break
		case 4:
			return 'Thursday'
			break
		case 5:
			return 'Friday'
			break
		default:
			return 'Saturday'
			break
	}
}

export const convertTime = (time) => {
	time = time.split(':')[0]
	return time <= 12 ? 'AM' : 'PM'
}

export const nationMapToFlag = (nation) => {
	let map = {
		ca: 'Canada',
		my: 'Malaysia',
		vn: 'Vietnam',
		us: 'U.S.',
		jp: 'Japan',
		kr: 'South Korea',
		ph: 'Philippines',
		bg: 'Bangladesh',
		id: 'India',
		th: 'Thailand',
	}
	let result
	for (const [key, value] of Object.entries(map)) {
		if (value === nation) {
			result = key
			break
		}
	}
	return result
}

const getDifferentMinBetweenTime = (startDate, endDate) => {
	const oneMinutes = 1000 * 60 * 60
	const startTime = startDate.getTime()
	const endTime = endDate.getTime()
	const diffTime = endTime - startTime
	return Math.round(diffTime / oneMinutes)
}

export const scrollToSmoothly = (container, pos, time) => {
	/*Time is exact amount of time the scrolling will take (in milliseconds)*/
	/*Pos is the y-position to scroll to (in pixels)*/
	/*Code written by hev1*/
	if (typeof pos !== 'number') {
		pos = parseFloat(pos)
	}
	if (isNaN(pos)) {
		console.warn('Position must be a number or a numeric String.')
		throw 'Position must be a number'
	}
	if (pos < 0 || time < 0) {
		return
	}
	var currentPos = window.scrollY || window.screenTop
	var start = null
	time = time || 500
	window.requestAnimationFrame(function step(currentTime) {
		start = !start ? currentTime : start
		if (currentPos < pos) {
			var progress = currentTime - start
			container.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos)
			if (progress < time) {
				window.requestAnimationFrame(step)
			} else {
				container.scrollTo(0, pos)
			}
		} else {
			var progress = currentTime - start
			container.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time)
			if (progress < time) {
				window.requestAnimationFrame(step)
			} else {
				container.scrollTo(0, pos)
			}
		}
	})
}
