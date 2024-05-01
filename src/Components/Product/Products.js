import React, { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../Actions/productActions';
import { addToCart } from '../../Actions/cartActions';
import Fuse from 'fuse.js';

const ProductList = ({
	products,
	fetchProducts,
	cartItems,
	addToCart,
	loading,
	error,
}) => {
	const options = {
		includeScore: true,
		keys: ['name', 'description', 'category'],
	};
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	const [displayProducts, setDisplayProducts] = useState(products);
	const fuse = new Fuse(products, options);
	const [searchProduct, setSearchProduct] = useState([]);

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

	function handleSearch(e) {
		setSearchProduct(e.target.value);
		const foundProducts = fuse
			.search(searchProduct)
			.filter((element) => element.score < 0.3)
			.map((element) => element.item);
		if (searchProduct.length === 0) {
			setDisplayProducts(products);
		} else {
			setDisplayProducts(foundProducts);
		}
	}

	return (
		<main className='grid'>
			<div className='grid'>
				<form className=''>
					<label htmlFor='query'>Search for products:</label>
					<input
						type='search'
						id='query'
						className='bg-gray-500 rounded-md p-2'
						onKeyDown={handleSearch}
					/>
				</form>
				<div className='flex flex-wrap w-full h-max overflow-x-hidden overflow-y-auto gap-2 my-2'>
					{displayProducts.map((product) => (
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
								onClick={() => addToCart(product.id)}
								className='justify-center w-full grid grid-flow-col p-2'>
								<FaCartPlus size={24} />
							</button>
						</div>
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

const mapDispatchToProps = (dispatch) => ({
	addToCart: (productId) => dispatch(addToCart(productId)),
	fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
