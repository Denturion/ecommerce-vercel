import axios from 'axios';
import { IOrder } from '../components/types/IOrder';
import { ICreateOrder } from '../components/types/ICreateOrder';
const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (order: ICreateOrder) => {
	try {
		console.log('Creating order with data:', order);
		const response = await axios.post(`${API_URL}/orders`, order);
		console.log('Order creation response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error creating order:');
		throw error;
	}
};

export const fetchAllOrders = async (): Promise<IOrder[]> => {
	try {
		const response = await axios.get(`${API_URL}/orders`);
		console.log('Fetched orders:', response.data);

		return response.data.map((order: IOrder) => ({
			...order,
			order_items: order.order_items || [],
		}));
	} catch (error) {
		console.error('Error fetching orders:', error);
		throw error;
	}
};

export const updateOrder = async (
	orderId: string,
	updates: {
		payment_status?: string;
		payment_id?: string;
		order_status?: string;
	}
): Promise<void> => {
	try {
		const response = await axios.patch(
			`${API_URL}/orders/${orderId}`,
			updates,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		console.log('Order updated successfully:', response.data);
	} catch (error) {
		console.error('Error updating order:', error);
		throw error;
	}
};

export const deleteOrder = async (orderId: number): Promise<void> => {
	try {
		await axios.delete(`${API_URL}/orders/${orderId}`);
	} catch (error) {
		console.error('Error deleting order:', error);
		throw error;
	}
};

export const fetchAllOrdersWithItems = async (): Promise<IOrder[]> => {
	try {
		const response = await axios.get(`${API_URL}/orders`);
		const orders: IOrder[] = response.data;

		const ordersWithItems = await Promise.all(
			orders.map(async (order) => {
				try {
					const orderDetailsResponse = await axios.get(
						`${API_URL}/orders/${order.id}`
					);
					return {
						...order,
						order_items: orderDetailsResponse.data.order_items || [],
					};
				} catch (error) {
					console.error(
						`Error fetching details for order ID ${order.id}:`,
						error
					);
					return {
						...order,
						order_items: [],
					};
				}
			})
		);

		return ordersWithItems;
	} catch (error) {
		console.error('Error fetching orders with items:', error);
		throw error;
	}
};

export const deleteOrderItem = async (orderItemId: number) => {
	try {
		await axios.patch(`${API_URL}/order-items/${orderItemId}`);
	} catch (error) {
		console.error('Error deleting order item:', error);
		throw error;
	}
};

export const updateOrderItemQuantity = async (
	orderItemId: number,
	newQuantity: number
): Promise<void> => {
	try {
		await axios.patch(`${API_URL}/order-items/${orderItemId}`, {
			quantity: newQuantity,
		});
	} catch (error) {
		console.error('Error updating order item quantity', error);
		throw error;
	}
};

export const updateOrderStatus = async (
	orderId: number,
	newStatus: string
): Promise<void> => {
	try {
		await axios.patch(`${API_URL}/orders/${orderId}`, {
			order_status: newStatus,
		});
	} catch (error) {
		console.error('Error updating order status', error);
		throw error;
	}
};
