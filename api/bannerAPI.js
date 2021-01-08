import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const bannerAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetListBanner', {
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
