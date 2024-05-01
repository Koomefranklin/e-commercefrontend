import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/NotFound';
import ProductsList from './Components/Product/Products';
import Product from './Components/Product/Product';
import Profile from './Auth/Profile';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Logout from './Auth/Logout';
import { loginUser, logoutUser } from './Actions/authActions';
import { connect } from 'react-redux';

const App = ({ isLoggedIn, loginUser, logoutUser }) => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState();

	useEffect(() => {
		async function fetchToken() {
			try {
				const tokenData = JSON.parse(sessionStorage.getItem('token'));
				if (tokenData) {
					const token = tokenData;
					setToken(token.access);
					loginUser(token);
				} else {
					logoutUser();
				}
			} catch (err) {
				console.error('An error occured', err);
			}
		}
		fetchToken();
	}, [isLoggedIn, loginUser, logoutUser]);

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await fetch(`http://127.0.0.1:8000/api/user`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.ok) {
					const data = await res.json();
					setUser(data[0]);
				} else {
					console.error('Error fetching user data:', res.statusText);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}

		fetchUser();
	}, [token, isLoggedIn, loginUser, logoutUser]);

	return (
		<Router>
			<div className='grid min-h-screen w-full'>
				{!isLoggedIn && <Login />}
				<div className='grid grid-flow-col sticky h-fit top-0 left-0 w-full p-2 border-b bg-black'>
					<div className='grid justify-start'>FullStack Ecommerce</div>
					<div className='grid justify-end grid-flow-col gap-3'>
						<Link
							to='/profile'
							title='User Profile'>
							{user?.username}
						</Link>
						{isLoggedIn && <Logout />}
					</div>
				</div>
				<div className='grid grid-flow-col sticky h-fit top-0 left-0 w-full p-2 border-b bg-black'>
					<div className='grid justify-center grid-flow-col gap-3'>
						<Link
							to='/products'
							title='Products'>
							Products
						</Link>
						<Link
							to='/cart'
							title='Cart'>
							Cart
						</Link>
					</div>
				</div>
				<Routes>
					<Route
						path='/'
						element={<Dashboard />}
					/>
					<Route element={<NotFound />} />
					<Route
						path='/products'
						element={<ProductsList />}
					/>
					<Route
						path={`product/:product_id`}
						element={<Product />}
					/>
					<Route
						path='/profile'
						element={<Profile />}
					/>
					<Route
						path='/cart'
						element={<Cart />}
					/>
					<Route
						path='/checkout'
						element={<Checkout />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser, logoutUser })(App);
