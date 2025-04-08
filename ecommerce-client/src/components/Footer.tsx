import {
	Copyright,
	FooterLink,
	FooterNav,
	StyledFooter,
} from './styled/StyledFooter';

export const Footer = () => {
	return (
		<>
			<StyledFooter>
				<FooterNav>
					<FooterLink href='#'>Home</FooterLink>
					<FooterLink href='#'>Cart</FooterLink>
				</FooterNav>
				<Copyright>© 2025 Vanmakt Records. All Rights Reserved</Copyright>
			</StyledFooter>
		</>
	);
};
