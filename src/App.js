import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogPage from "./pages/BlogPage";

// import "./App.css";

const token = process.env.REACT_APP_TOKEN;

export default function App() {
    return (
        <div class="font-firaGO h-screen box-border  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
            <Routes>
                <Route path="/create" element={<CreateBlog />} />
                <Route path="/blogpage/:id" element={<BlogPage />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </div>

        // <Home />
    );
}
