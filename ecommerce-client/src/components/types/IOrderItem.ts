export interface IOrderItem {
	id: number | null;
	order_id: number;
	product_id: number;
	product_name: string;
	quantity: number;
	unit_price: number;
	created_at?: string;
}
