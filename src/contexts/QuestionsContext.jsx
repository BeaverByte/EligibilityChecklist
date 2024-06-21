import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useState,
  ReactNode,
  Children,
  useCallback,
} from "react";

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

//console.log(JSON.stringify(questions));

//console.log("And then! " + JSON.parse(JSON.stringify(questions)));

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
      const searchedQuestion = (state.questions || []).find(
        (question) => question.id === submittedQuestion.id
      );

      console.log(currentQuestion);

      return {
        ...state,
        isLoading: false,
        riders: [...state.riders, submittedQuestion.riders],
        porgs: [...state.porgs, submittedQuestion.porgs],
        currentQuestion: searchedQuestion || questions[0],
      };
    case "question/updated":
      return {
        ...state,
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

  const updateQuestion = function () {
    //dispatch({ type: "loading" });

    // Search current question's options
    currentQuestion.options.forEach((option) => {
      if (option.answer === selectedAnswer) {
        if (option.nextQuestion !== undefined) {
          console.log("Chosen answer connects to another question.");
          nextQuestion = option.nextQuestion;
          dispatch({ type: "question/updated", payload: nextQuestion });

          questions.forEach((question) => {
            if (question === option.nextQuestion) {
              console.log("nextQuestion found!");
              nextQuestion = question;
            } else {
              console.log("nextQuestion not found per answer.");
            }
          });
        }
      }
    });

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
