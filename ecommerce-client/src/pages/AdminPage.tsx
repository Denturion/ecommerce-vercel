import { useState } from 'react';
import { CustomerForm } from '../components/CustomerForm';

import ProductForm from '../components/ProductForm';
import {
	AdminFormContainer,
	CategoryButton,
	NavContainer,
} from '../components/styled/AdminContainer';

import { IProduct } from '../components/types/IProduct';
import { useProducts } from '../components/hooks/useProducts';

import { ICustomer } from '../components/types/ICustomer';
import { useOrders } from '../components/hooks/useOrders';
import { useCustomers } from '../components/hooks/useCustomers';
import {
	handleDeleteOrder,
	handleDeleteOrderItem,
	handleUpdateOrderItemQuantity,
} from '../utils/orderHandlers';
import { OrderItemContainer } from '../components/styled/OrderItem';

export const AdminPage: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('orders');
	const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);

	const [customerToEdit, setCustomerToEdit] = useState<ICustomer | null>(null);

	const { products, loading, error, loadProducts, handleDelete } =
		useProducts();
	const {
		orders,
		loading: orderLoading,
		error: orderError,
		loadOrders,
	} = useOrders();
	const {
		customers,
		loading: customerLoading,
		error: customerError,
		loadCustomers,
		handleDelete: handleDeleteCustomer,
	} = useCustomers();

	const renderOrders = () => (
		<AdminFormContainer>
			<div className='list-container'>
				<h2>Orders</h2>
				{orderLoading && <p>Loading orders...</p>}
				{orderError && <p>{orderError}</p>}
				<ul>
					{orders && orders.length > 0 ? (
						orders.map((order) => (
							<li key={order.id}>
								<h3>Order #{order.id}</h3>
								<p>
									Customer: {order.customer_firstname} {order.customer_lastname}
								</p>
								<p>Email: {order.customer_email}</p>
								<p>Total Price: ${order.total_price}</p>
								<p>Order status: {order.order_status}</p>
								<p>Payment status: {order.payment_status}</p>
								<button
									onClick={() => {
										if (
											window.confirm(
												'Are you sure you want to delete this order?'
											)
										) {
											order.id && handleDeleteOrder(order.id, loadOrders);
										}
									}}
								>
									Delete Order
								</button>

								<p>Items:</p>
								<ul>
									{order.order_items && order.order_items.length > 0 ? (
										order.order_items.map((item) => (
											<OrderItemContainer key={item.id}>
												<span>{item.product_name}</span> Quantity:
												<select
													value={item.quantity.toString()}
													onChange={(e) => {
														if (
															window.confirm(
																'Are you sure you want to update the quantity?'
															)
														) {
															handleUpdateOrderItemQuantity(
																item.id!,
																parseInt(e.target.value, 10),
																loadOrders
															);
														}
													}}
												>
													<option value='1'>1</option>
													<option value='2'>2</option>
													<option value='3'>3</option>
													<option value='4'>4</option>
													<option value='5'>5</option>
												</select>
												<button
													onClick={() => {
														if (
															window.confirm(
																'Are you sure you want to delete this item?'
															)
														) {
															item.id &&
																handleDeleteOrderItem(item.id, loadOrders);
														}
													}}
												>
													Delete Item
												</button>
											</OrderItemContainer>
										))
									) : (
										<li>No items found.</li>
									)}
								</ul>
							</li>
						))
					) : (
						<p>No orders found.</p>
					)}
				</ul>
			</div>
		</AdminFormContainer>
	);

	const renderProducts = () => (
		<AdminFormContainer>
			<div className='list-container'>
				<h2>Products</h2>
				{loading && <p>Loading products...</p>}
				{error && <p>{error}</p>}
				<ul>
					{products && products.length > 0 ? (
						products.map((product) => (
							<li key={product.id}>
								<h3>{product.name}</h3>
								<p>{product.description}</p>
								<p>Price: ${product.price}</p>
								<p>Stock: {product.stock}</p>
								<button onClick={() => setProductToEdit(product)}>Edit</button>
								<button onClick={() => handleDelete(product.id!)}>
									Delete
								</button>
							</li>
						))
					) : (
						<p>No products found.</p>
					)}
				</ul>
			</div>
			<div className='form-container'>
				<h2>{productToEdit ? 'Edit Product' : 'Create Product'}</h2>
				<ProductForm
					productToEdit={productToEdit}
					onSuccess={loadProducts}
					onCancel={() => setProductToEdit(null)}
				/>
			</div>
		</AdminFormContainer>
	);

	const renderCustomers = () => (
		<AdminFormContainer>
			<div className='list-container'>
				<h2>Customers</h2>
				{customerLoading && <p>Loading customers...</p>}
				{customerError && <p>{customerError}</p>}
				<ul>
					{customers && customers.length > 0 ? (
						customers.map((customer) => (
							<li key={customer.id}>
								<h3>
									{customer.firstname} {customer.lastname}
								</h3>
								<p>Email: {customer.email}</p>
								<p>Phone: {customer.phone}</p>
								<p>
									Address: {customer.street_address}, {customer.city},{' '}
									{customer.country}
								</p>
								<button onClick={() => setCustomerToEdit(customer)}>
									Edit
								</button>
								<button onClick={() => handleDeleteCustomer(customer.id!)}>
									Delete
								</button>
							</li>
						))
					) : (
						<p>No customers found.</p>
					)}
				</ul>
			</div>
			<div className='form-container'>
				<h2>{customerToEdit ? 'Edit Customer' : 'Create Customer'}</h2>
				<CustomerForm
					customerToEdit={customerToEdit}
					onSuccess={loadCustomers}
					onCancel={() => setCustomerToEdit(null)}
				/>
			</div>
		</AdminFormContainer>
	);
	return (
		<main>
			<NavContainer>
				<CategoryButton
					isActive={selectedCategory === 'orders'}
					onClick={() => setSelectedCategory('orders')}
				>
					Orders
				</CategoryButton>
				<CategoryButton
					isActive={selectedCategory === 'products'}
					onClick={() => setSelectedCategory('products')}
				>
					Products
				</CategoryButton>
				<CategoryButton
					isActive={selectedCategory === 'customers'}
					onClick={() => setSelectedCategory('customers')}
				>
					Customers
				</CategoryButton>
			</NavContainer>
			{selectedCategory === 'orders' && renderOrders()}
			{selectedCategory === 'products' && renderProducts()}
			{selectedCategory === 'customers' && renderCustomers()}
		</main>
	);
};
