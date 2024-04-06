import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ViewPage from "./ViewPage/ViewPage";
import UpdatePage from "./UpdatePage/UpdatePage";
import Navbar from "./component/Navbar/Navbar";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/view" element={<ViewPage />} />
                    <Route path="/update" element={<UpdatePage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
