function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
	const percentage = (points / maxPossiblePoints) * 100;

	let quote;
	if (percentage === 100) quote = "فلسطين حرة بإذن الله 🌿";
	if (percentage < 100 && percentage >= 80)
		quote = "قريبًا ستعود فلسطين، لا تكلّ ولا تملّ! 🇵🇸";
	if (percentage < 80 && percentage >= 50)
		quote = "صبرًا أيها الأحرار، الأرض ستنبت بالأمل قريبًا 🌱";
	if (percentage < 50 && percentage > 0)
		quote = "لا تحزن، النصر آت بإذن الله، فلسطين أرض الأحرار 🙏";
	if (percentage === 0) quote = " لا تستسلم النّصر قريب بإذن الله 🕊️";
	return (
		<>
			<p className='result'>
				{percentage === 100 && <strong>ماشاء الله </strong>}لقد حصلت على{" "}
				<strong>{points}</strong> من {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
				<br></br>
				<span>{quote}</span>
			</p>
			<p className='highscore'>أفضل معدّل : {highscore} نقطة</p>
			<button
				className='btn bth-ui'
				onClick={() => dispatch({ type: "restart" })}
			>
				إعادة
			</button>
		</>
	);
}

export default FinishScreen;
