function NextButton({ dispatch, answer, questionsNumber, index }) {
	if (!(answer || answer === 0)) return null;
	if (index < questionsNumber - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "nextQuestion" })}
			>
				السؤال التالي
			</button>
		);
	if (index === questionsNumber - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "finish" })}
			>
				أنهبت
			</button>
		);
}

export default NextButton;
