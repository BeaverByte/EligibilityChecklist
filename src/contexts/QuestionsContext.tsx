import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useState,
} from "react";

// Questions Data
const questions = [
  {
    id: "Medical1",
    question: "Does the member have Medical?",
    type: "radio",
    options: [{ answer: "Yes", nextQuestion: "q2" }, { answer: "No" }],
  },
  {
    id: "Medical2",
    question: "Does the member have a high deductible plan?",
    type: "radio",
    options: [
      { answer: "Yes", riders: ["HDP"], nextQuestion: "q3" },
      { answer: "No" },
    ],
  },
  {
    id: "Medical3",
    question: "What is the Medical Network?",
    type: "checkbox",
    options: [
      {
        answer: "Aetna (Aetna Signature Administrators)",
        nextQuestion: "q4a",
      },
      {
        answer: "Cofinity or Cofinity Advantage",
        riders: [PHW],
        nextQuestion: "q4b",
      },
      { answer: "PHCS", riders: [PHS, AAH, COR], nextQuestion: "q4c" },
      {
        answer: "First Health",
        riders: [FHN, AAH, COR],
        porgs: [FHNC],
      },
    ],
  },
  {
    id: "Medical4",
    question:
      "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    type: "radio",
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
    id: "q4b",
    question: "Does member live in Michigan?",
    type: "radio",
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
    question: "Does the member have Dental?",
    type: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["DEN"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Vision?",
    type: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["VIS"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Life?",
    type: "radio",
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
  currentQuestion: questions[0],
  error: "",
};

// Dispatched data through "useReducer" will be processed here to update relevant state
function reducer(
  state: { cities: any[] },
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "question/loaded":
      return { ...state, isLoading: false, currentQuestion: action.payload };

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
        cities: state.cities.filter(
          (city: { id: any }) => city.id !== action.payload
        ),
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
  const [{ isLoading, currentQuestion, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // // useEffect for DOM events, browser apis, data fetching, or local storage
  // useEffect(function () {
  //   // async function fetchCities() {
  //   //   dispatch({ type: "loading" });
  //   //   try {
  //   //     const res = await fetch(`${BASE_URL}/cities`);
  //   //     const data = await res.json();
  //   //     dispatch({ type: "cities/loaded", payload: data });
  //   //   } catch {
  //   //     dispatch({
  //   //       type: "rejected",
  //   //       payload: "There was an error loading cities...",
  //   //     });
  //   //   }
  //   // }
  //   // fetchCities();
  // }, []);

  const updateQuestion = function () {
    //dispatch({ type: "loading" });

    // Example question format
    // {
    //     id: "q3",
    //     question: "What is the Medical Network?",
    //     type: "checkbox",
    //     options: [
    //       {
    //         answer: "Aetna (Aetna Signature Administrators)",
    //         nextQuestion: "q4a",
    //       },
    //       { answer: "Cofinity or Cofinity Advantage", nextQuestion: "q4b" },
    //       { answer: "PHCS", nextQuestion: "q4c" },
    //       { answer: "First Health", nextQuestion: "q4d" },
    //     ],
    //   },

    currentQuestion.options.forEach((option) => {
      if (option.answer === selectedAnswer) {
        if (option.nextQuestion !== undefined) {
          console.log("Chosen answer connects to another question.");
        }
        if (option.riders !== undefined) {
          console.log("Answer has corresponding riders.");
        }
        if (option.porgs !== undefined) {
          console.log("Answer has corresponding Porgs.");
        }
      }
      // console.log(option);
    });

    //const data = questions[0];
    //console.log(data);
    //dispatch({ type: "question/loaded", payload: data });
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
// Should be camelcase but HMR does not like that
function UseQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error("QuestionsContext was used outside the QuestionsProvider");
  return context;
}

export { QuestionsProvider, UseQuestions };
