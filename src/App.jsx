import { useState } from "react";
import UpdateElectron from "@/components/update";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Eligibility from "./pages/Eligibility/Eligibility";
import Home from "./pages/Home/Home";
import { ROUTES } from "./pages/routes";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import EffectiveDate from "./pages/EffectiveDate/EffectiveDate";
import { EffectiveDateProvider } from "./contexts/EffectiveDateContext";

/**
 * The main React component that holds and presents all other components
 * @component
 */

function App() {
  return (
    <EffectiveDateProvider>
      <QuestionsProvider>
        <HashRouter>
          <Routes>
            <Route path={ROUTES.ROOT} element={<Home />} />
            <Route path={ROUTES.ELIGIBILITY} element={<Eligibility />} />
            <Route path={ROUTES.EFFECTIVEDATE} element={<EffectiveDate />} />
          </Routes>
        </HashRouter>
      </QuestionsProvider>
    </EffectiveDateProvider>
  );
}

export default App;
