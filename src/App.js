import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
const initialState = {
	questions: [],
	//'isLoading' 'error' 'active' 'ready' 'finished'
	status: "isLoading",
	index: 0,
	points: 0,
};
function reducer(state, action) {
	console.log(state);
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					state.index === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, points: action.payload };
		default:
			throw new Error("Unknown error has occurred");
	}
}

export default function App() {
	const [{ questions, status, index, answer, points }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// const { questions, status } = initialState;
	useEffect(function fetchQuestions() {
		fetch("http://localhost:8000/questions")
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
					<StartScreen questions={questions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<Question
						question={questions.at(index)}
						dispatch={dispatch}
						answer={answer}
					/>
				)}
			</Main>
		</div>
	);
}
