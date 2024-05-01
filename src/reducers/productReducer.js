const initialState = {
	products: [],
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCTS':
			// Fetch products from an API and update state
			return {
				...state,
				products: action.payload,
			};
		default:
			return state;
	}
};

export default productReducer;
