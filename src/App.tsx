import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Hub from "./pages/Hub";
import LandingPage from "./pages/LandingPage";
import { DatabaseProvider } from "./hooks/useDatabase";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/Overview";
import Scorecard from "./dashboard/Scorecard";
import ComparisonMatrix from "./dashboard/ComparisonMatrix";
import PortfolioView from "./dashboard/PortfolioView";
import IdeaDetail from "./dashboard/IdeaDetail";
import IterationHistory from "./dashboard/IterationHistory";

export default function App() {
  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/:ideaId" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="scorecard/:ideaId" element={<Scorecard />} />
              <Route path="compare" element={<ComparisonMatrix />} />
              <Route path="portfolio" element={<PortfolioView />} />
              <Route path="idea/:ideaId" element={<IdeaDetail />} />
              <Route path="history" element={<IterationHistory />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </DatabaseProvider>
  );
}
