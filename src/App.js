import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import WalletContextProvider from "./contexts/WalletContextProvider";
import { ProductProvider } from "./contexts/Product";
import HomePage from "./pages/HomePage/HomePage";
import ViewLoadPage from "./pages/ViewLoadPage/ViewLoadPage";
import ViewPage from "./pages/ViewPage/ViewPage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreatePage from "./pages/CreatePage/CreatePage";

import "./App.css";

function App() {
		require("dotenv").config();
    return (
        <div>
            <Router>
							<WalletContextProvider>
								<ProductProvider>
									<Navbar />
									<Routes>
											<Route path="/" element={<HomePage />} />
											<Route path="/register" element={<RegisterPage />} />
											<Route path="/create" element={<CreatePage />} />
											<Route path="/view" element={<ViewLoadPage />} />
											<Route path="/view/:productId" element={<ViewPage />} />
											<Route path="/update" element={<UpdatePage />} />
									</Routes>
								</ProductProvider>
							</WalletContextProvider>
            </Router>
        </div>
    );
}

export default App;
