import { createContext, useContext, useReducer, useState } from "react";

import dayjs from "dayjs";

/**
 * Context to create a provider with centralized updates of state for effective date
 */

const EffectiveDateContext = createContext();

const initialState = {
  isLoading: false,
  hireDate: "",
  days: "",
  months: "",
  provision: "Date of",
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

      const parsedHireDate = dayjs(newState.hireDate);

      const eligibilityDate = calculateEligibilityDate(
        parsedHireDate,
        newState.days,
        newState.months,
        newState.provision,
        newState.qualifyingEventDate
      );

      const lateDate = calculateLateDate(
        eligibilityDate,
        newState.days,
        newState.months,
        newState.provision,
        newState.qualifyingEventDate
      );

      return {
        ...newState,
        eligibilityDate: eligibilityDate,
        lateDate: lateDate,
        isLoading: false,
      };

    case "reset":
      console.log("Resetting Effective Date state");
      return {
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
      lateDate,
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
        lateDate,
        resetEffectiveDateForm,
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
  if (!dayjs(hireDate).isValid()) {
    console.log(`${hireDate} is not date`);
    return;
  }
  console.log(`${hireDate} is valid`);
  // let eligibilityDate = format(hireDate, "yyyy-MM-dd");
  let eligibilityDate = hireDate;

  console.log(`HireDate before provision is ${eligibilityDate}`);
  switch (provision) {
    case "Date of":
      if (days) {
        eligibilityDate = eligibilityDate.add(days, "day");
      }
      if (months) {
        eligibilityDate = eligibilityDate.add(months, "month");
      }
      break;
    case "First of Month":
      if (days) {
        eligibilityDate = eligibilityDate
          .add(days, "day")
          .add(1, "month")
          .startOf("month");
      }
      if (months) {
        eligibilityDate = eligibilityDate
          .add(months, "month")
          .add(1, "month")
          .startOf("month");
      }
      break;
    case "Open Enrollment":
      eligibilityDate = qualifyingEventDate;
      break;
    case "Loss of Coverage":
      eligibilityDate = qualifyingEventDate;
      break;
    default:
      break;
  }
  console.log(`Returning this date ${eligibilityDate}`);
  return dayjs(eligibilityDate).format("MM-DD-YYYY");
}
function calculateLateDate(
  eligibilityDate,
  days,
  months,
  provision,
  qualifyingEventDate
) {
  let lateDate = dayjs(eligibilityDate);
  qualifyingEventDate = dayjs(qualifyingEventDate);
  console.log(`LateDate is ${lateDate}`);
  const standardDaysTimeliness = 31;
  switch (provision) {
    case "Date of":
      lateDate = lateDate.add(standardDaysTimeliness, "day");

      break;
    case "First of Month":
      lateDate = lateDate.add(standardDaysTimeliness, "day");
      break;
    case "Open Enrollment":
      lateDate = qualifyingEventDate;
      break;
    case "Loss of Coverage":
      lateDate = qualifyingEventDate.add(standardDaysTimeliness, "day");
      break;
    default:
      break;
  }

  return dayjs(lateDate).format("MM-DD-YYYY");
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
