import styled from 'styled-components';

const FormInput = styled.input`
	box-sizing: border-box;
	display: block;
	font-weight: bold;
	font-size: 1rem;
	height: 2rem;
	width: 100%;

	padding: 0.5rem;
`;

const FormLabel = styled.label`
	box-sizing: border-box;
	display: block;
	font-weight: bold;
	width: 100%;
	text-align: left;
	margin-top: 1rem;
`;

const CustomerFormButtonBack = styled.button`
	padding: 0.5rem 1rem;
	background-color: red;
	color: white;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-top: 1rem;

	&:hover {
		background-color: darkred;
	}
`;

const CustomerFormButtonNext = styled.button`
	padding: 0.5rem 1rem;
	background-color: green;
	color: white;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-top: 1rem;
	margin-left: 2rem;

	&:hover {
		background-color: darkgreen;
	}
`;

export { FormInput, FormLabel, CustomerFormButtonBack, CustomerFormButtonNext };
