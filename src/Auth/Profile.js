import React, { useEffect, useState } from 'react';

export default function Profile() {
	const token = JSON.parse(sessionStorage.getItem('token')).access;
	const [user, setUser] = useState({});
	const [formData, setFormData] = useState({
		id: user.id,
		username: user.username,
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
	});

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await fetch(`http://127.0.0.1:8000/api/user/`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.ok) {
					const data = await res.json();
					setUser(data[0]);
					setFormData(data[0]);
				} else {
					console.error('Error fetching product:', res.statusText);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}
		fetchUser();
	}, [token]);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch(`http://127.0.0.1:8000/api/user/${user.id}/`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				res.json().then((data) => {
					alert('User Details Updated');
				});
			} else {
				res.json().then((err) => console.error('Error', err.error));
			}
		} catch (error) {
			console.error('An error occured', error);
		}
	}

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	}

	return (
		<main className='min-h-screen w-screen grid bg-cover'>
			<form
				method='post'
				className='gridw-fit p-10 rounded-md shadow-md justify-center bg-gray-300 text-white dark:bg-gray-600 gap-2'
				onSubmit={handleSubmit}>
				<p className='font-bold text-lg text-center bg-[#112134]'>
					User Details
				</p>
				<div className='grid'>
					<label
						htmlFor='first_name'
						className='font-bold text-lg'>
						First Name
					</label>
					<input
						required
						type='text'
						id='first_name'
						name='first_name'
						onChange={handleChange}
						value={formData.first_name}
						className='p-2 rounded-md border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<div className='grid'>
					<label
						htmlFor='last_name'
						className='font-bold text-lg'>
						Last Name
					</label>
					<input
						id='last_name'
						name='last_name'
						type='text'
						required
						onChange={handleChange}
						value={formData.last_name}
						className='p-2 rounded border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<div className='grid'>
					<label
						htmlFor='username'
						className='font-bold text-lg'>
						Username
					</label>
					<input
						required
						readOnly
						type='text'
						id='username'
						name='username'
						onChange={handleChange}
						value={formData.username}
						className='p-2 rounded-md border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<div className='grid'>
					<label
						htmlFor='email'
						className='font-bold text-lg'>
						Email Address
					</label>
					<input
						id='email'
						name='email'
						type='email'
						required
						onChange={handleChange}
						value={formData.email}
						className='p-2 rounded border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				{/* <button
					type='submit'
					className='p-2 w-fit bg-[#112134] place-self-center rounded-md'>
					Update
				</button> */}
			</form>
		</main>
	);
}
