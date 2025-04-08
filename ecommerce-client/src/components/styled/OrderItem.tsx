import styled from 'styled-components';

export const OrderItemContainer = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	margin: 5px 0;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #f9f9f9;

	& > span {
		flex: 1;
		margin-right: 10px;
	}

	& > select {
		margin-right: 10px;
	}

	& > button {
		margin-left: 10px;
	}
`;
