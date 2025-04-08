import axios from 'axios';
import { IProduct } from '../components/types/IProduct';
import { ICreateProduct } from '../components/types/ICreateProduct';

const API_URL = import.meta.env.VITE_API_URL;
export const createProduct = async (product: ICreateProduct): Promise<void> => {
	try {
		const response = await axios.post(`${API_URL}/products`, product);

		return response.data;
	} catch (error) {
		console.error('Error creating product:', error);
		throw error;
	}
};

export const fetchAllProducts = async () => {
	try {
		const response = await axios.get(`${API_URL}/products`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

export const updateProduct = async (product: IProduct) => {
	try {
		const response = await axios.patch(
			`${API_URL}/products/${product.id}`,
			product
		);
		return response.data;
	} catch (error) {
		console.error('Erorr updating product:', error);
		throw error;
	}
};

export const deleteProduct = async (productId: number) => {
	try {
		const response = await axios.delete(`${API_URL}/products/${productId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting product:', error);
		throw error;
	}
};
