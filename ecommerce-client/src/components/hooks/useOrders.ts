import { useEffect, useState } from 'react';
import {
	deleteOrder,
	fetchAllOrdersWithItems,
} from '../../services/orderServices';
import { IOrder } from '../types/IOrder';

export const useOrders = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadOrders = async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedOrders = await fetchAllOrdersWithItems();
			setOrders(fetchedOrders);
		} catch (error) {
			setError('Failed to fetch orders');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (orderId: number) => {
		try {
			await deleteOrder(orderId);
			alert('Order deleted successfully!');
			loadOrders();
		} catch (error) {
			alert('Error deleting order');
			console.error(error);
		}
	};

	useEffect(() => {
		loadOrders();
	}, []);
	return { orders, loading, error, loadOrders, handleDelete };
};
