import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useReducer, useState, useEffect } from "react/cjs/react.development";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import _ from "lodash"



const initialState = null;

const reducer = (state, action) => {

  switch(action.type){

    case "questions":
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        })
      });
      return action.value;
      case "answer":
        const questions = _.cloneDeep(state);
        questions[action.questionID].options[action.optionIndex].checked = action.value;
        return questions;
    default:
      return state;  
  }
}

export default function Quiz() {
  const {id} = useParams();
  const {loading, error, questions} = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  
    dispatch({
      type:"questions",
      value: questions
    })

  }, [questions])

  return (
    <>
    {console.log(qna)}
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers />
      <ProgressBar />
      <MiniPlayer />
    </>
  );
}
