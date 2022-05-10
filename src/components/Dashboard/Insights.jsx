import React from "react";
import styled from "styled-components";
import {DarkColors} from '../../styles/sharedCss'

const Insights = (insightsData) => {
    return (
        <InsightBlock>
            <div>
                <p>{insightsData.tag}</p>
                <h1>{insightsData.value}</h1>
            </div>
        </InsightBlock>
    );
};
export default Insights;

const InsightBlock = styled.div`
  
    width: 15vw;
    height: 15vh;
    color: rgb(${DarkColors.themeFont});
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
    background-color: rgb(${DarkColors.themeBackgroundDark});
    position: relative;
    div{
        position: absolute;
        top:20%;
        left:20%;
        
    }
    /* padding: 3rem 0 0 6rem; */
    p {
        margin: 0;
        font-size: 14px;
    }
    h1 {
        margin: 0;
        color: rgb(${DarkColors.themeSemiLight});
    }
`;
