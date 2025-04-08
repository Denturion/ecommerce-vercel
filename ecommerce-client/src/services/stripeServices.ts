import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchClientSecret = async (
	cart: any[],
	customerId: string
): Promise<string> => {
	try {
		const response = await axios.post(
			`${API_URL}/create-checkout-session`,
			{
				cart,
				customerId,
				success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${window.location.origin}/cart`,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.sessionId;
	} catch (error) {
		console.error('Error fetching client secret', error);
		throw error;
	}
};

export const fetchSessionStatus = async (sessionId: string): Promise<any> => {
	try {
		const response = await axios.get(
			`${API_URL}/session_status?session_id=${sessionId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching session status:', error);
		throw error;
	}
};

export const fetchPaymentDetails = async (sessionId: string): Promise<any> => {
	console.log('Calling fetchPaymentDetails with sessionId:', sessionId);

	try {
		const response = await axios.get(`${API_URL}/orders/payment/${sessionId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('Response from fetchPaymentDetails:', response.data);

		return response.data;
	} catch (error) {
		console.error('Error fetching payment details:', error);
		throw error;
	}
};
