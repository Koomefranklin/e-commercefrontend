import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';
import { connect } from 'react-redux';
import { fetchProducts } from '../../Actions/productActions';
import { addToCart, removeFromCart } from '../../Actions/cartActions';

const Product = ({
	products,
	fetchProducts,
	cartItems,
	addToCart,
	removeFromCart,
	loading,
	error,
}) => {
	const { product_id } = useParams();
	const [product, setProduct] = useState({});
	const [category, setCategory] = useState(null);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const token = JSON.parse(sessionStorage.getItem('token')).access;
				const res = await fetch(
					`http://127.0.0.1:8000/api/product/${product_id}/`,
					{
						method: 'GET',
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (res.ok) {
					const data = await res.json();
					setProduct(data);
					setCategory(data.category);
				} else {
					console.error('Error fetching product:', res.statusText);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}
		fetchProduct();
	}, [product_id]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

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
		<main className='grid overflow-x-hidden'>
			<div className='grid justify-center w-min lg:w-full bg-gray-600'>
				<div className='grid justify-center gap-1 overflow-hidden'>
					<img
						src={`/images/${product.image}`}
						alt={product.name}
						className='object-contain'
					/>
				</div>
				<div className=''>
					<div className='mx-20 '>
						<div className='font-bold text-center text-xl uppercase'>
							{product.name}
						</div>
						<div className=''>
							KES
							<span className='text-green-500 text-xl mx-20 justify-right'>
								{product.price}
							</span>
						</div>
						<div className=''>Quantity: {product.quantity_available}</div>
						<div>{product.description}</div>
					</div>
				</div>
			</div>
			<div className='fixed bottom-3 right-3 w-fit grid bg-cyan-950 p-4 rounded-md font-bold justify-center text-white'>
				<button
					className='grid grid-flow-col gap-2'
					onClick={() => addToCart}
					value={product.id}>
					<FaCartPlus
						size={28}
						className='animate-bounce'
					/>{' '}
					Add to Cart
				</button>
			</div>

			<div className='grid'>
				<p className='font-bold text-lg uppercase text-center'>More Products</p>
				<div className='flex flex-wrap gap-1 h-max text-xs '>
					{products.map((product) => (
						<Link
							key={product.id}
							to={`/product/${product.id}`}
							className='bg-black rounded text-sm border-x-2 border-x-gray-800 grid p-3 lg:w-80 rounded-md mb-10'>
							<img
								src={`/images/${product.image}`}
								alt={product.name}
							/>
							<div className='flex flex-col flex-wrap'>
								<div className='text-lg font-bold text-center'>
									{product.name.toUpperCase()}
								</div>
								<div className='font-bold text-green-400'>
									KES
									{product.price}
								</div>
								<div>{product.description}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
};

const mapStateToProps = (state) => ({
	products: state.products.products,
	loading: state.products.loading,
	error: state.products.error,
	cartItems: state.cart.items,
});

export default connect(mapStateToProps, {
	fetchProducts,
	addToCart,
	removeFromCart,
})(Product);
