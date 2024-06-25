import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useState,
} from "react";

import { questionBank } from "../data/questions";

/**
 * Context to create a provider with centralized updates of state for questions
 */

const QuestionsContext = createContext();

const initialState = {
  isLoading: false,
  currentQuestion: questionBank[1],
  questionsList: [
    ...questionBank.filter((question) => {
      if (question.required === true && question != questionBank[1]) {
        return question;
      }
    }),
  ],
  riders: [],
  porgs: [],
  error: "",
};

export function findMatchingQuestionInArray(submittedQuestion, questionArr) {
  return questionArr.find((question) => question.id === submittedQuestion);
}

// Dispatched data through "useReducer" will be processed here to update relevant state
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "question/change":
      const nextQuestion = action.payload;
      console.log("currentQuestion getting updated to nextQuestion");
      return {
        ...state,
        isLoading: false,
        currentQuestion: nextQuestion,
      };

    case "benefits/updated":
      const selectedOption = action.payload;

      console.log("Updating benefits with " + JSON.stringify(selectedOption));

      return {
        ...state,
        isLoading: false,
        porgs: [...state.porgs, ...(selectedOption?.porgs || [])],
        riders: [...state.riders, ...(selectedOption?.riders || [])],
      };

    case "question/end":
      return {
        ...state,
        isLoading: false,
      };

    case "reset":
      return {
        ...state,
        isLoading: false,
        ...initialState,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const dispatchWithPromise = (dispatch, action) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(action);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

function QuestionsProvider({ children }) {
  const [
    { isLoading, currentQuestion, questionsList, riders, porgs, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  /**
   * Update the question state
   */
  const updateQuestion = function () {
    //dispatch({ type: "loading" });

    // Corresponding option that user chose in questionnaire
    const selectedOption = currentQuestion.options.find((option) => {
      return option.answer === selectedAnswer;
    });

    if (selectedAnswer.required === true) {
      questionsList.shift();
    }

    let nextQuestion = {};
    // If selectedOption has a nextQuestion
    if (selectedOption && selectedOption.nextQuestion) {
      nextQuestion = findMatchingQuestionInArray(
        selectedOption.nextQuestion,
        questionBank
      );
    } else {
      // Choose question from remainder if selected does not have nextQuestion
      console.log("nextQuestion not found! Cycling through questionsList");
      console.log("Aux questions list size is " + questionsList.length);
      if (questionsList.length != 0) {
        console.log("nextQuestion pulled from list " + questionsList[0]);
        nextQuestion = questionsList[0];
        console.log(
          "nextQuestion is now this from the sidelist " +
            JSON.stringify(nextQuestion)
        );
        // Remove first Question
        questionsList.shift();
      } else {
        console.log("Problem! No Questions remaining in questionsList!");
        dispatch({
          type: "question/end",
          payload: "",
        });
      }
    }

    try {
      dispatch({
        type: "benefits/updated",
        payload: selectedOption,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error with updating benefits",
      });
    }

    try {
      dispatch({
        type: "question/change",
        payload: nextQuestion,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error with updating benefits",
      });
    }
    setSelectedAnswer(null);
    console.log("SelectedAnswer is " + selectedAnswer);
    console.log("Riders are " + riders);
    console.log("Porgs are " + porgs);
    console.log(porgs);
  };

  return (
    <QuestionsContext.Provider
      value={{
        isLoading,
        currentQuestion,
        riders,
        porgs,
        error,
        updateQuestion,
        selectedAnswer,
        setSelectedAnswer,
        questionsList,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

// Function to export that provides access to context, no strictly necessary but cleaner
// Should be camel case but HMR does not like that
function UseQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("QuestionsContext was used outside the QuestionsProvider");
  }
  return context;
}
function UseBenefits() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("QuestionsContext was used outside the QuestionsProvider");
  }
  return context;
}

export { QuestionsProvider, UseQuestions, UseBenefits };
