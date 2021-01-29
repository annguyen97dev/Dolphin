import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const newsDetailAPI = async (postID, token) => {
	console.log('Token in api: ', token);
	let result;
	try {
		let res = await instance.get(path + '/GetDetailPost', {
			params: {
				token: token,
				postID: postID,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
