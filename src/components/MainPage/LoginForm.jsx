import React, {useState} from "react";
import axios from 'axios'
// import { Link, useHistory } from "react-router-dom";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {AiOutlineUser, AiOutlineLock} from "react-icons/ai";
import { DarkColors } from "../../styles/sharedCss";
import { LOG_IN } from "../../redux/actions";
import store from '../../redux/store'

//
function LoginForm(props) {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const [username, setUsername] = useState("zoop");
    const [password, setPassword] = useState("zoopzoop");
    const [usernameError, setUsernameError] = useState("");
    const [passError, setPassError] = useState("");
    const [loginError, setLoginError] = useState();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Form Validation
    const validate = () => {
        const usernameErr = {};
        const passErr = {};
        let isValid = true;

        if (!username.trim()) {
            usernameErr.userError = "*Required Field";
            isValid = false;
        }
        if (!password.trim()) {
            passErr.passwordErr = "*Required Field";
            isValid = false;
        }
        setUsernameError(usernameErr.userError);
        setPassError(passErr.passwordErr);
        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let loginValues = {username, password};
        if (validate) {
            await axios({
                method: 'post',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                url: 'http://localhost:7010/users/login',
                data: loginValues,
            })
                .then(res => {
                        let response = res.data
                      
                        if (response.message === "Invalid credentials.") {
    
                            setLoginError("Username and password does not match.")
                        } else if (response.message === "Authenticated") {
                            cookie.set('auth', response.accessToken)
                            store.dispatch({
                                type:LOG_IN,
                                payload: response.user,
                            })
                            navigate('/home')
                        }
    
                })
        }
        setPassword("");
    };

    //Token validation before login
    // if token already stored in cookies then check if ti is valid

    return (
        <Form onSubmit={onSubmit}>
            <p>{loginError}&nbsp;</p>

            <Label>
                <AiOutlineUser />
            </Label>
            <input
                value={username}
                type="text"
                name="usernameOrEmail"
                placeholder="Enter username or email"
                onChange={handleUsername}
                autoComplete="off"
            />

            <ErrorMsg>{usernameError}&nbsp;</ErrorMsg>

            <Label>
                <AiOutlineLock />
            </Label>
            <input
                value={password}
                type="password"
                name="username/email"
                placeholder="Enter password"
                onChange={handlePassword}
                autoComplete="off"
            />

            <ErrorMsg>{passError}&nbsp;</ErrorMsg>

            <SubmitBtn>Log In</SubmitBtn>
        </Form>
    );
}

const mapStateToProps = (state) => ({
    userResponse: state.userResponse,
});

export default LoginForm;

const Form = styled.form`
    p {
        margin-left: 5%;
        color: rgb(214, 36, 36);
        display: block;
        width: 100%;
    }
    input {
        width: 80%;
        border: 0;
        border-bottom: 2px solid rgb(0, 0, 0);
        outline: 0;
        font-size: 1.2rem;
        color: black;
        padding: 7px 5px;
        background: transparent;
        transition: border-color 0.4s;
    }
    input::placeholder {
        color: rgb(133, 133, 133);
    }
    input:focus {
        border-bottom: 2px solid rgb(${DarkColors.themeSemiLight});
    }
`;

const Label = styled.label`
*{margin-right:0.6vw;
            transform: translateY(10%);
        }
font-size: 25px;
`;
const ErrorMsg = styled.div`
    margin-left: 15%;
    color: rgb(214, 36, 36);
    display: block;
    width: 60%;
`;
const SubmitBtn = styled.button`
    border: 2px solid black;
    width: 100%;
    border-radius: 10px;
    padding: 10px 10px;
    background-color: rgb(${DarkColors.themeSemiLight});
`;
