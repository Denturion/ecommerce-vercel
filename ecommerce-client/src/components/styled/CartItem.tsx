import styled from 'styled-components';

export const CartItem = styled.li`
	display: flex;
	align-items: center;
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 0.5rem;
		margin-right: 1rem;
	}

	.details {
		flex: 1;
		display: flex;
		flex-direction: column;

		h2 {
			font-size: 1rem;
			margin: 0 0 0.5rem;
		}

		p {
			margin: 0.25rem 0;
			color: #bdbdbd;
		}

		.quantity {
			display: flex;
			align-items: center;
			margin-top: 0.5rem;

			select {
				margin-left: 0.5rem;
				padding: 0.25rem;
				border: 1px solid #ccc;
				border-radius: 0.25rem;
			}
		}
	}

	button {
		margin-left: 1rem;
		padding: 0.5rem 0.75rem;
		background-color: red;
		color: white;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: darkred;
		}
	}
`;

export const CartSummary = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	padding: 1rem;
	border-top: 1px solid #ccc;

	.total {
		font-size: 1rem;
		font-weight: bold;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: green;
		color: white;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: darkgreen;
		}
	}
`;
