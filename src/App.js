import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage/HomePage";
import ViewPage from "./component/ViewPage/ViewPage";
import UpdatePage from "./component/UpdatePage/UpdatePage";
import Navbar from "./component/Navbar/Navbar";
import WalletContextProvider from "./contexts/WalletContextProvider";

function App() {
    return (
        <div>
            <Router>
							<WalletContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/view" element={<ViewPage />} />
                    <Route path="/update" element={<UpdatePage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
							</WalletContextProvider>
            </Router>
        </div>
    );
}

export default App;
