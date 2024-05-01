import { ADD_TO_CART, REMOVE_FROM_CART } from './actionTypes';

export const addToCart = (productId) => {
	return async (dispatch, getState) => {
		dispatch({ type: ADD_TO_CART, payload: productId });

		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			const res = await fetch(`http://127.0.0.1:8000/api/cart/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ productId }),
			});
			if (res.ok) {
				res.json().then((data) => {
					alert('Added To Cart!');
				});
			} else {
				res.json().then((err) => console.error('Error', err.error));
			}
		} catch (error) {
			console.error('An error occured', error);
		}
	};
};

export const removeFromCart = (productId) => ({
	type: REMOVE_FROM_CART,
	payload: productId,
});
