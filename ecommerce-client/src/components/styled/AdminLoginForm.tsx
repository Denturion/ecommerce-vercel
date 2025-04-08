import styled from 'styled-components';

export const AdminLoginWrapper = styled.div`
	background: #2a2c2b;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 40vh;
	max-width: 600px;
	width: 100%;
	position: relative;
	padding: 1rem 2rem 3rem 2rem;
	margin-top: 15rem;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 768px) {
		max-height: 50vh;
		width: 80%;
		margin-top: 10rem;
		margin-left: auto;
		margin-right: auto;
	}
`;

export const AdminLoginForm = styled.form`
	display: flex;
	margin-top: 2rem;
	flex-direction: column;
	gap: 1rem;
	text-align: left;
	width: 90%;

	@media (max-width: 768px) {
		width: 100%;
	}
`;
