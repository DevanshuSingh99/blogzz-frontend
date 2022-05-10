import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./MainPage/Header";
import "../styles/main.css";
import LoginReg from "./MainPage/LoginReg";
import Home from "./MainPage/Home";
import AboutUs from "./MainPage/AboutUs";
import ContactUs from "./MainPage/ContactUs";
import Navbar from "./Dashboard/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import NewBlog from "./Dashboard/Blog/NewBlog";
import Main from "./MainPage/Main";
import Blog from "./MainPage/Blog/Blog";

import AllBlogs from "./Dashboard/Blog/AllBlogs";
// import Profile from "./Dashboard/Profile";
// import Logout from "./Dashboard/Profile";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginReg />} />
                        {/* <Route path="/articles" element={<Articles />} /> */}
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/:author/:title" element={<Blog />} />

                    </Route>
                    <Route path="/dashboard" element={<Navbar />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="blog" element={<AllBlogs />} />
                        <Route path="newblog" element={<NewBlog />} />
                        {/* <Route path="profile" element={<Profile />} /> */}
                        {/* <Route path="logout" element={<Logout />} /> */}
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
