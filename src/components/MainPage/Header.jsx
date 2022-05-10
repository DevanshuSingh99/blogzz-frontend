import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {IoMdNotificationsOutline} from "react-icons/io";
import {HiOutlineUserCircle} from "react-icons/hi";
import styled from "styled-components";
import {DarkColors} from "../../styles/sharedCss";
import axios from "axios";
import store from "../../redux/store";
import {BLOG_LOGOUT, LOG_IN, USER_LOGOUT} from "../../redux/actions";
import Cookies from "universal-cookie";

function Header(props) {
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [profileBox, setProfileBox] = useState(false);
    const editHandler = () => {
        return navigate("/dashboard/edit");
    };

    const dashHandler = () => {
        return navigate("/dashboard");
    };
    const logoutHandler = () => {
        cookie.remove("auth");
        store.dispatch({type: USER_LOGOUT});
        store.dispatch({type: BLOG_LOGOUT});
        setUser(null)
        navigate("/login");
    };
    const profileClick = () => {
        setProfileBox(profileBox ? !profileBox : !profileBox);
    };
    useEffect(() => {
        setProfileBox(false);

        if (Object.keys(props.userResponse).length !== 0) {
            setUser(props.userResponse.user);
        }
    }, [props.userResponse]);
    useEffect(() => {
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
                        // cookie.set("auth", response.accessToken);
                        store.dispatch({
                            type: LOG_IN,
                            payload: response.user,
                        });
                        // navigate("/home");
                    }
                });
            })();
        }
    }, []);
    return (
        <>
            <HeaderBar>
                <HeaderMenu>
                    <Heading>blogzz</Heading>
                    <NavLink>
                        <Links>
                            <li>
                                <Link to="/home">HOME</Link>
                            </li>
                            {/* <li>
                            <Link to="/articles">Articles</Link>
                        </li> */}
                            <li>
                                <Link to="/aboutus">about us</Link>
                            </li>
                            <li>
                                <Link to="/contactus">Contact us</Link>
                            </li>
                        </Links>
                    </NavLink>
                    {!user ? (
                        <LoginReg>
                            <Link to="/login">Login / Register</Link>
                        </LoginReg>
                    ) : (
                        <UserProfile>
                            <span className="welcomeUser">
                                Welcome {props.userResponse.user.name}
                            </span>
                            <i className="notificationIcon">
                                <IoMdNotificationsOutline />
                            </i>
                            <div className="profileIcon">
                                <span onClick={profileClick}>
                                    <HiOutlineUserCircle />
                                </span>
                                <div
                                    className={`${
                                        profileBox
                                            ? "showProfileBox"
                                            : "hideProfileBox"
                                    }`}
                                >
                                    <div
                                        className="profileBoxOption"
                                        onClick={editHandler}
                                    >
                                        Edit
                                    </div>
                                    <div
                                        className="profileBoxOption"
                                        onClick={dashHandler}
                                    >
                                        Dashboard
                                    </div>
                                    <div
                                        className="profileBoxOption"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </UserProfile>
                    )}
                </HeaderMenu>
            </HeaderBar>
        </>
    );
}

const mapStateToProps = (state) => ({
    userResponse: state.userResponse,
});

export default connect(mapStateToProps)(Header);

const HeaderBar=styled.div`
    display: flex;
    justify-content: center;
    height: 10vh;
    padding: 10px ;

`
const HeaderMenu = styled.nav`
    //  background: linear-gradient(to right, #dadfc9, #c6da8a, #afc55d, #ccda90, #c3c5b8);
    background: rgb(${DarkColors.themeBackgroundSemiDark});
    font-family: Lato, serif;
max-width: 1530px;
    //    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`;

const Heading = styled.h1`
    margin: 0;
    text-transform: uppercase;
    font-size: 2em;
    color: rgb(${DarkColors.themeSemiLight});
`;

const NavLink = styled.div`
    text-decoration: none;
    text-transform: uppercase;
    padding: 20px 80px;
    transition: all 0.3s ease 0s;
    flex-grow: 4;
    display: flex;
    justify-content: center;

    max-width: 700px;
    font-size: 1.2rem;
`;
const Links = styled.ul`
    list-style: none;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    flex-grow: 3;
    li a {
        color: rgb(${DarkColors.themeFont});
        padding: 12px 20px;
        text-decoration: none;
        :hover {
            border-radius: 10px;
            background-color: rgba(${DarkColors.themeSemiLight}, 0.2);
        }
        /* border:  1px solid blue; */
    }
`;
const LoginReg = styled.div`
    a {
        color: rgb(${DarkColors.themeFont});
        text-decoration: none;
    }
`;

const UserProfile = styled.div`
    font-size: 18px;
    color: rgb(${DarkColors.themeFont});
    .welcomeUser {
        display: inline-block;
        transform: translateY(-50%);
    }
    .notificationIcon {
        transform: translateY(-30%);
        display: inline-block;
        margin-right: 1vw;
        font-size: 22px;
    }
    .profileIcon {
        display: inline-block;
        position: relative;
        font-size: 42px;
        cursor: pointer;
        .hideProfileBox {
            display: none;
        }
        .showProfileBox {
            position: absolute;
            right: 0;
            font-size: 16px;
            display: block;
            background-color: rgb(${DarkColors.themeBackgroundDark});
            color: rgb(${DarkColors.themeFont});
            width: max-content;
            div {
                padding: 10px 20px 10px 15px;
            }
        }
    }
    i:nth-child(2) {
        margin-left: 2vw;
    }
    .profileBoxOption {
        padding: 10px;
        cursor: pointer;
    }
    .profileBoxOption:hover {
        background-color: rgba(${DarkColors.themeFont}, 0.521);
    }
`;
