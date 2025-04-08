import styled from 'styled-components';

export const ProductsContainer = styled.div`
	display: flex;
	grid-template-columns: repeat(1, 1fr);
	gap: 1rem;
	max-width: 1140px;
	margin: 0 auto;
	padding-bottom: 3rem;
	list-style: none;

	/* For small screens (sm) */
	@media (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
	}

	/* For medium screens (md) */
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}

	/* For large screens (lg) */
	@media (min-width: 992px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;
