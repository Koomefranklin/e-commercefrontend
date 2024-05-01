import React, { useEffect, useState } from 'react';
import { FaCartFlatbed, FaMinus, FaPlus, FaRegTrashCan } from 'react-icons/fa6';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	ButtonGroup,
	TableFooter,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	fetchCartItems,
	addToCart,
	removeFromCart,
} from '../Actions/cartActions';
import { fetchProducts } from '../Actions/productActions';

const Cart = ({
	products,
	fetchProducts,
	items,
	loading,
	error,
	fetchCartItems,
	removeFromCart,
}) => {
	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const totalPrice = items.reduce((total, item) => {
		const product = products.find((product) => product.id === item.product.id);
		const itemTotalPrice = parseFloat(
			product ? product.price * item.quantity : 0
		);
		return total + itemTotalPrice;
	}, 0);

	if (loading) {
		return <div className='grid text-center'>Loading...</div>;
	}

	if (error) {
		return (
			<div className='grid text-center'>
				An error occured try reloading the page
			</div>
		);
	}

	return (
		<main className='grid min-h-screen'>
			<div className='grid place-self-center lg:w-5/6'>
				<Table
					aria-label='Cart Items'
					className='uppercase w-fit rounded bg-gray-500 grid font-bold'>
					<TableHead>
						<TableRow className='h-2'>
							<TableCell className='font-bold'>Item</TableCell>
							<TableCell className='font-bold'>Price</TableCell>
							<TableCell className='font-bold'>Quantity</TableCell>
							<TableCell className='font-bold'>Amount</TableCell>
							<TableCell className='font-bold'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((item) => (
							<TableRow
								key={item.id}
								hover={true}>
								<TableCell className='grid w-28'>
									<Link to={`/product/${item.product.id}`}>
										<img
											src={`/images/${item.product.image}`}
											alt={item.product.name}
											className='object-contain'
										/>
										{item.product.name}
									</Link>
								</TableCell>
								<TableCell>{item.product.price}</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>{item.product.price * item.quantity}</TableCell>
								<TableCell>
									<FaRegTrashCan
										size={24}
										onClick={() => removeFromCart(item.id)}
										color='red'
										className='cursor-pointer'
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow className='flex justify-center'>
							<TableCell className='font-bold'>Total amount:</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell className='font-bold text-lg'>{totalPrice}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<div className='grid fixed bottom-5 right-3 p-2 bg-green-600 rounded-md font-bold uppercase cursor-pointer'>
				<Link to='/checkout'>Checkout</Link>
			</div>
		</main>
	);
};

const mapStateToProps = (state) => ({
	products: state.products.products,
	items: state.cart.items,
	loading: state.cart.loading,
	error: state.cart.error,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCartItems: () => dispatch(fetchCartItems()),
	addToCart: (productId) => dispatch(addToCart(productId)),
	removeFromCart: (cartId) => dispatch(removeFromCart(cartId)),
	fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
