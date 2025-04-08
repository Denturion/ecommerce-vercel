import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../services/productServices';
import { IProduct } from './types/IProduct';
import { FormInput, FormLabel } from './styled/FormInput';

interface ProductFormProps {
	productToEdit?: IProduct | null;
	onSuccess?: () => void;
	onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
	productToEdit,
	onSuccess,
	onCancel,
}) => {
	const initialProductState: IProduct = {
		id: null,
		name: '',
		description: '',
		price: 0,
		stock: 0,
		category: '',
		image: '',
		created_at: new Date().toISOString(),
	};

	const [product, setProduct] = useState<IProduct>(initialProductState);

	useEffect(() => {
		if (productToEdit) {
			setProduct(productToEdit);
		} else {
			setProduct(initialProductState);
		}
	}, [productToEdit]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (product.id) {
				await updateProduct(product);
				alert('Product updated successfully!');
			} else {
				await createProduct(product);
				alert('Product created successfully!');
			}
			setProduct(initialProductState);
			if (onSuccess) onSuccess();
		} catch (error) {
			alert('Error saving product');
		}
	};

	const handleCancel = () => {
		setProduct(initialProductState);
		if (onCancel) onCancel();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<FormLabel>Name:</FormLabel>
				<FormInput
					type='text'
					name='name'
					value={product.name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Description:</FormLabel>
				<textarea
					name='description'
					value={product.description}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Price:</FormLabel>
				<FormInput
					type='number'
					name='price'
					value={product.price}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Stock:</FormLabel>
				<FormInput
					type='number'
					name='stock'
					value={product.stock}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Category:</FormLabel>
				<FormInput
					type='text'
					name='category'
					value={product.category}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Image URL:</FormLabel>
				<FormInput
					type='text'
					name='image'
					value={product.image}
					onChange={handleChange}
					required
				/>
			</div>
			<button type='submit'>
				{product.id ? 'Update Product' : 'Create Product'}
			</button>
			{productToEdit && (
				<button type='button' onClick={handleCancel}>
					Cancel
				</button>
			)}
		</form>
	);
};

export default ProductForm;
