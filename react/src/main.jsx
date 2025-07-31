import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"

import { Navbar } from "./components/Navbar"
import { ContextProvider } from "./contexts/ContextProvider.jsx"
import HomePage from "./pages/HomePage"
import HotelFormPage from "./pages/HotelFormPage"
import Toast from "./components/Toast"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <BrowserRouter>
                <main className="container content-container mx-auto px-10 md:px-0">
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/add-hotel" element={<HotelFormPage />} />
                        <Route path="/hotel/:id" element={<HotelFormPage />} />
                    </Routes>
                </main>
                
                <Toast />
            </BrowserRouter>
        </ContextProvider>
    </React.StrictMode>
)