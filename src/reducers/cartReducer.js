import {
	FETCH_CART_REQUEST,
	FETCH_CART_SUCCESS,
	FETCH_CART_FAILURE,
	ADD_TO_CART_REQUEST,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_FAILURE,
	REMOVE_FROM_CART_REQUEST,
	REMOVE_FROM_CART_SUCCESS,
	REMOVE_FROM_CART_FAILURE,
} from '../Actions/actionTypes';

const initialState = {
	items: [],
	loading: false,
	error: null,
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CART_REQUEST:
		case ADD_TO_CART_REQUEST:
		case REMOVE_FROM_CART_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_CART_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload,
				error: null,
			};
		case ADD_TO_CART_SUCCESS:
		case REMOVE_FROM_CART_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			};
		case FETCH_CART_FAILURE:
		case ADD_TO_CART_FAILURE:
		case REMOVE_FROM_CART_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default cartReducer;
