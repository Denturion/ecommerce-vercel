import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useProducts } from './hooks/useProducts';

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

interface SearchResult {
	id: string;
	title: string;
	image?: string;
	link: string;
	inDB: boolean;
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
};

export const SearchBar: React.FC = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const { products } = useProducts();
	const searchBarRef = useRef<HTMLDivElement>(null);

	const handleSearch = debounce(async (searchQuery: string) => {
		if (searchQuery.length < 5) {
			setResults([]);
			return;
		}

		setIsLoading(true);

		try {
			const searchResponse = await axios.get(
				`https://www.googleapis.com/customsearch/v1`,
				{
					params: {
						q: searchQuery,
						key: GOOGLE_KEY,
						cx: ENGINE_ID,
						num: 5,
					},
				}
			);
			const items = searchResponse.data.items || [];
			console.log('Search results:', items);

			const enrichedResults = items.map((item: any) => {
				const isInDB = products.some(
					(product) =>
						product.description.toLowerCase() === item.title.toLowerCase()
				);

				return {
					id: item.cacheId || item.link,
					title: item.title,
					link: item.link,
					image:
						item.pagemap?.cse_image?.[0]?.src ||
						item.pagemap?.cse_thumbnail?.[0]?.src ||
						'',
					inDB: isInDB,
				};
			});
			setResults(enrichedResults);
		} catch (error) {
			console.error('Error fetching search results:', error);
		} finally {
			setIsLoading(false);
		}
	}, 500);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchQuery = e.target.value;
		setQuery(searchQuery);
		// handleSearch(searchQuery);
	};

	const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch(query);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchBarRef.current &&
				!searchBarRef.current.contains(event.target as Node)
			) {
				setResults([]);
				setQuery('');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={searchBarRef} style={{ position: 'relative', width: '30rem' }}>
			<input
				type='text'
				placeholder='Search...'
				value={query}
				onChange={handleInputChange}
				onKeyDown={handleSearchEnter}
				style={{
					width: '100%',
					maxWidth: '30rem',
					padding: '1rem',
					border: '1px solid black',
					borderRadius: '2px',
					fontSize: '1rem',
				}}
			/>
			{isLoading}
			{results.length > 0 && (
				<ul
					style={{
						position: 'absolute',
						top: '3.5rem',
						left: 0,
						width: '100%',
						background: 'black',
						border: '1px solid grey',
						borderRadius: '4px',
						listStyle: 'none',
						padding: '0',
						margin: '0',
						zIndex: 1000,
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					}}
				>
					{results.map((result) => (
						<li
							key={result.id}
							style={{
								padding: '8px',
								cursor: result.inDB ? 'pointer' : 'not-allowed',
								display: 'flex',
								alignItems: 'center',
								background: result.inDB ? 'grey' : 'black',
								borderBottom: '1px solid white',
							}}
							onClick={() => window.open(result.link, '_blank')}
						>
							{result.image && (
								<img
									src={result.image}
									alt={result.title}
									style={{
										width: '4rem',
										height: '4rem',
										marginRight: '8px',
										objectFit: 'cover',
									}}
								/>
							)}
							<span
								style={{
									marginLeft: '1rem',
									color: 'white',
									fontSize: '1rem',
									fontWeight: result.inDB ? 'bold' : 'normal',
								}}
							>
								{result.title}
							</span>
							{result.inDB && (
								<span style={{ marginLeft: '8px', color: 'green' }}>
									(Available)
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
