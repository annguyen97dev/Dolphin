import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~/config';

let uid = appSettings.uid;

const path = '/DolphinStudentApi';

export const profileAPI = async (token) => {
	let result;
	try {
		let res = await instance.get(path + '/GetProfile', {
			params: {
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		console.log('Error: ', error);
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updateProfileAPI = async (dataUpdate, token) => {
	let result;
	try {
		let res = await instance.get(path + '/UpdateProfile', {
			params: {
				token: token,
				...dataUpdate,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updateImage = async (dataImg, token) => {
	let result;
	console.log('DataImg: ', dataImg);
	try {
		const formData = new FormData();
		formData.append('file', dataImg);
		let res = await instance.post(path + '/UploadImage', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			params: {
				token: token,
			},
		});
		result = res.data;
	} catch (error) {
		console.log(error);
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updatePassword = async (dataPass, token) => {
	let result;
	try {
		let res = await instance.get(path + '/UpdatePass', {
			params: {
				token: token,
				...dataPass,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};
