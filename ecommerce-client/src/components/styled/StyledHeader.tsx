import styled from 'styled-components';

export const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: black;
	color: red;
	padding-left: 5rem;
	padding-right: 5rem;
`;

export const Nav = styled.nav`
	display: flex;
	gap: 15px;
`;

export const CartIconContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	a {
		color: red;
	}
`;

export const CartCount = styled.span`
	position: absolute;
	top: -5px;
	right: -10px;
	background-color: white;
	color: black;
	font-size: 12px;
	font-weight: bold;
	border-radius: 50%;
	padding: 2px 6px;
`;

export const Button = styled.button`
	background-color: red;
	color: white;
	border: none;
	padding: 10px 20px;
	font-size: 16px;
	font-weight: 500;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #a50000;
	}
`;
