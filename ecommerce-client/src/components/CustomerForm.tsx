import React, { useEffect, useState } from 'react';
import { createCustomer, updateCustomer } from '../services/customerServices';
import { ICustomer } from '../components/types/ICustomer';
import { FormInput, FormLabel } from './styled/FormInput';
import { ICreateCustomer } from './types/ICreateCustomer';

interface CustomerFormProps {
	customerToEdit?: ICustomer | null;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
	customerToEdit,
	onSuccess,
	onCancel,
}) => {
	const initialCustomerState: ICreateCustomer = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		phone: '',
		street_address: '',
		postal_code: '',
		city: '',
		country: '',
	};

	const [customer, setCustomer] =
		useState<ICreateCustomer>(initialCustomerState);

	useEffect(() => {
		if (customerToEdit) {
			const {
				firstname,
				lastname,
				email,
				phone,
				street_address,
				postal_code,
				city,
				country,
			} = customerToEdit;
			setCustomer({
				firstname,
				lastname,
				email,
				password: '',
				phone,
				street_address,
				postal_code,
				city,
				country,
			});
		} else {
			setCustomer(initialCustomerState);
		}
	}, [customerToEdit]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCustomer({ ...customer, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (customerToEdit) {
				await updateCustomer({ ...customerToEdit, ...customer });
				alert('Customer updated successfully!');
			} else {
				await createCustomer(customer);
				alert('Customer created successfully!');
			}
			if (onSuccess) onSuccess();
		} catch (error) {
			alert('Error creating customer');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<FormLabel>First Name:</FormLabel>
				<FormInput
					type='text'
					name='firstname'
					value={customer.firstname}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Last Name:</FormLabel>
				<FormInput
					type='text'
					name='lastname'
					value={customer.lastname}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Email:</FormLabel>
				<FormInput
					type='email'
					name='email'
					value={customer.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Password:</FormLabel>
				<FormInput
					type='password'
					name='password'
					value={customer.password}
					onChange={handleChange}
					required={!customerToEdit}
				/>
			</div>
			<div>
				<FormLabel>Phone:</FormLabel>
				<FormInput
					type='text'
					name='phone'
					value={customer.phone}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Street Address:</FormLabel>
				<FormInput
					type='text'
					name='street_address'
					value={customer.street_address}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Postal Code:</FormLabel>
				<FormInput
					type='text'
					name='postal_code'
					value={customer.postal_code}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>City:</FormLabel>
				<FormInput
					type='text'
					name='city'
					value={customer.city}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<FormLabel>Country:</FormLabel>
				<FormInput
					type='text'
					name='country'
					value={customer.country}
					onChange={handleChange}
					required
				/>
			</div>
			<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
				<button type='submit'>
					{customerToEdit ? 'Update Customer' : 'Create Customer'}
				</button>
				{onCancel && (
					<button type='button' onClick={onCancel}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};
