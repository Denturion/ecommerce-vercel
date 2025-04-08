import { IOrderItem } from './IOrderItem';

export interface ICreateOrder {
	customer_id: number;
	total_price: number;
	payment_status: string;
	payment_id: string;
	order_status: string;
	customer_firstname: string;
	customer_lastname: string;
	customer_email: string;
	customer_phone: string;
	customer_street_address: string;
	customer_postal_code: string;
	customer_city: string;
	customer_country: string;
	order_items: IOrderItem[];
}
