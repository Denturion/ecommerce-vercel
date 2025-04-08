import {
	deleteOrder,
	deleteOrderItem,
	updateOrderItemQuantity,
	updateOrderStatus,
} from '../services/orderServices';

export const handleDeleteOrder = async (
	orderId: number,
	loadOrders: () => void
) => {
	try {
		await deleteOrder(orderId);
		loadOrders();
	} catch (error) {
		console.error('Error deleting order:', error);
	}
};

export const handleDeleteOrderItem = async (
	orderItemId: number,
	loadOrders: () => void
) => {
	try {
		await deleteOrderItem(orderItemId);
		loadOrders();
	} catch (error) {
		console.error('Error deleting order item:', error);
	}
};

export const handleUpdateOrderItemQuantity = async (
	orderItemId: number,
	newQuantity: number,
	loadOrders: () => void
) => {
	try {
		await updateOrderItemQuantity(orderItemId, newQuantity);
		loadOrders();
	} catch (error) {
		console.error('Error updating order item quantity', error);
	}
};

export const handleUpdateOrderStatus = async (
	orderId: number,
	newStatus: string,
	loadOrders: () => void
) => {
	try {
		await updateOrderStatus(orderId, newStatus);
		loadOrders();
	} catch (error) {
		console.error('Error updating order status', error);
	}
};
