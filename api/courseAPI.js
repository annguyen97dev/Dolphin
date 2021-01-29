import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const courseAPI = async (filterValue, page, token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourse', {
			params: {
				groupCourseID: filterValue,
				page: page,
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseAPI_all = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourse', {
			params: {
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseSectionAPI = async (courseID, token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetSection', {
			params: {
				courseID: courseID,
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseGroupAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetGroupCourse', {
			params: {
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const detailLessonAPI = async (lessonID, token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetDetailLesson', {
			params: {
				lessonID: lessonID,
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const submitResult = async (dataResult) => {
	let result;
	try {
		let res = await instance.get(path + '/SubmitResult', {
			params: {
				uid: uid,
				...dataResult,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseRating = async (value, courseID, token) => {
	let result;
	try {
		let res = await instance.get(path + '/SubmitRate', {
			params: {
				SettingCourseID: courseID,
				rate: value.rating,
				CommentRate: value.comment,
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const updateToken = async (token, time) => {
	let result;
	try {
		let res = await instance.get(path + '/UpdateToken', {
			params: {
				token: token,
				time: time,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
