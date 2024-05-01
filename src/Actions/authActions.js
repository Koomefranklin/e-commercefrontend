export const loginUser = (token) => {
	sessionStorage.setItem('token', token);

	return {
		type: 'LOGIN_USER',
		payload: token,
	};
};

export const logoutUser = () => {
	sessionStorage.removeItem('token');

	return {
		type: 'LOGOUT_USER',
	};
};
