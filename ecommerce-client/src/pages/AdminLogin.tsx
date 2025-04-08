import { ChangeEvent, FormEvent, useState } from 'react';
import {
	AdminLoginForm,
	AdminLoginWrapper,
} from '../components/styled/AdminLoginForm';
import { FormInput, FormLabel } from '../components/styled/FormInput';
import { ErrorMessage } from '../components/styled/ErrorMessage';
import { useNavigate } from 'react-router';

export const AdminLogin = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [error, setError] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
		setError('');
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (username === 'admin' && password === 'admin') {
			console.log('Logged in');
			localStorage.setItem('isLoggedIn', 'true');
			navigate('/admin/adminpage');
		} else {
			console.log('Ogiltiga inloggningsuppgifter');
			setError('Ogiltiga inloggningsuppgifter');
			return;
		}
		setError('');
	};

	return (
		<>
			<AdminLoginWrapper>
				<h2>Logga in</h2>
				<AdminLoginForm onSubmit={handleSubmit}>
					<FormLabel>Användarnamn</FormLabel>
					<FormInput
						type='text'
						name='username'
						onChange={handleChange}
						placeholder='Användarnamn'
					></FormInput>

					<FormLabel>Lösenord</FormLabel>
					<FormInput
						type='password'
						name='password'
						onChange={handleChange}
						placeholder='Lösenord'
					></FormInput>

					<button
						type='submit'
						style={{
							fontFamily: 'Fraunces',
							background: '#B79C63',
							color: 'black',
						}}
					>
						Logga in
					</button>
				</AdminLoginForm>
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</AdminLoginWrapper>
		</>
	);
};
