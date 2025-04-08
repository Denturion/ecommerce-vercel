import { Link, useLocation, useNavigate } from 'react-router';
import {
	Button,
	CartCount,
	CartIconContainer,
	StyledHeader,
} from './styled/StyledHeader';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './contexts/CartContext';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isAdminRoute = location.pathname.startsWith('/admin');
	const { cart } = !isAdminRoute ? useCart() : { cart: [] };

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn');
		console.log('Logged out');
		navigate('/admin');
	};

	return (
		<StyledHeader>
			<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
				<h1>Vanmakt</h1>
			</Link>

			{location.pathname !== '/admin/adminpage' ? (
				<CartIconContainer>
					<Link to='/cart'>
						<FaShoppingCart size={30} />
					</Link>
					{cart.length > 0 && <CartCount>{cart.length}</CartCount>}
				</CartIconContainer>
			) : (
				<Button onClick={handleLogout}>Log out</Button>
			)}
		</StyledHeader>
	);
};
