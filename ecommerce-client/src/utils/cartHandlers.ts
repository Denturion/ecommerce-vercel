import { IOrderItem } from '../components/types/IOrderItem';
import { IProduct } from '../components/types/IProduct';

export const calculateTotalPrice = (cart: IProduct[]): number => {
	return cart.reduce(
		(sum, product) => sum + product.price * (product.quantity || 1),
		0
	);
};

export const mapCartToOrderItems = (cart: IProduct[]): IOrderItem[] => {
	return cart.map((product) => ({
		id: null, // Order item ID is null for new orders
		order_id: 0, // Replace with actual order ID if needed
		product_id: product.id!,
		product_name: product.name,
		quantity: product.quantity || 1,
		unit_price: product.price,
	}));
};
