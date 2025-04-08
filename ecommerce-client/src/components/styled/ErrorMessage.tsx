import styled from 'styled-components';

export const ErrorMessage = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: red;
	color: white;
	text-align: center;
	padding-top: 15px;
	padding-bottom: 15px;
	font-weight: bold;
	z-index: 1000;
`;

export const BookingErrorMessage = styled.p`
	box-sizing: border-box;
	background-color: rgba(0, 0, 0, 0.5);
	color: red;
	width: 100%;
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 1px;
	margin: 0;
	border-radius: 3px;
	padding: 10px;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25);

	@media (max-width: 768px) {
	}
`;
