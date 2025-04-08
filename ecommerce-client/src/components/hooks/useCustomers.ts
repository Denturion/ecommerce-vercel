import { useEffect, useState } from 'react';
import {
	deleteCustomer,
	fetchAllCustomers,
} from '../../services/customerServices';
import { ICustomer } from '../types/ICustomer';

export const useCustomers = () => {
	const [customers, setCustomers] = useState<ICustomer[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadCustomers = async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedCustomers = await fetchAllCustomers();
			setCustomers(fetchedCustomers);
		} catch (error) {
			setError('Failed to fetch customers');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (customerId: number) => {
		try {
			await deleteCustomer(customerId);
			alert('Customers deleted succesfully!');
			loadCustomers();
		} catch (error) {
			setError('Error deleting customer');
			console.error(error);
		}
	};

	useEffect(() => {
		loadCustomers();
	}, []);
	return { customers, loading, error, loadCustomers, handleDelete };
};
