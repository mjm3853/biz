import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Hub from "./pages/Hub";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/:ideaId" element={<LandingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
