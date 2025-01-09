function Question({ question, dispatch, answer }) {
	return (
		<div>
			<h3>{question.question}</h3>
			<div className='options'>
				{question.options.map((option, i) => (
					<button
						disabled={answer || answer === 0}
						key={i}
						className={`btn btn-option ${i === answer ? "answer" : ""} ${
							answer || answer === 0
								? i === question.correctOption
									? "correct"
									: "wrong"
								: ""
						}`}
						onClick={() => dispatch({ type: "newAnswer", payload: i })}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

export default Question;
