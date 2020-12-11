import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const newsDetailAPI = async (params) => {
	let result;
	try {
		let res = await instance.get(path + '/GetDetailPost', {
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
