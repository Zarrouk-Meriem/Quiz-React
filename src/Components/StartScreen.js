function StartScreen({ questionsNumber, dispatch }) {
	return (
		<div className='start'>
			<h2>السّلام عليكم و رحمة الله و بركاته،</h2>
			<h3>{questionsNumber} سؤال لامتحان معلومات عن فلسطين، أرض العزة </h3>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "start" })}
			>
				لنبدأ
			</button>
		</div>
	);
}

export default StartScreen;
