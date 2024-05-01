import React, { useState } from 'react';
export default function Register({ setHasAccount }) {
	const [formData, setFormData] = useState({
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	});
	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch('http://127.0.0.1:8000/api/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				res.json().then((data) => {
					setFormData({
						username: '',
						first_name: '',
						last_name: '',
						email: '',
						password: '',
					});
					alert('User Created Proceed to Login');
					setHasAccount(true);
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
			<form
				method='post'
				className='grid place-self-center w-fit p-10 rounded-md shadow-md justify-center bg-gray-300 text-white dark:bg-gray-600 gap-2'
				onSubmit={handleSubmit}>
				<p className='font-bold text-lg text-center bg-[#112134]'>
					Register User
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
				<div className='grid'>
					<label
						htmlFor='item'
						className='font-bold text-lg'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						required
						onChange={handleChange}
						value={formData.password}
						className='p-2 rounded border-2 border-black dark:border-white bg-gray-400'
					/>
				</div>
				<button
					type='submit'
					className='p-2 w-fit bg-[#112134] place-self-center rounded-md'>
					Register
				</button>
			</form>
		</main>
	);
}
