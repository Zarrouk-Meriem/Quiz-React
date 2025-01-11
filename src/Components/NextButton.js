function NextButton({ dispatch, answer, questionsNumber, index }) {
	if (!(answer || answer === 0)) return null;
	if (index < questionsNumber - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "nextQuestion" })}
			>
				Next
			</button>
		);
	if (index === questionsNumber - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "finish" })}
			>
				Finish
			</button>
		);
}

export default NextButton;
