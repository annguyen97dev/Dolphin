import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const newsAPI = async (page) => {
	let result;
	try {
		let res = await instance.get(path + '/GetPostContent', {
			params: {
				uid: uid,
				Page: page,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
