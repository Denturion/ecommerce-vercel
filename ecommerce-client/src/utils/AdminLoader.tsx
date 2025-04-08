import { redirect } from 'react-router';

export const AdminLoader = ({ isLoginRoute }: { isLoginRoute: boolean }) => {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

	if (isLoginRoute && isLoggedIn) {
		return redirect('/admin/adminpage');
	}

	if (!isLoginRoute && !isLoggedIn) {
		return redirect('/admin');
	}
	return null;
};
