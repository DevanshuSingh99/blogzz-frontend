import React, {useState} from "react";
import {connect} from "react-redux";
import { DarkColors } from "../../styles/sharedCss";

import {
    AiOutlineIdcard,
    AiOutlineUserAdd,
    AiOutlineMail,
    AiOutlineLock,
} from "react-icons/ai";
import styled from 'styled-components'
//
function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [userErr, setUserErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Form Validation
    const validate = () => {
        const nameErrMsg = {};
        const userErrMsg = {};
        const emailErrMsg = {};
        const passErrMsg = {};
        let isValid = true;

        if (!name.trim()) {
            nameErrMsg.nameErr = "*Required Field";
            isValid = false;
        }
        if (!username.trim()) {
            userErrMsg.userErr = "*Required Field";
            isValid = false;
        }
        if (!email.trim()) {
            emailErrMsg.emailErr = "*Required Field";
            isValid = false;
        }
        if (!password.trim()) {
            passErrMsg.passErr = "*Required Field";
            isValid = false;
        }
        setNameErr(nameErrMsg.nameErr);
        setUserErr(userErrMsg.userErr);
        setEmailErr(emailErrMsg.emailErr);
        setPassErr(passErrMsg.passErr);
        return isValid;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let formValues = {name, username, email, password};
        const isValid = validate();
        if (isValid) {
            props.signUpUser(formValues);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <label>
                <AiOutlineIdcard />
            </label>
            <input
                value={name}
                type="text"
                name="name"
                placeholder="Enter Full Name"
                onChange={handleName}
                autoComplete="off"
            />
            <ErrorMsg>{nameErr}&nbsp;</ErrorMsg>
            <label>
                <AiOutlineUserAdd />
            </label>
            <input
                value={username}
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleUsername}
                autoComplete="off"
            />
            <ErrorMsg>{userErr}&nbsp;</ErrorMsg>
            <label>
                <AiOutlineMail />
            </label>
            <input
                value={email}
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleEmail}
                autoComplete="off"
            />
            <ErrorMsg>{emailErr}&nbsp;</ErrorMsg>
            <label>
                <AiOutlineLock />
            </label>
            <input
                value={password}
                type="password"
                name="username/email"
                placeholder="Enter username or email"
                onChange={handlePassword}
                autoComplete="off"
            />
            <ErrorMsg>{passErr}&nbsp;</ErrorMsg>

            <SubmitBtn>Sign Up</SubmitBtn>
        </Form>
    );
}
//
// const mapStateToProps = (state) => {
//     return {
//         userResponse: state.userResponse,
//     };
// };

export default RegistrationForm;

const Form = styled.form`
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
    label{
        *{margin-right:0.6vw;
            transform: translateY(10%);
        }
        font-size:25px;
    }
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
