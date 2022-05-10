import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import styled from "styled-components";
import {DarkColors} from '../../styles/sharedCss'

function MainDashboard() {
    const [active, setActive] = useState("loginForm");
    const [message, setMessage] = useState("Welcome back!");

    const loginForm = (e) => {
        document.getElementById("login").style.backgroundColor =
        `rgba(${DarkColors.themeSemiLight},0.7)`;
        document.getElementById("reg").style.backgroundColor =
            "rgb(238, 238, 238)";
        setActive("loginForm");
        setMessage("Welcome back!");
    };
    const regForm = () => {
        document.getElementById("reg").style.backgroundColor =
        `rgba(${DarkColors.themeSemiLight},0.7)`;
        document.getElementById("login").style.backgroundColor =
            "rgb(238, 238, 238)";
        setActive("regForm");
        setMessage("Get started!");
    };

    return (
        <Main>
            <LoginRegContainer>
                <LeftContainer>
                    <h1>{message}</h1>
                </LeftContainer>
                <RightContainer >
                    <LoginRegButtons >
                        <button
                            id="login"
                            className="loginBtn"
                            onClick={loginForm}
                        >
                            Login
                        </button>
                        <button id="reg" className="regBtn" onClick={regForm}>
                            Register
                        </button>
                    </LoginRegButtons>

                    <VisibleForm >
                        {active === "loginForm" && <LoginForm />}
                        {active === "regForm" && <RegistrationForm />}
                    </VisibleForm>
                </RightContainer>
            </LoginRegContainer>
        </Main>
    );
}

export default MainDashboard;

const Main = styled.div`
position: relative;
    height: 100vh;
    background-image: linear-gradient(
        to bottom,
        rgb(43, 45, 57),
        rgb(20, 21, 24) 80%
    );
`;
const LoginRegContainer = styled.div`
    position: absolute;
    background-image: linear-gradient(
        to bottom,
        rgb(43, 45, 57),
        rgb(20, 21, 24) 80%
    );

    width: 50vw;
    height: 60%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    display: flex;
`;
const LeftContainer = styled.div`
    /* width: 100%; */
    flex-basis: 100%;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background: radial-gradient(
        circle,
        rgba(255, 214, 84, 1) 0%,
        rgba(${DarkColors.themeSemiLight},1) 100%
    );
    h1{
       
    position: relative;
    margin-left:50%;
    top:50%;
    transform: translateX(-50%); 
    width: fit-content;
    font-size: 30px;
    text-align: center;
    
    }
`;

const RightContainer = styled.div`
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width: 100%;
    background-color: rgb(238, 238, 238);
`;
const LoginRegButtons = styled.div`
    position: relative;
    top: 6vh;
    button {
        padding: 5px 25px;
        font-size: 25px;
        border-radius: 8px;
        border: 0;
        background-color: rgb(238, 238, 238);
        position: absolute;
    }
    .loginBtn {
        left: 10vh;
    }
    .regBtn {
        right: 10vh;
    }
`;
const VisibleForm = styled.div`
    width: 70%;
    position: relative;
   left:50%;
    top:35%;
    transform: translateX(-50%); 
`
