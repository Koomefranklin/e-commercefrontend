export const addToCart = (productId) => ({
	type: 'ADD_TO_CART',
	payload: productId,
});

export const removeFromCart = (productId) => ({
	type: 'REMOVE_FROM_CART',
	payload: productId,
});
