import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchPaymentDetails } from '../services/stripeServices';
import { Title } from '../components/styled/AdminNav';
import { updateOrder } from '../services/orderServices';

export const OrderSummary = () => {
	const [orderDetails, setOrderDetails] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const fetchOrderDetails = async () => {
			const sessionId = searchParams.get('session_id');
			console.log('Session ID from URL:', sessionId);

			if (!sessionId) {
				setError('Session ID is missing.');
				setLoading(false);
				return;
			}

			try {
				const paymentDetails = await fetchPaymentDetails(sessionId);
				console.log('Fetched payment details:', paymentDetails);

				if (!paymentDetails || !paymentDetails.id) {
					setError('No details found.');
					setLoading(false);
					return;
				}

				await updateOrder(paymentDetails.id, {
					payment_status: 'Paid',
					payment_id: sessionId,
					order_status: 'Received',
				});
				console.log('Order updated successfully.');

				setOrderDetails(paymentDetails);
			} catch (error) {
				console.error('Error fetching order details:', error);
				setError('Failed to fetch order details. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchOrderDetails();
	}, [searchParams]);

	useEffect(() => {
		if (orderDetails) {
			console.log('Clearing localStorage...');
			localStorage.removeItem('customerInfo');
			localStorage.removeItem('cart');
		}
	}, [orderDetails]);
	if (loading) {
		return <div>Loading order details...</div>;
	}

	if (error) {
		return <div style={{ color: 'red' }}>{error}</div>;
	}

	if (!orderDetails) {
		return <div>No order details found.</div>;
	}

	return (
		<div>
			<Title>Thank you for your order!</Title>
			<h2>Customer Information</h2>
			<p>
				<strong>Name:</strong> {orderDetails.customer_firstname}{' '}
				{orderDetails.customer_lastname}
			</p>
			<p>
				<strong>Email:</strong> {orderDetails.customer_email}
			</p>
			<p>
				<strong>Phone:</strong> {orderDetails.customer_phone}
			</p>
			<p>
				<strong>Address:</strong> {orderDetails.customer_street_address},{' '}
				{orderDetails.customer_postal_code} {orderDetails.customer_city},{' '}
				{orderDetails.customer_country}
			</p>

			<h2>Products</h2>
			<ul>
				{orderDetails.order_items.map((item: any, index: number) => (
					<li key={index}>
						{item.product_name} - ${item.unit_price} x {item.quantity}
					</li>
				))}
			</ul>

			<h2>Total</h2>
			<p>${orderDetails.total_price.toFixed(2)}</p>

			<h2>Payment Information</h2>
			<p>
				<strong>Payment status:</strong> {orderDetails.payment_status}
			</p>
		</div>
	);
};
