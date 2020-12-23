import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const courseAPI = async (filterValue) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourse', {
			params: {
				uid: uid,
				groupCourseID: filterValue,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseSectionAPI = async (params) => {
	let result;
	try {
		let res = await instance.get(path + '/GetSection', {
			params: {
				uid: uid,
				...params,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const courseGroupAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/GetGroupCourse', {
			params: {
				uid: uid,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const detailLessonAPI = async (params) => {
	let result;
	try {
		let res = await instance.get(path + '/GetDetailLesson', {
			params: {
				uid: uid,
				...params,
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

export const courseRating = async (value, courseID) => {
	let result;
	try {
		let res = await instance.get(path + '/SubmitRate', {
			params: {
				uid: uid,
				SettingCourseID: courseID,
				rate: value,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
