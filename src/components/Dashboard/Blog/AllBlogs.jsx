import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {GET_MY_BLOG} from "../../../redux/actions";
import axios from "axios";
import store from "../../../redux/store";
import styled from "styled-components";
import {DarkColors} from "../../../styles/sharedCss";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

function AllBlogs() {
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    //
    const [userBlogs, setUserBlogs] = useState([]);

    // useEffect;
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accesstoken: accessToken,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            url: "http://localhost:7010/blogs/getUserBlogs",
        }).then((res) => {
            let response = res.data;
            setUserBlogs(response);
            store.dispatch({type: GET_MY_BLOG, payload: response});
        });
    }, []);
    const editHandler = (e) => {
        console.log(e);
    };
    const deleteBlogHandler = (e) => {
        console.log(e);
    };
    return (
        <>{userBlogs ? ( 

        
            <BlogContainer>
                <RenderAllBlogsContainer>
                    <table>
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Created on</td>
                                <td>Views</td>
                                <td>Likes</td>
                                <td>Comments</td>
                                <td>Visibility</td>
                                <td>Edit</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userBlogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>
                                        {blog.createdOn.split(" ")[2] +
                                            " " +
                                            blog.createdOn.split(" ")[1] +
                                            " " +
                                            blog.createdOn.split(" ")[3]}
                                    </td>
                                    <td>{blog.views}</td>
                                    <td>{blog.likes}</td>
                                    <td>{blog.comments}</td>
                                    <td>{blog.visibility}</td>
                                    <td className="blogChangeBtn">
                                        <AiFillEdit onClick={editHandler} />
                                    </td>
                                    <td className="blogChangeBtn">
                                        <AiFillDelete
                                            onClick={deleteBlogHandler}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <BlogTableRow
                        sNo="No."
                        title="Note Title"
                        views="Views"
                        likes="Likes"
                        comments="Comments"
                        visibility="Visibility"
                        edit="Edit"
                        remove="Remove"
                    /> */}
                </RenderAllBlogsContainer>
            </BlogContainer>):"a"}
        </>
    );
}

const mapStateToProps = (state) => ({
    userResponse: state.userResponse,
    blogResponse: state.blogResponse,
});
export default connect(mapStateToProps)(AllBlogs);
const BlogContainer = styled.div`
    font-family: Lato, serif;

    padding-left: 3vw;
    padding-top: 5vh;
    width: fit-content;
`;
const RenderAllBlogsContainer = styled.div`
    color: rgb(${DarkColors.themeFont});
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
    display: flex;
    flex-direction: column;
    /* margin-top: 30vh; */
    width: 84vw;
    height: 44vh;
    background-color: rgb(${DarkColors.themeBackgroundDark});
    overflow-y: scroll;
    table {
        padding: 20px;
        /* border-collapse: collapse; */
        border-spacing: 0;
        border: none;
        thead {
            position: sticky;
            top: 0;
            background-color: rgb(${DarkColors.themeBackgroundDark});
            tr {
                td {
                    padding: 15px 5px;
                    font-size: 16px;
                }
            }
        }
        tbody {
            tr {
                transition: 0.3s;
                td {
                    padding: 15px 5px;
                }
                :hover {
                    /* border-radius: 7px; */
                    transform: translateX(5px);
                    background-image: linear-gradient(
                        to right,
                        rgb(${DarkColors.themeSemiLight}) 70%,
                        rgb(236, 172, 54)
                    );
                    .blogChangeBtn {
                        color: black;
                    }
                }
            }
        }
    }
`;
