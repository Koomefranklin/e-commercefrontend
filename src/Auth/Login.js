import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import { connect } from 'react-redux';
import { loginUser } from '../Actions/authActions';

function LoginForm({ loginUser }) {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [hasAccount, setHasAccount] = useState(true);
	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch('http://127.0.0.1:8000/api/token/', {
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
						password: '',
					});
					loginUser(data);
					sessionStorage.setItem('token', JSON.stringify(data));
				});
			} else {
				res.json().then((err) => console.error('Error', err.error));
			}
		} catch (error) {
			console.error('An error occured', error);
		}
	}
	if (hasAccount) {
		return (
			<main className='min-h-screen w-screen grid bg-cover'>
				<form
					method='post'
					className='grid place-self-center w-fit p-10 rounded-md shadow-md justify-center bg-gray-300 text-white dark:bg-gray-600 gap-2'
					onSubmit={handleSubmit}>
					<p className='font-bold text-lg text-center bg-[#112134]'>LOGIN</p>
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
						Login
					</button>
					<button onClick={() => setHasAccount(false)}>Register</button>
				</form>
			</main>
		);
	} else {
		return <Register setHasAccount={setHasAccount} />;
	}
}
export default connect(null, { loginUser })(LoginForm);
