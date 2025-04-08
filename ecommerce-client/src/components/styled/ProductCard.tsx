import styled from 'styled-components';

export const ProductCard = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	padding: 16px;
	margin: 16px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		margin-bottom: 16px;
	}

	h2 {
		font-size: 1rem;
		margin: 8px 0;
	}

	p {
		margin: 4px 0;
		color: #b4b4b4;
		text-align: left;
	}

	button {
		margin-top: 12px;
		padding: 8px 16px;
		background-color: red;
		color: black;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			color: red;
			background-color: black;
		}
	}
`;
