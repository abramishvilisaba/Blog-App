import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
// import "./App.css";

const token = process.env.REACT_APP_TOKEN;

export default function App() {
    return (
        <Routes>
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/*" element={<Home />} />
        </Routes>

        // <Home />
    );
}
