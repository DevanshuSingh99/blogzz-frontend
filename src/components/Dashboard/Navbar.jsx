import React, {useEffect, useState} from "react";
import {Link, useNavigate, Outlet} from "react-router-dom";
import {IoIosStats} from "react-icons/io";
import {AiOutlineHome} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import {MdOutlineArticle, MdLogout} from "react-icons/md";
import styled from "styled-components";
import Cookie from "universal-cookie";
import Cookies from "universal-cookie";
import axios from "axios";
import {USER_LOGOUT, BLOG_LOGOUT, LOG_IN} from "../../redux/actions";
import store from "../../redux/store";
import {DarkColors} from "../../styles/sharedCss";

function Navbar(props) {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    const [profileBox, setProfileBox] = useState(false);
    const [blogArrow, setBlogArrow] = useState(false);

    const logoutHandler = () => {
        cookie.remove("auth");
        store.dispatch({type: USER_LOGOUT});
        store.dispatch({type: BLOG_LOGOUT});

        navigate("/login");
    };
    const profileClick = () => {
        setProfileBox(profileBox ? !profileBox : !profileBox);
        setBlogArrow(blogArrow ? !blogArrow : !blogArrow);
    };
    useEffect(() => {
        if (!accessToken) navigate("/login");
        if (accessToken) {
            (async function () {
                await axios({
                    method: "post",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    url: "http://localhost:7010/users/login",
                }).then((res) => {
                    let response = res.data;
                    if (response.message === "Invalid credentials.") {
                    } else if (response.message === "Authenticated") {
                        store.dispatch({
                            type: LOG_IN,
                            payload: response.user,
                        });
                    }
                });
            })();
        }
    }, []);
    console.log();
    return (
        <>
            <DashBoard>
                <SideBar>
                    <Nav>
                        <ul>
                            <li>
                                <Link to="/home">
                                    <AiOutlineHome className="icons" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <IoIosStats className="icons" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={profileClick}>
                                    <MdOutlineArticle className="icons" />
                                    Blog Area{" "}
                                    <span
                                        className={`${
                                            blogArrow
                                                ? "dropArrow"
                                                : "dropArrowUpSide"
                                        }`}
                                    >
                                        ^
                                    </span>
                                </Link>
                                <div
                                    className={`${
                                        profileBox
                                            ? "showProfileBox"
                                            : "hideProfileBox"
                                    }`}
                                >
                                    <Link to="/dashboard/blog">
                                        {/* <MdOutlineArticle className="icons" /> */}
                                        All Blogs
                                    </Link>

                                    <Link to="/dashboard/newblog">
                                        {/* <MdOutlineArticle className="icons" /> */}
                                        Write blog
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link to="/dashboard/profile">
                                    <CgProfile className="icons" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={logoutHandler}>
                                    <MdLogout className="icons" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </Nav>
                </SideBar>
                <MainComponent>
                    <Outlet />
                </MainComponent>
            </DashBoard>
        </>
    );
}

export default Navbar;
const DashBoard = styled.div`
    display: flex;
    flex-direction: row;
`;
const MainComponent = styled.div`
    background-color: rgb(${DarkColors.themeBackgroundSemiDark});
    margin: 0;
    /* position: relative; */
    padding-left: 180px;
    /* padding-bottom: 10vw; */
    min-height: 100vh;
    /* overflow-x: hidden; */
    /* width: 90vw; */
    flex: 1;
`;

const SideBar = styled.aside`
    font-family: Lato, serif;
    z-index: 5;
    position: fixed;
    width: 180px;
    height: 100vh;
    background: rgb(${DarkColors.themeBackgroundDark});
    font-size: 0.65em;
`;
const Nav = styled.nav`
    position: relative;
    margin: 0;
    text-align: left;
    top: 5vh;
    font-weight: bold;
    ul {
        list-style: none;
        li {
            margin: 3vh 0;

            .hideProfileBox {
                display: none;
            }
            .showProfileBox {
                display: block;
            }
            a {
                border: 2px solid rgb(${DarkColors.themeBackgroundDark});
                position: relative;
                padding-left: 3em;
                font-size: 1em;
                line-height: 5vh;
                cursor: pointer;
                text-transform: uppercase;
                text-decoration: none;
                letter-spacing: 0.4em;
                color: rgb(${DarkColors.themeFont});
                display: block;
                transition: all ease-out 300ms;

                .icons {
                    font-size: 2em;
                    transform: translateY(25%);
                    margin-right: 0.5em;
                }
                :hover {
                    color: rgb(${DarkColors.themeSemiLight});
                    border: 2px solid rgba(${DarkColors.themeSemiLight}, 0.5);
                }
                :focus {
                    color: black;
                    border-image: linear-gradient(
                            45deg,
                            rgb(${DarkColors.themeSemiLight}),
                            rgb(252, 165, 4)
                        )
                        1;
                    background-image: linear-gradient(
                        45deg,
                        rgb(${DarkColors.themeSemiLight}),
                        rgb(252, 165, 4)
                    );
                }
                .dropArrow {
                    font-size: 1em;
                }
                .dropArrowUpSide {
                    position: absolute;
                    transform: rotate(180deg);
                }
            }
            div {
                background-color: #77777747;
                a {
                    padding-left: 4em;
                    border: none;
                    font-size: 1em;
                    cursor: pointer;
                    text-transform: uppercase;
                    text-decoration: none;
                    letter-spacing: 0.4em;
                    color: rgb(${DarkColors.themeFont});
                    transition: all ease-out 300ms;
                    .icons {
                        transform: translateY(25%);
                        margin-right: 0.5em;
                    }
                    :hover {
                        color: rgb(${DarkColors.themeSemiLight});
                        /* outline:2px solid blue; */
                        border: none;
                    }
                    :focus {
                        color: black;
                        border: none;
                        background-image: linear-gradient(
                            45deg,
                            rgb(${DarkColors.themeSemiLight}),
                            rgb(252, 165, 4)
                        );
                    }
                }
            }
        }
    }
`;
