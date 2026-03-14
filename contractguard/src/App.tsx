import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scanner from "./pages/Scanner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scan" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}
