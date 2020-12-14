import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const resultDeadlineAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseDeadline', {
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

export const resultFinishAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseFinish', {
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

export const studyingAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseStudying', {
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

export const outcomeAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/ThanhTichCuaBan', {
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
