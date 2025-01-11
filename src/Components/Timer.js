import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;
	useEffect(function timer() {
		const id = setTimeout(() => {
			dispatch({ type: "tick-tack" });
		}, 1000);
		return () => clearInterval(id);
	});
	return (
		<button className='btn timer'>
			{mins < 10 && "0"}
			{mins}:{seconds < 10 && "0"}
			{seconds}
		</button>
	);
}

export default Timer;
