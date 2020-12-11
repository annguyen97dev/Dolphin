import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';
const path = '/DolphinStudentApi';

const key = appSettings.key;

export const LoginAPI = async (values) => {
	let result;
	try {
		let res = await instance.post(path + '/Login', {
			key: key,
			...values,
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const LogoutAPI = async (values) => {
	let result;
	try {
		let res = await instance.post(path + '/LogOut', {
			params: {
				token: values,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
