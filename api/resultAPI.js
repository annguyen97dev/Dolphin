import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const resultDeadlineAPI = async (page, token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseDeadline', {
			params: {
				token: token,
				page: page,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const resultFinishAPI = async (page, token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseFinish', {
			params: {
				token: token,
				page: page,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const statisticFinish = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/ThongKeCourse', {
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

export const studyingAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetCourseStudying', {
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

export const outcomeAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/ThanhTichCuaBan', {
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

export const rankStudy = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetRank', {
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
