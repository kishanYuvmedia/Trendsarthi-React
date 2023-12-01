import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layout/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Plan from "./pages/plan";
import Footer from "./layout/footer";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/terms-and-conditions";
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
