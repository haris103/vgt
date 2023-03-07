import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
// import Overview from "./components/Overview/Overview";
import Reports from "./components/Reports/Reports";
// import Terminals from "./components/Terminals/Terminals";
import Support from "./components/Support/Support";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import PeriodReport from "./components/Reports/PeriodReport";
// import RevenueReport from "./components/Reports/RevenueReport/RevenueReport";
// import BusinessInfo from "./components/Overview/BusinessInfo";
import PeriodTrialCard from "./components/Reports/PeriodTrialCard";
import OverviewCard from "./components/Overview/OverviewCard";
import PeriodCard from "./components/Reports/Card/PeriodCard";
import Terminalapi from "./components/TerminalAPI/Terminalapi";
import BusinessInfo from "./components/Overview/BusinessInfo";
// import NavigateTerminal from "./components/TerminalAPI/NavigateTerminal";
// import Res from "./Res";

import TerminalDetails from "./components/TerminalAPI/TerminalDetails";

import PrivateRoute from "../src/auth/PrivateRoute";
import Res from "./Res";
import SupportId from "./components/Support/SupportId";
import LocationInfo from "./components/Overview/LocationInfo";
import RevenueReport from "./components/RevenueReport/RevenueReport";
import NewBusinessCard from "./components/RevenueReport/NewBusinessCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />

        <Route
          path="/newbus"
          element={
            <PrivateRoute>
              <NewBusinessCard />
            </PrivateRoute>
          }
        />

        <Route
          path="/periodreport"
          element={
            <PrivateRoute>
              <PeriodReport />
            </PrivateRoute>
          }
        />

        <Route
          path="/revenuereport"
          element={
            <PrivateRoute>
              <RevenueReport />
            </PrivateRoute>
          }
        />

        {/* <Route path="/support" element={<Support />} /> */}
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />

        {/* <Route path="/supportsingle/:business_id" element={<Support />} /> */}
        <Route
          path="/supportsingle/:business_id"
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />

        <Route
          path="//support/:id"
          element={
            <PrivateRoute>
              <SupportId />
            </PrivateRoute>
          }
        />

        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route
          path="/account-settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* <Route path="/overviewcard" element={<OverviewCard />} /> */}
        <Route
          path="/overview"
          element={
            <PrivateRoute>
              <OverviewCard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/periodtrialcard" element={<PeriodTrialCard />} /> */}
        <Route
          path="/periodtrialcard"
          element={
            <PrivateRoute>
              <PeriodTrialCard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/periodcard" element={<PeriodCard />} /> */}
        <Route
          path="/periodcard"
          element={
            <PrivateRoute>
              <PeriodCard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/terminalapi" element={<Terminalapi />} /> */}
        <Route
          path="/terminals"
          element={
            <PrivateRoute>
              <Terminalapi />
            </PrivateRoute>
          }
        />

        {/* <Route path="/businessinfo/:business_name" element={<BusinessInfo />} /> */}
        <Route
          path="/businessinfo"
          // path="/businessinfo/:businessId"
          element={
            <PrivateRoute>
              <BusinessInfo />
            </PrivateRoute>
          }
        />

        <Route
          path="/locationinfo/:business_name"
          element={
            <PrivateRoute>
              <LocationInfo />
            </PrivateRoute>
          }
        />

        {/* <Route path="/terminalinfo/:terminalId" element={<TerminalDetails />} /> */}
        {/* <Route
          path="/terminalinfo/:terminalId"
          element={
            <PrivateRoute>
              <RevenueSingleLocation />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/terminalinfo/:terminalId"
          element={
            <PrivateRoute>
              <TerminalDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/res"
          element={
            <PrivateRoute>
              <Res />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
