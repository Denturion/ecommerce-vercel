import { useEffect, useState } from 'react';
import {
	deleteProduct,
	fetchAllProducts,
} from '../../services/productServices';
import { IProduct } from '../types/IProduct';

export const useProducts = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadProducts = async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedProducts = await fetchAllProducts();
			setProducts(fetchedProducts);
		} catch (error) {
			setError('Failed to fetch products');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (productId: number) => {
		try {
			await deleteProduct(productId);
			alert('Product deleted successfully!');
			loadProducts();
		} catch (error) {
			alert('Error deleting product');
			console.error(error);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	return { products, loading, error, loadProducts, handleDelete };
};
