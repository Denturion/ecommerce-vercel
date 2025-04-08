// import React, { useEffect, useState } from 'react';
// import { createOrder, updateOrder } from '../services/orderServices';
// import { FormInput, FormLabel } from './styled/FormInput';
// import {
// 	FormContainer,
// 	OrderDetails,
// 	OrderItems,
// } from './styled/FormContainer';
// import { ICreateOrder } from './types/ICreateOrder';
// import { IOrder } from './types/IOrder';

// interface OrderFormProps {
// 	orderToEdit?: IOrder | null;
// 	onSuccess?: () => void;
// 	onCancel?: () => void;
// }

// export const OrderForm: React.FC<OrderFormProps> = ({
// 	orderToEdit,
// 	onSuccess,
// 	onCancel,
// }) => {
// 	const initialOrderState: ICreateOrder = {
// 		customer_id: 0,
// 		total_price: 0,
// 		payment_status: 'Unpaid',
// 		order_status: 'Pending',
// 		customer_firstname: '',
// 		customer_lastname: '',
// 		customer_email: '',
// 		customer_phone: '',
// 		customer_street_address: '',
// 		customer_postal_code: '',
// 		customer_city: '',
// 		customer_country: '',
// 		order_items: [],
// 	};

// 	const [order, setOrder] = useState<ICreateOrder>(initialOrderState);

// 	useEffect(() => {
// 		if (orderToEdit) {
// 			const {
// 				customer_id,
// 				total_price,
// 				payment_status,
// 				order_status,
// 				customer_firstname,
// 				customer_lastname,
// 				customer_email,
// 				customer_phone,
// 				customer_street_address,
// 				customer_postal_code,
// 				customer_city,
// 				customer_country,
// 				order_items,
// 			} = orderToEdit;
// 			setOrder({
// 				customer_id,
// 				total_price,
// 				payment_status,
// 				order_status,
// 				customer_firstname,
// 				customer_lastname,
// 				customer_email,
// 				customer_phone,
// 				customer_street_address,
// 				customer_postal_code,
// 				customer_city,
// 				customer_country,
// 				order_items,
// 			});
// 		} else {
// 			setOrder(initialOrderState);
// 		}
// 	}, [orderToEdit]);

// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setOrder({ ...order, [name]: value });
// 	};

// 	const handleOrderItemChange = (
// 		index: number,
// 		e: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const { name, value } = e.target;
// 		const updatedOrderItems = [...order.order_items];
// 		updatedOrderItems[index] = {
// 			...updatedOrderItems[index],
// 			[name]:
// 				name === 'quantity' || name === 'unit_price'
// 					? parseFloat(value)
// 					: value,
// 		};
// 		setOrder({ ...order, order_items: updatedOrderItems });
// 	};

// 	const addOrderItem = () => {
// 		setOrder({
// 			...order,
// 			order_items: [
// 				...order.order_items,
// 				{ product_id: 0, product_name: '', quantity: 0, unit_price: 0 },
// 			],
// 		});
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			const calculatedTotalPrice = order.order_items.reduce(
// 				(total, item) => total + item.quantity * item.unit_price,
// 				0
// 			);
// 			const orderToSubmit = { ...order, total_price: calculatedTotalPrice };

// 			console.log('Submitting order:', orderToSubmit);

// 			if (orderToEdit) {
// 				await updateOrder({ ...orderToEdit, ...orderToSubmit });
// 				alert('Order updated successfully!');
// 			} else {
// 				await createOrder(orderToSubmit);
// 				alert('Order created successfully!');
// 			}
// 			if (onSuccess) onSuccess();
// 		} catch (error) {
// 			alert('Error creating or updating order');
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<FormContainer>
// 				<OrderDetails>
// 					<div>
// 						<FormLabel>Customer ID:</FormLabel>
// 						<FormInput
// 							type='number'
// 							name='customer_id'
// 							value={order.customer_id || ''}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Payment Status:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='payment_status'
// 							value={order.payment_status}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>

// 					<div>
// 						<FormLabel>Order Status:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='order_status'
// 							value={order.order_status}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Customer First Name:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_firstname'
// 							value={order.customer_firstname}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Customer Last Name:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_lastname'
// 							value={order.customer_lastname}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Customer Email:</FormLabel>
// 						<FormInput
// 							type='email'
// 							name='customer_email'
// 							value={order.customer_email}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Customer Phone:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_phone'
// 							value={order.customer_phone}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Street Address:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_street_address'
// 							value={order.customer_street_address}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Postal Code:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_postal_code'
// 							value={order.customer_postal_code}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>City:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_city'
// 							value={order.customer_city}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<FormLabel>Country:</FormLabel>
// 						<FormInput
// 							type='text'
// 							name='customer_country'
// 							value={order.customer_country}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</div>
// 				</OrderDetails>
// 				<OrderItems>
// 					<h3>Order Items</h3>
// 					{order.order_items.map((item, index) => (
// 						<div key={index}>
// 							<FormLabel>Product ID:</FormLabel>
// 							<FormInput
// 								type='number'
// 								name='product_id'
// 								value={item.product_id}
// 								onChange={(e) => handleOrderItemChange(index, e)}
// 								required
// 							/>
// 							<FormLabel>Product Name:</FormLabel>
// 							<FormInput
// 								type='text'
// 								name='product_name'
// 								value={item.product_name}
// 								onChange={(e) => handleOrderItemChange(index, e)}
// 								required
// 							/>
// 							<FormLabel>Quantity:</FormLabel>
// 							<FormInput
// 								type='number'
// 								name='quantity'
// 								value={item.quantity}
// 								onChange={(e) => handleOrderItemChange(index, e)}
// 								required
// 							/>
// 							<FormLabel>Unit Price:</FormLabel>
// 							<FormInput
// 								type='number'
// 								name='unit_price'
// 								value={item.unit_price}
// 								onChange={(e) => handleOrderItemChange(index, e)}
// 								required
// 							/>
// 						</div>
// 					))}
// 					<button type='button' onClick={addOrderItem}>
// 						Add Order Item
// 					</button>
// 				</OrderItems>
// 			</FormContainer>
// 			<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
// 				<button type='submit'>
// 					{orderToEdit ? 'Update Order' : 'Create Order'}
// 				</button>
// 				{onCancel && (
// 					<button type='button' onClick={onCancel}>
// 						Cancel
// 					</button>
// 				)}
// 			</div>
// 		</form>
// 	);
// };
