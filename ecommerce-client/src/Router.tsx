import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import App from './App';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLoader } from './utils/AdminLoader';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './components/contexts/CartContext';
import { SuccessPage } from './pages/SuccessPage';
import { OrderSummary } from './pages/OrderSummary';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<CartProvider>
				<App />
			</CartProvider>
		),
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/product',
				element: <ProductPage />,
			},

			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/success',
				element: <SuccessPage />,
			},
			{
				path: '/order-summary',
				element: <OrderSummary />,
			},
		],
	},

	{
		path: '/admin',
		element: <App />,
		children: [
			{
				path: '/admin',
				element: <AdminLogin />,
				loader: () => AdminLoader({ isLoginRoute: true }),
			},
			{
				path: 'adminpage',
				element: <AdminPage />,
				loader: () => AdminLoader({ isLoginRoute: false }),
			},
		],
	},

	{
		path: '*',
		element: <NotFoundPage />,
	},
]);
