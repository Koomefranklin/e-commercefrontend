export const fetchProductsRequest = () => ({
	type: 'FETCH_PRODUCTS_REQUEST',
});

export const fetchProductsSuccess = (products) => ({
	type: 'FETCH_PRODUCTS_SUCCESS',
	payload: products,
});

export const fetchProductsFailure = (error) => ({
	type: 'FETCH_PRODUCTS_FAILURE',
	payload: error,
});

export const fetchProducts = () => {
	return async (dispatch) => {
		dispatch(fetchProductsRequest());
		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			console.log(token);
			const res = await fetch(`http://127.0.0.1:8000/api/product`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				const data = await res.json();
				dispatch(fetchProductsSuccess(data));
			} else {
				console.error('Error fetching products:', res.statusText);
			}
		} catch (error) {
			dispatch(fetchProductsFailure(error.message));
		}
	};
};
