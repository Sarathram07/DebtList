import "./App.css";

import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import DebtTable from "./components/DebtTable";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Browser>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<DebtTable />} />
        </Routes>
        <Footer />

        <ToastContainer theme="dark" />
      </Browser>
    </>
  );
}

export default App;
