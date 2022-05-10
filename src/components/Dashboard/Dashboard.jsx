import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {GET_MY_BLOG} from "../../redux/actions";
import Insights from "./Insights";
import axios from "axios";
import store from "../../redux/store";
import styled from "styled-components";
import {DarkColors} from "../../styles/sharedCss";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

function Dashboard(props) {
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    //
    const [userBlogs, setUserBlogs] = useState([]);

    // useEffect;
    // useEffect(() => {
    //     axios({
    //         method: "get",
    //         headers: {
    //             accesstoken: accessToken,
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         url: "http://localhost:7010/blogs/getUserBlogs",
    //     }).then((res) => {
    //         let response = res.data;
    //         setUserBlogs(response);
    //         store.dispatch({type: GET_MY_BLOG, payload: response});
    //     });
    // }, []);

    const editHandler = (e) => {
        console.log(e);
    };
    const deleteBlogHandler = (e) => {
        console.log(e);
    };
    return (
        <>
            {/* <h1>This is Dashboard Component</h1>
      <h4>MAIN DASHBOARD ** REPORTS ** FOLLOWERS ** LIKES ** VIEWS</h4>
      RENAME FILE TO REPORTS */}
            <DashboardContainer>
                <InsightContainer>
                    <Insights tag="Followers" value="77k" key="followers" />
                    <Insights tag="Total likes" value="420K" key="likes" />

                    <Insights tag="Views" value="690K" key="views" />
                </InsightContainer>

                
            </DashboardContainer>
        </>
    );
}
const mapStateToProps = (state) => ({
    userResponse: state.userResponse,
    blogResponse: state.blogResponse,
});
export default connect(mapStateToProps)(Dashboard);

const DashboardContainer = styled.div`
    font-family: Lato, serif;

    padding-left: 3vw;
    padding-top: 5vh;
    width: fit-content;
`;
const InsightContainer = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 3rem;
    /* position: relative; */
    width: 50vw;
`;

