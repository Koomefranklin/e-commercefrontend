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

const Cart = ({ cartItems, products }) => {
	// const token = JSON.parse(sessionStorage.getItem('token')).access;
	// const [userCart, setUserCart] = useState([]);

	async function handleDecreaseQuantity(e) {
		// 	const id = e.currentTarget.value;
		// 	const formData = {};
		// 	try {
		// 		const res = await fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
		// 			method: 'PUT',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				Accept: 'application/json',
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 			body: JSON.stringify(formData),
		// 		});
		// 		if (res.ok) {
		// 			res.json().then((data) => {
		// 				alert('Cart Quantity Updated');
		// 			});
		// 		} else {
		// 			res.json().then((err) => console.error('Error', err.error));
		// 		}
		// 	} catch (error) {
		// 		console.error('An error occured', error);
		// 	}
	}

	async function handleIncreaseQuantity(e) {}

	async function handleRemoveFramCart(e) {
		// 	const id = e.currentTarget.value;
		// 	try {
		// 		const res = await fetch(`http://127.0.0.1:8000/api/cart/${id}`, {
		// 			method: 'DELETE',
		// 			headers: {
		// 				Accept: 'application/json',
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 		});
		// 		if (res.ok) {
		// 			alert('Item removed from Cart', 'success');
		// 		} else {
		// 			console.error('Error:', res.statusText);
		// 		}
		// 	} catch (error) {
		// 		console.error('An error occurred:', error);
		// 	}
	}

	// useEffect(() => {
	// 	async function fetchCart() {
	// 		try {
	// 			const res = await fetch(`http://127.0.0.1:8000/api/cart-view/`, {
	// 				method: 'GET',
	// 				headers: {
	// 					Accept: 'application/json',
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			});

	// 			if (res.ok) {
	// 				const data = await res.json();
	// 				setUserCart(data);
	// 			} else {
	// 				console.error('Error fetching products:', res.statusText);
	// 			}
	// 		} catch (error) {
	// 			console.error('An error occurred:', error);
	// 		}
	// 	}
	// 	fetchCart();
	// }, [token]);

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
						{cartItems.map((item) => (
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
									<ButtonGroup className='gap-2'>
										<Tooltip
											title='Decrease Quantity'
											placement='top'
											className='bg-red-500 rounded cursor-pointer'
											onClick={handleDecreaseQuantity}
											value={item.id}>
											<FaMinus
												size={24}
												color='white'
												className=''
											/>
										</Tooltip>
										<Tooltip
											title='Increase Quantity'
											className='bg-green-500 rounded cursor-pointer'
											onClick={handleIncreaseQuantity}
											value={item.id}>
											<FaPlus
												size={24}
												color='white'
												className=''
											/>
										</Tooltip>
										<button
											title='Remove from cart'
											className='bg-red-600 rounded cursor-pointer'
											onClick={handleRemoveFramCart}
											value={item.id}>
											<FaRegTrashCan
												size={24}
												color='white'
												className=''
											/>
										</button>
									</ButtonGroup>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow className='flex justify-center'>
							<TableCell className='font-bold'>Total amount:</TableCell>
							<TableCell className='font-bold text-lg'>{''}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<div className='grid fixed bottom-5 right-3 p-2 bg-green-600 rounded-md font-bold uppercase'>
				Checkout
			</div>
		</main>
	);
};

const mapStateToProps = (state) => ({
	cartItems: state.cart.items,
	products: state.products.products,
});

export default connect(mapStateToProps)(Cart);
