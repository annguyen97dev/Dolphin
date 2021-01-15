import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;
const path = '/DolphinStudentApi';

export const notificationAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetNotification', {
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

export const notificationDetailAPI = async (token, notiID) => {
	let result;
	try {
		let res = await instance.get(path + '/GetDetailNotification', {
			params: {
				token: token,
				NotificationID: notiID,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};

export const notificationStatusAPI = async (token, type, notiID) => {
	let result;
	try {
		let res = await instance.get(path + '/QickViewNotification', {
			params: {
				token: token,
				type: type,
				NotificationID: notiID,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}

	return result;
};
