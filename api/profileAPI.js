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
		let res = await instance.get(path + '/UpdateProfile', {
			params: {
				UID: uid,
				...dataUpdate,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updateImage = async (dataImg) => {
	let result;

	try {
		let formData = new FormData();
		formData.append('file', dataImg, 'test');
		console.log('form data: ', formData);
		let res = await instance.get(path + '/UploadImage', {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			params: {
				UID: uid,
			},
			data: formData,
		});
		result = res.data;
	} catch (error) {
		console.log(error);
		return error.message ? error.message : (result = '');
	}
	return result;
};

export const updatePassword = async (dataPass) => {
	let result;
	try {
		let res = await instance.get(path + '/UpdatePass', {
			params: {
				uid: uid,
				...dataPass,
			},
		});
		result = res.data;
	} catch (error) {
		return error.message ? error.message : (result = '');
	}
	return result;
};
