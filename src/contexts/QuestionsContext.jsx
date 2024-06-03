import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

/**
 * Context to create a provider with centralized updates of state for questions
 */

const QuestionsContext = createContext();

const initialState = {
  questions: [],
  isLoading: false,
  currentQuestion: {},
  error: "",
};

// Dispatched data through "useReducer" will be processed here to update relevant state
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

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
  const [{ questions, isLoading, currentQuestion, error }, dispatch] =
    useReducer(reducer, initialState);

  // useEffect for DOM events, browser apis, data fetching, or local storage
  useEffect(function () {
    // async function fetchCities() {
    //   dispatch({ type: "loading" });
    //   try {
    //     const res = await fetch(`${BASE_URL}/cities`);
    //     const data = await res.json();
    //     dispatch({ type: "cities/loaded", payload: data });
    //   } catch {
    //     dispatch({
    //       type: "rejected",
    //       payload: "There was an error loading cities...",
    //     });
    //   }
    // }
    // fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        isLoading,
        currentQuestion,
        error,
        getQuestion,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

// Function to export that provides access to context, no strictly necessary but cleaner
function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error("QuestionsContext was used outside the QuestionsProvider");
  return context;
}

export { QuestionsProvider, useQuestions };
