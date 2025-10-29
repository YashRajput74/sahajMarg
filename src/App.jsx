import "./App.css"
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfToDoc from "./pages/PdfToDoc";
// import DocToPdf from "./pages/DocToPdf";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pdf-to-doc" element={<PdfToDoc />} />
        {/* <Route path="/doc-to-pdf" element={<DocToPdf />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
