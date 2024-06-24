import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useState,
  useCallback,
} from "react";
import { textChangeRangeIsUnchanged } from "typescript";

// Questions Data
const questions = [
  {
    id: "error",
    question: "Error made",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["MED"], nextQuestion: "medical-1" },
      { answer: "No" },
    ],
  },
  {
    id: "medical-1",
    question: "Does the member have Medical?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["MED"], nextQuestion: "medical-2" },
      { answer: "No" },
    ],
  },
  {
    id: "medical-2",
    question: "Does the member have a high deductible plan?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["HDP"], nextQuestion: "medical-3" },
      { answer: "No", nextQuestion: "medical-3" },
    ],
  },
  {
    id: "medical-3",
    question: "What is the Medical Network?",
    elementType: "checkbox",
    options: [
      {
        answer: "Aetna (Aetna Signature Administrators)",
        nextQuestion: "medical-4-a",
      },
      {
        answer: "Cofinity or Cofinity Advantage",
        riders: ["PHW"],
        nextQuestion: "medical-4-b",
      },
      {
        answer: "PHCS",
        riders: ["PHS, AAH, COR"],
        nextQuestion: "medical-4-c",
      },
      {
        answer: "First Health",
        riders: ["FHN, AAH, COR"],
        porgs: ["FHNC"],
      },
      ,
    ],
  },
  {
    id: "medical-4-a",
    question:
      "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["AETN"],
        riders: ["AET, AAH, COR"],
      },
      {
        answer: "no",
        porgs: ["AEPC"],
        riders: ["AET, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-b",
    question: "Does member live in Michigan?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        nextQuestion: "medical-4-b-a",
      },
      {
        answer: "no",
        porgs: ["CFNA"],
        riders: ["COD, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-b-a",
    question: "Does the member's ZIP code start with 490-492?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["CFNL"],
        riders: ["CFL, AAH, COR"],
      },
      {
        answer: "no",
        porgs: ["CFNT"],
        riders: ["COF, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-c",
    question:
      "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["PHCS"],
      },
      {
        answer: "no",
        porgs: ["PHC1"],
      },
    ],
  },
  {
    question: "Does the member have Dental?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["DEN"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Vision?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["VIS"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Life?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: [""] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
];

/**
 * Context to create a provider with centralized updates of state for questions
 */

const QuestionsContext = createContext();

const initialState = {
  isLoading: false,
  currentQuestion: questions[1],
  riders: [],
  porgs: [],
  error: "",
};

// Dispatched data through "useReducer" will be processed here to update relevant state
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "question/loaded":
      console.log(
        "currentQuestion state is " + JSON.stringify(state.currentQuestion)
      );

      return {
        ...state,
        isLoading: false,
        riders: [...state.riders, ...(submittedQuestion?.riders || [])],
        porgs: [...state.porgs, submittedQuestion.porgs],
        // currentQuestion: searchedQuestion || questions[0],
      };
    case "question/updated":
      return {
        ...state,
        currentQuestion: [action.payload],
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

function QuestionsProvider({ children }) {
  const [
    { isLoading, nextQuestion, currentQuestion, riders, porgs, error },
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

    // Corresponding option that user chose in questionnaire
    const selectedOption = currentQuestion.options.find((option) => {
      return option.answer === selectedAnswer;
    });

    console.log("currentQuestion is " + JSON.stringify(currentQuestion));

    console.log("selectedOption is " + JSON.stringify(selectedOption));

    // currentQuestion needs to have state updated to be the nextQuestion if exists based on selectedOption if exists
    if (selectedOption && selectedOption.nextQuestion) {
      console.log(
        "nextQuestion exists in selectedOption " +
          JSON.stringify(selectedOption)
      );
    } else {
      console.log("nextQuestion not found!");
    }

    console.log("Riders are " + riders);
    console.log("Porgs are " + porgs);

    dispatch({
      type: "question/loaded",
      payload: nextQuestion,
    });
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
  if (context === undefined)
    throw new Error("QuestionsContext was used outside the QuestionsProvider");
  return context;
}

export { QuestionsProvider, UseQuestions };
