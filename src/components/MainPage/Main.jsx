import React from "react";
import Header from "../MainPage/Header";
import {Link, Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {DarkColors} from "../../styles/sharedCss";

function Main() {
    return (
        <>
            <MainWrapper>
                <Header />

                <Outlet />
            </MainWrapper>
        </>
    );
}

export default Main;
const MainWrapper = styled.div`
    width: 100vw;
    background: rgb(${DarkColors.themeBackgroundSemiDark});
    color: rgb(${DarkColors.themeFont});
    min-height: 100vh;
`;
