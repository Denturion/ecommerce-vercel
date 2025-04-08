import { createContext, useContext, useEffect, useState } from 'react';
import { IProduct } from '../types/IProduct';

interface CartContextType {
	cart: IProduct[];
	addToCart: (product: IProduct) => void;
	removeFromCart: (productId: number) => void;
	setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<IProduct[]>(() => {
		const storedCart = localStorage.getItem('cart');
		return storedCart ? JSON.parse(storedCart) : [];
	});

	const addToCart = (product: IProduct) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((p) => p.id === product.id);
			if (existingProduct) {
				return prevCart.map((p) =>
					p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const removeFromCart = (productId: number) => {
		setCart((prevCart) => {
			const updatedCart = prevCart.filter(
				(product) => product.id !== productId
			);
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
