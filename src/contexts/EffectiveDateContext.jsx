import { createContext, useContext, useReducer, useState } from "react";

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
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "effective-date/hire-date/update":
      const hireDate = action.payload;
      return {
        ...state,
        hireDate: hireDate,
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

  const updateHireDate = function (e) {
    dispatch({ type: "effective-date/hire-date/update", payload: e });
  };

  const resetEffectiveDateForm = function () {
    dispatch({ type: "reset" });
  };

  /**
   * Update the effective date state
   */
  const updateEffectiveDate = function () {
    // update code here
  };

  return (
    <EffectiveDateContext.Provider
      value={{
        isLoading,
        updateHireDate,
        days,
        months,
        provision,
        qualifyingEventDate,
        signatureDate,
        error,
      }}
    >
      {children}
    </EffectiveDateContext.Provider>
  );
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
