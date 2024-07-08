import { createContext, useContext, useReducer, useState } from "react";
import {
  parseISO,
  isValid,
  isDate,
  addMonths,
  format,
  startOfMonth,
} from "date-fns";

/**
 * Context to create a provider with centralized updates of state for effective date
 */

const EffectiveDateContext = createContext();

const initialState = {
  isLoading: false,
  hireDate: "",
  days: "",
  months: "",
  provision: "",
  qualifyingEventDate: "",
  signatureDate: "",
  eligibilityDate: "",
  lateDate: "",
  error: "",
};

// Dispatched data through "useReducer" will be processed here to update relevant state
function reducer(state, action) {
  console.log(`Action in reducer is ${JSON.stringify(action)}`);
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "update-field":
      const { field, value } = action.payload;

      const newState = {
        ...state,
        [field]: value,
      };

      const parsedHireDate = parseISO(newState.hireDate);

      //const formattedDate = format(parsedDate, "yyyy-MM-dd");

      const eligibilityDate = calculateEligibilityDate(
        parsedHireDate,
        newState.days,
        newState.months,
        newState.provision,
        newState.qualifyingEventDate
      );

      return {
        ...newState,
        eligibilityDate: eligibilityDate,
        isLoading: false,
      };

    case "reset":
      console.log("Resetting Questionnaire state");
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

function EffectiveDateProvider({ children }) {
  const [
    {
      isLoading,
      eligibilityDate,
      hireDate,
      days,
      months,
      provision,
      qualifyingEventDate,
      signatureDate,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const updateField = function (field, value) {
    console.log(`Updating ${field} to ${value}`);
    dispatch({ type: "update-field", payload: { field, value } });
  };

  const resetEffectiveDateForm = function () {
    dispatch({ type: "reset" });
  };

  return (
    <EffectiveDateContext.Provider
      value={{
        isLoading,
        updateField,
        hireDate,
        days,
        months,
        provision,
        qualifyingEventDate,
        signatureDate,
        eligibilityDate,
        error,
      }}
    >
      {children}
    </EffectiveDateContext.Provider>
  );
}

function calculateEligibilityDate(
  hireDate,
  days,
  months,
  provision,
  qualifyingEventDate
) {
  if (!isValid(hireDate)) {
    console.log(`${hireDate} is not date`);
    return;
  }
  if (days && months) {
    console.log("No months or days entered");
  }

  // If there is a hire date
  // If days input
  // Add days to hiredate
  // If months input
  // Add months to hiredate

  // Date Of means date not not change

  // First of Month means
  return format(hireDate, "MM-dd-yyyy");
}

// Function to export that provides access to context, no strictly necessary but cleaner
// Should be camel case but HMR does not like that
function UseEffectiveDate() {
  const context = useContext(EffectiveDateContext);
  if (context === undefined) {
    throw new Error(
      "EffectiveDateContext was used outside the EffectiveDateProvider"
    );
  }
  return context;
}
export { EffectiveDateProvider, UseEffectiveDate };
