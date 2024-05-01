const initialState = {
	isAuthenticated: false,
	token: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				isAuthenticated: true,
				token: action.payload,
			};
		case 'LOGOUT_USER':
			return {
				isAuthenticated: false,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
