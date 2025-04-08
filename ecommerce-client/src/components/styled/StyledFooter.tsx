import styled from 'styled-components';

export const StyledFooter = styled.footer`
	background-color: black;
	color: white;
	padding: 20px;
	text-align: center;
	font-size: 20px;
	margin-top: auto;
`;

export const FooterNav = styled.nav`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 10px;
`;

export const FooterLink = styled.a`
	color: red;
	text-decoration: none;
	font-size: 20px;

	&:hover {
		color: #ff6347;
		text-decoration: underline;
	}
`;

export const Copyright = styled.p`
	font-size: 12px;
	color: #aaa;
`;
