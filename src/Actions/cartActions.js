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
} from './actionTypes';

export const fetchCartRequest = () => ({
	type: FETCH_CART_REQUEST,
});

export const fetchCartSuccess = (cartItems) => ({
	type: FETCH_CART_SUCCESS,
	payload: cartItems,
});

export const fetchCartFailure = (error) => ({
	type: FETCH_CART_FAILURE,
	payload: error,
});

export const fetchCartItems = () => {
	return async (dispatch) => {
		dispatch(fetchCartRequest());
		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			const res = await fetch(`http://127.0.0.1:8000/api/cart-view/`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				const data = await res.json();
				dispatch(fetchCartSuccess(data));
			} else {
				dispatch(fetchCartFailure(res.statusText));
			}
		} catch (error) {
			dispatch(fetchCartFailure(error.message));
		}
	};
};

export const addToCartRequest = () => ({
	type: ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = () => ({
	type: ADD_TO_CART_SUCCESS,
});

export const addToCartFailure = (error) => ({
	type: ADD_TO_CART_FAILURE,
	payload: error,
});

export const addToCart = (productId) => {
	const addData = { product: productId, quantity: 1, user: 1 };
	return async (dispatch, getState) => {
		dispatch(addToCartRequest());
		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			const res = await fetch(`http://127.0.0.1:8000/api/cart/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(addData),
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

export const removeFromCartRequest = () => ({
	type: REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = () => ({
	type: REMOVE_FROM_CART_SUCCESS,
});

export const removeFromCartFailure = (error) => ({
	type: REMOVE_FROM_CART_FAILURE,
	payload: error,
});

export const removeFromCart = (cartId) => {
	return async (dispatch, getState) => {
		dispatch(removeFromCartRequest());
		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			const res = await fetch(`http://127.0.0.1:8000/api/cart/${cartId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				res.json().then((data) => {
					alert('Removed From Cart!');
				});
			} else {
				res.json().then((err) => console.error('Error', err.error));
			}
		} catch (error) {
			console.error('An error occurred', error);
		}
	};
};
