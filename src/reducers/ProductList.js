import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

const ProductList = ({ products, fetchProducts }) => {
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div>
			<h2>Product List</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id}>{product.name}</li>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.products,
});

export default connect(mapStateToProps, { fetchProducts })(ProductList);
