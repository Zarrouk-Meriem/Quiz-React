import { useEffect, useReducer } from "react";
import Progress from "./Components/Progress";
import Header from "./Components/Header";
import Main from "./Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import NextButton from "./Components/NextButton";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";
import Footer from "./Components/Footer";
const SECS_PER_QUESTION = 30;
const initialState = {
	questions: [],
	//'isLoading' 'error' 'active' 'ready' 'finished'
	status: "isLoading",
	answer: null,
	index: 0,
	points: 0,
	highscore: 0,
	secondsRemaining: 10,
};
function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};

		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restart":
			return { ...initialState, questions: state.questions, status: "ready" };
		case "tick-tack":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Unknown error has occurred");
	}
}

export default function App() {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);
	const questionsNumber = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	// const { questions, status } = initialState;
	useEffect(function fetchQuestions() {
		fetch("https://palestine-quiz-v1.netlify.app/.netlify/functions/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);
	return (
		<div className='app'>
			<Header />
			<Main>
				{status === "isLoading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen questionsNumber={questionsNumber} dispatch={dispatch} />
				)}
				{status === "active" && (
					<>
						<Progress
							questionsNumber={questionsNumber}
							maxPossiblePoints={maxPossiblePoints}
							index={index}
							points={points}
							answer={answer}
						/>
						<Question
							question={questions.at(index)}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<NextButton
								index={index}
								dispatch={dispatch}
								answer={answer}
								questionsNumber={questionsNumber}
							/>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
						initialState={initialState}
					/>
				)}
			</Main>
		</div>
	);
}
