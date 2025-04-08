import { ProductsContainer } from '../components/styled/ProductsContainer';
import { Title } from '../components/styled/AdminNav';
import { useCart } from '../components/contexts/CartContext';
import { useProducts } from '../components/hooks/useProducts';
import { ProductCard } from '../components/styled/ProductCard';

export const HomePage = () => {
	const { products, loading, error } = useProducts();
	const { addToCart } = useCart();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<main>
			<Title>Products</Title>
			<ProductsContainer>
				{products.map((product) => (
					<ProductCard key={product.id}>
						<img src={product.image} alt={product.name} />
						<h2>{product.name}</h2>
						<p>{product.description}</p>
						<p>Price: ${product.price}</p>
						<p>Category: {product.category}</p>
						<button onClick={() => addToCart(product)}>Add to cart</button>
					</ProductCard>
				))}
			</ProductsContainer>
		</main>
	);
};
