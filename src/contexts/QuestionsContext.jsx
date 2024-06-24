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
      if (question.required === true) {
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
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
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

  // See what riders and porgs are, delete this when prod
  useEffect(() => {
    //console.log("Riders are " + riders);
    //console.log("Porgs are " + porgs);
  });

  /**
   * Update the question state
   */
  const updateQuestion = function () {
    //dispatch({ type: "loading" });

    //testing questionslist
    console.log("questions list is " + questionsList);
    console.log();

    // Corresponding option that user chose in questionnaire
    const selectedOption = currentQuestion.options.find((option) => {
      return option.answer === selectedAnswer;
    });

    console.log("currentQuestion is " + JSON.stringify(currentQuestion));

    console.log("selectedOption is " + JSON.stringify(selectedOption));

    // currentQuestion needs to have state updated to be the nextQuestion if exists based on selectedOption if exists
    if (selectedOption && selectedOption.nextQuestion) {
      console.log(
        "nextQuestion exists  " + JSON.stringify(selectedOption.nextQuestion)
      );
    } else {
      console.log("nextQuestion not found!");
      return;
    }

    // If option does not have nextQuestion continue through questions array

    const nextQuestion = findMatchingQuestionInArray(
      selectedOption.nextQuestion,
      questionBank
    );

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

  // const getCity = useCallback(
  //   async function getCity(id) {
  //     if (Number(id) === currentCity.id) return;

  //     dispatch({ type: "loading" });

  //     try {
  //       const res = await fetch(`${BASE_URL}/cities/${id}`);
  //       const data = await res.json();
  //       dispatch({ type: "city/loaded", payload: data });
  //     } catch {
  //       dispatch({
  //         type: "rejected",
  //         payload: "There was an error loading the city...",
  //       });
  //     }
  //   },
  //   [currentCity.id]
  // );

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
