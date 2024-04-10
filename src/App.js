import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage/HomePage";
import ViewLoadPage from "./component/ViewLoadPage/ViewLoadPage";
import ViewPage from "./component/ViewPage/ViewPage";
import UpdatePage from "./component/UpdatePage/UpdatePage";
import UpdateLoadPage from "./component/UpdateLoadPage/UpdateLoadPage";
import Navbar from "./component/Navbar/Navbar";
import WalletContextProvider from "./contexts/WalletContextProvider";

import "./App.css";

function App() {
		require("dotenv").config();
    return (
        <div>
            <Router>
							<WalletContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/view" element={<ViewLoadPage />} />
                    <Route path="/view/:attribute" element={<ViewPage />} />
                    <Route path="/update" element={<UpdateLoadPage />} />
                    <Route path="/update/:attribute" element={<UpdatePage />} />
                </Routes>
							</WalletContextProvider>
            </Router>
        </div>
    );
}

export default App;
