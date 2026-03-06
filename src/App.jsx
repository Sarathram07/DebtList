import "./App.css";

import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import DebtTable from "./components/DebtTable";

function App() {
  return (
    <>
      <Browser>
        <Header />
        <Routes>
          <Route path="/" element={<DebtTable />} />
        </Routes>
        <Footer />
      </Browser>
    </>
  );
}

export default App;
