import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';

const CountDown = (props) => {
	const add_minutes = props.addMinutes;

	const calculateTimeLeft = useCallback(() => {
		let timeLeft = {};

		let difference = +add_minutes - +new Date();

		let calSeconds = Math.floor((difference / 1000) % 60);
		let calMinutes = Math.floor((difference / 1000 / 60) % 60);
		let calHours = Math.floor((difference / (1000 * 60 * 60)) % 24);

		if (difference >= 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: calHours < 10 ? '0' + calHours : calHours,
				minutes: calMinutes < 10 ? '0' + calMinutes : calMinutes,
				seconds: calSeconds < 10 ? '0' + calSeconds : calSeconds,
				difference: difference,
			};
		} else {
			// setShowPopup(true);
			props.onFinish && props.onFinish();
		}

		return timeLeft;
	}, []);

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	return (
		<div className={`countdown ${styles.countdown}`}>
			{timeLeft.hours !== '00' ? (
				<>
					<span className="hours">{timeLeft.hours}</span>
					<span className={styles.space}>:</span>
				</>
			) : (
				''
			)}

			<span className={` ${styles.widthBox}`}>{timeLeft.minutes}</span>
			<span className={styles.space}>:</span>
			<span className={`sencons ${styles.widthBox}`}>{timeLeft.seconds}</span>
		</div>
	);
};

export default CountDown;
