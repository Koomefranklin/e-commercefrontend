import { ADD_TO_CART, REMOVE_FROM_CART } from '../Actions/actionTypes';

const initialState = {
	items: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			if (state.items.includes(action.payload)) {
				return state;
			}
			return {
				...state,
				cartItems: [...state.items, action.payload],
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cartItems: state.items.filter((item) => item !== action.payload),
			};
		default:
			return state;
	}
};

export default cartReducer;
