import axios from 'axios';
import { ICustomer } from '../components/types/ICustomer';
import { ICreateCustomer } from '../components/types/ICreateCustomer';

const API_URL = import.meta.env.VITE_API_URL;
export const createCustomer = async (customer: ICreateCustomer) => {
	try {
		console.log('Creating customer with data:', customer);
		const response = await axios.post(`${API_URL}/customers`, customer);
		console.log('Customer created successfully:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error creating customer:', error);
		throw error;
	}
};

export const fetchAllCustomers = async (): Promise<ICustomer[]> => {
	try {
		const response = await axios.get(`${API_URL}/customers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching customers:', error);
		throw error;
	}
};

export const fetchCustomerByEmail = async (
	email: string
): Promise<ICreateCustomer> => {
	try {
		const response = await axios.get(`${API_URL}/customers/email/${email}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching customer by email:', email, error);
		throw error;
	}
};

export const updateCustomer = async (
	customer: ICustomer
): Promise<ICustomer> => {
	try {
		const response = await axios.patch(
			`${API_URL}/customers/${customer.id}`,
			customer
		);
		return response.data;
	} catch (error) {
		console.error('Error updating customer');
		throw error;
	}
};
export const deleteCustomer = async (customerId: number): Promise<void> => {
	try {
		await axios.delete(`${API_URL}/customers/${customerId}`);
	} catch (error) {
		console.error('Error deleting customer:', error);
		throw error;
	}
};
