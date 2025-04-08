import styled from 'styled-components';

export const AdminFormContainer = styled.section`
	display: flex;
	width: 80vw;
	gap: 2rem;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 30px;
	padding: 20px;
	border-radius: 8px;
	margin-top: 5rem;

	h2 {
		font-size: 24px;
		font-weight: 600;
		color: #fff;
		margin-bottom: 20px;
	}
	.list-container {
		flex: 1;
		max-width: 50%;
		background-color: #111;
		padding: 15px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
		overflow-y: auto;
		color: #fff;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		li {
			margin-bottom: 15px;
			padding: 10px;
			border: 1px solid #444;
			border-radius: 5px;
			background-color: #222;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #333;
			}

			h3 {
				margin: 0;
				font-size: 18px;
				color: #fff;
			}

			p {
				margin: 5px 0;
				font-size: 14px;
				color: #aaa;
			}

			button {
				margin-right: 10px;
				padding: 5px 10px;
				font-size: 14px;
				cursor: pointer;
				background-color: #ff0000;
				color: #fff;
				border: none;
				border-radius: 3px;
				transition: background-color 0.3s ease;

				&:hover {
					background-color: #cc0000;
				}
			}
		}
	}
	.form-container {
		flex: 1;
		max-width: 55%;
		background-color: #111;
		padding: 15px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
		color: #fff;
	}
`;

export const NavContainer = styled.nav`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-bottom: 20px;
	padding: 10px 0;
`;

export const CategoryButton = styled.button<{ isActive: boolean }>`
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	background-color: ${({ isActive }) => (isActive ? '#ff0000' : '#333')};
	color: ${({ isActive }) => (isActive ? 'black' : '#fff')};
	border: 1px solid #ff0000;
	border-radius: 5px;
	transition: background-color 0.3s ease, transform 0.2s ease;

	&:hover {
		background-color: ${({ isActive }) => (isActive ? '#cc0000' : '#444')};
		transform: scale(1.05);
	}
`;
