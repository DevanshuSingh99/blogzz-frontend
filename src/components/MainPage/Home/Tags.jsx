import React from "react";
import styled from "styled-components";
import {DarkColors} from "../../../styles/sharedCss";

function Tags(props) {
    return (
        <>
            <Tag type="button" value={props.tagTitle} />
        </>
    );
}

export default Tags;

const Tag = styled.input`
    background-color: rgb(${DarkColors.themeBackgroundDark});
    border-radius: 5px;
    color: rgb(${DarkColors.themeFont});
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

`;
