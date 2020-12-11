import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;

const path = '/DolphinStudentApi';

export const profileAPI = async () => {
	let result;
	try {
		let res = await instance.get(path + '/GetProfile', {
			params: {
				UID: uid,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updateProfileAPI = async (dataUpdate) => {
	let result;
	try {
		let res = await instance.post(path + '/UpdateProfile', dataUpdate);
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};
