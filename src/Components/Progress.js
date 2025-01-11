function Progress({
	questionsNumber,
	maxPossiblePoints,
	index,
	points,
	answer,
}) {
	return (
		<header className='progress'>
			<progress
				max={questionsNumber}
				value={index + Number(answer || answer === 0)}
			/>
			<p>
				Question <strong>{index + 1}</strong>/{questionsNumber}
			</p>
			<p>
				<strong>{points}</strong>/{maxPossiblePoints} points
			</p>
		</header>
	);
}

export default Progress;
