import React, { useState, useEffect } from 'react';

export default function Dashboard() {
	// const [orders, setOrders] = useState({});
	// const token = JSON.parse(sessionStorage.getItem('token')).access;
	// useEffect(() => {
	// 	async function fetchOrders() {
	// 		try {
	// 			const res = await fetch(`http://127.0.0.1:8000/api/order`, {
	// 				method: 'GET',
	// 				headers: {
	// 					Accept: 'application/json',
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			});

	// 			if (res.ok) {
	// 				const data = await res.json();
	// 				setOrders(data);
	// 			} else {
	// 				console.error('Error fetching order data:', res.statusText);
	// 			}
	// 		} catch (error) {
	// 			console.error('An error occurred:', error);
	// 		}
	// 	}

	// 	fetchOrders();
	// }, [token]);

	return (
		<div className='grid'>
			<div className='grid'>
				{/* <div className='grid'>{orders?.product}</div> */}
			</div>
		</div>
	);
}
