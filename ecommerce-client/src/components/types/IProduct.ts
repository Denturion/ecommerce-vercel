export interface IProduct {
	id: number | null;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	image: string;
	created_at: string;
	quantity?: number;
}
