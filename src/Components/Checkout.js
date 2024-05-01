import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, addToCart } from '../Actions/cartActions';
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
import { fetchProducts } from '../Actions/productActions';
import { Link } from 'react-router-dom';

const Checkout = ({
	products,
	fetchProducts,
	items,
	loading,
	error,
	fetchCartItems,
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

	const cartIds = items.map((item) => item.id);

	const [formData, setFormData] = useState({
		cart: '',
		amount: '',
		shipping_address: '',
		payment_method: '',
	});

	useEffect(() => {
		setFormData({ ...formData, amount: totalPrice, cart: cartIds });
	}, [totalPrice]);

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

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const token = JSON.parse(sessionStorage.getItem('token')).access;
			const res = await fetch('http://127.0.0.1:8000/api/order/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				res.json().then((data) => {
					setFormData({
						cart: '',
						amount: '',
						shipping_address: '',
						payment_method: '',
					});
					alert('Success');
				});
			} else {
				res.json().then((err) => console.error('Error', err.error));
			}
		} catch (error) {
			console.error('An error occured', error);
		}
	}

	return (
		<main className='min-h-screen w-screen grid bg-cover'>
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
								<TableCell></TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow className=''>
							<TableCell
								className='grid font-bold'
								rowSpan={3}>
								Total amount:
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell className='font-bold text-lg'>{totalPrice}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<form
				method='post'
				className='grid place-self-center w-fit p-10 rounded-md shadow-md justify-center bg-gray-300 text-white dark:bg-gray-600 gap-2'
				onSubmit={handleSubmit}>
				<p className='font-bold text-lg text-center bg-[#112134]'>
					Checkout Details
				</p>
				<div className='grid'>
					<label
						htmlFor='amount'
						className='font-bold text-lg'>
						Amount
					</label>
					<input
						readOnly
						required
						type='text'
						id='amount'
						name='amount'
						onChange={handleChange}
						value={totalPrice}
						className='p-2 rounded-md border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<div className='grid'>
					<label
						htmlFor='shipping_address'
						className='font-bold text-lg'>
						Shipping Address
					</label>
					<input
						id='shipping_address'
						name='shipping_address'
						type='text'
						required
						onChange={handleChange}
						value={formData.shipping_address}
						className='p-2 rounded border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<div className='grid'>
					<label
						htmlFor='payment_method'
						className='font-bold text-lg'>
						Payment Method
					</label>
					<input
						id='payment_method'
						name='payment_method'
						type='text'
						required
						onChange={handleChange}
						value={formData.payment_method}
						className='p-2 rounded border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<button
					type='submit'
					className='p-2 w-fit bg-[#112134] place-self-center rounded-md'>
					Checkout
				</button>
			</form>
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
	fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
