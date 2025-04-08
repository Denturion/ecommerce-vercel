import styled from 'styled-components';

const GlobalMain = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	overflow-x: hidden;
`;

const Content = styled.main`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px;
	width: 100%;
	background: #181818;
`;

export { GlobalMain, Content };
