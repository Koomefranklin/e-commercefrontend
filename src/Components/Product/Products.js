import React, { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function ProductsList() {
	const token = JSON.parse(sessionStorage.getItem('token')).access;
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch(`http://127.0.0.1:8000/api/product`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.ok) {
					const data = await res.json();
					setProducts(data);
				} else {
					console.error('Error fetching products:', res.statusText);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}
		fetchProducts();
	}, [token]);

	async function AddToCart(e) {
		const id = e.currentTarget.value;
		const cartData = { user: 1, product: id, quantity: 1 };
		try {
			const res = await fetch(`http://127.0.0.1:8000/api/cart/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(cartData),
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
	}

	return (
		<main className='grid'>
			<div className='grid'>
				<div className='flex flex-wrap w-full h-max overflow-x-hidden overflow-y-auto gap-2 my-2'>
					{products.map((product) => (
						<div
							className='grid bg-black rounded container w-auto md:w-80 border-2 border-gray-800'
							key={product.id}>
							<Link
								to={`/product/${product.id}`}
								className=''>
								<div className='flex flex-row p-3  justify-around rounded-md mb-10'>
									<div className='h-50 flex flex-col rounded'>
										<img
											src={`/images/${product.image}`}
											alt={product.product_model}
											// className='object-fit'
										/>
										<div className='m-l-2'>
											<h1 className='text-lg font-bold text-center'>
												{product.name.toUpperCase()}
											</h1>
											<div className='bold flex flex-row'>
												Price:
												<div className='text-green-500'>
													Ksh {product.price}
												</div>
											</div>
											<div>Quantity: {product.quantity_available}</div>
											<div>{product.description}</div>
										</div>
									</div>
								</div>
							</Link>
							<button
								value={product.id}
								onClick={AddToCart}
								className='justify-center w-full grid grid-flow-col p-2'>
								<FaCartPlus size={24} />
							</button>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
