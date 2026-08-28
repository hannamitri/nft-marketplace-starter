import React, { useEffect, useState } from "react";

function formatCountdown(expiryDate) {
	const totalSeconds = Math.max(0, Math.floor((expiryDate - Date.now()) / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

export default function CountdownTimer({ expiryDate }) {
	const [countdown, setCountdown] = useState(() =>
		expiryDate ? formatCountdown(expiryDate) : "",
	);

	useEffect(() => {
		if (!expiryDate) {
			return;
		}

		const updateCountdown = () => setCountdown(formatCountdown(expiryDate));
		updateCountdown();

		if (expiryDate <= Date.now()) {
			return;
		}

		const timerId = setInterval(updateCountdown, 1000);

		return () => clearInterval(timerId);
	}, [expiryDate]);

	if (!expiryDate) {
		return null;
	}

	return <span>{countdown}</span>;
}

