import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../Actions/authActions';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = ({ logoutUser }) => {
	const handleLogout = () => {
		logoutUser();
	};

	return (
		<button onClick={handleLogout}>
			<FaSignOutAlt size={24} />
		</button>
	);
};

export default connect(null, { logoutUser })(LogoutButton);
