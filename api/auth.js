// contexts/auth.js

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';

import Router, { useRouter } from 'next/router';

//api here is an axios instance which has the baseURL set according to the env.

import { LoginAPI } from '~/api/authAPI';
import { LogoutAPI } from '~/api/authAPI';

// Get API
import { profileAPI } from '~/api/profileAPI';
import { updateProfileAPI } from '~/api/profileAPI';
import { updateImage } from '~/api/profileAPI';
import { updatePassword } from '~/api/profileAPI';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dataProfile, setDataProfile] = useState();
	const router = useRouter();
	const [checkLogin, setCheckLogin] = useState({
		isLogin: false,
		data: '',
		token: '',
	});

	useEffect(() => {
		async function loadUserFromCookies() {
			if (localStorage.getItem('TokenUser') !== null) {
				setCheckLogin({
					isLogin: true,
					data: JSON.parse(localStorage.getItem('DataUser')),
					token: localStorage.getItem('TokenUser'),
				});
			}
		}
		loadUserFromCookies();

		loadDataProfile();
	}, []);

	//LOAD DATA PROFILE
	const loadDataProfile = useCallback(() => {
		(async () => {
			try {
				const res = await profileAPI();
				res.Code === 1 ? setDataProfile(res.Data) : '';
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const updateProfile = (dataUpdate) => {
		console.log('Data update: ', dataUpdate);
		(async () => {
			try {
				const res = await updateProfileAPI(dataUpdate);
				res.Code === 1
					? alert('Update thành công')
					: alert('update ko thành công');
			} catch (error) {
				console.log(error);
			}
		})();
	};

	const updateImg = () => {
		console.log('chạyyyyy');
		(async () => {
			try {
				const res = await updateImage();
				res.Code === 1
					? alert('Update thành công')
					: alert('Update hình không thành công');
			} catch (error) {
				console.log(error);
			}
		})();
	};

	const updatePass = (dataPass) => {
		(async () => {
			try {
				const res = await updatePassword(dataPass);
				res.Code === 1 ? alert('Update hình thành công') : '';
			} catch (error) {
				console.log(error);
			}
		})();
	};

	const handleLogin = async (values) => {
		// const { data: token } = await api.post('auth/login', { email, password });
		// if (token) {
		// 	console.log('Got token');
		// 	Cookies.set('token', token, { expires: 60 });
		// 	api.defaults.headers.Authorization = `Bearer ${token.token}`;
		// 	const { data: user } = await api.get('users/me');
		// 	setUser(user);
		// 	console.log('Got user', user);
		// }

		try {
			const res = await LoginAPI(values);
			setLoading(false);
			if (res.Code === 1) {
				console.log('Got token');
				localStorage.setItem('TokenUser', res.Data.account.TokenApp);
				localStorage.setItem('DataUser', JSON.stringify(res.Data.account));
				setCheckLogin({
					isLogin: true,
				});
				router.push('/home');
			}
			if (res.Code === 2) {
				res.Code === 2 && alert(res.Message);
			}
		} catch (error) {
			// setLoading(false);
			alert('Loi khong ket noi');
			console.log(error);
		}
	};

	const handleLogout = async () => {
		console.log('click logout');
		try {
			const res = await LogoutAPI(checkLogin.token);
			if (res.Code === 1) {
				setCheckLogin({
					isLogin: false,
				});

				localStorage.clear();
			}
		} catch (error) {
			alert('Lỗi không đăng xuất được');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: checkLogin.isLogin,
				dataUser: checkLogin.data,
				dataProfile: dataProfile,
				updateProfile,
				updateImg,
				updatePass,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
