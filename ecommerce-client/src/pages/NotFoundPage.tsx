import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
	const [timeLeft, setTimeLeft] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime === 1) {
					clearInterval(timer);
					navigate('/');
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [navigate]);

	return (
		<div>
			<h1>404 - Kunde inte hitta sidan</h1>
			<h2>
				Du skickas automatiskt tillbaka till startsidan om{' '}
				<strong>{timeLeft}</strong> sekunder
			</h2>
		</div>
	);
};
