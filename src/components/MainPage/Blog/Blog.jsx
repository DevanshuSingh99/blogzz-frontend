import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import {DarkColors} from "../../../styles/sharedCss";
import { convertFromHTML } from "draft-js";
import { ContentState } from "draft-js";
import { EditorState } from "draft-js";

function Blog() {
    const cookie = new Cookies();
    
    const accessToken = cookie.get("auth");
    const {author, title} = useParams();
    const [blog, setBlog] = useState();
    const [blogBody, setBlogBody] = useState("");

    useEffect(() => {
        try {
            axios({
                method: "get",
                headers: {
                    accesstoken: accessToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                url: `http://localhost:7010/blogs/${title.replaceAll(
                    "-",
                    " "
                )}`,
            }).then((res) => {
                setBlog(res.data);
        
            });
        } catch (error) {}
    }, []);

    return (
        <>
            <BlogMain>
                {blog ? (
                    <BlogContainer>
                        <BlogAuthor>{blog.author.name}</BlogAuthor>
                        <BlogBody>{blog.body}</BlogBody>
                        <BlogSuggestions>Ads</BlogSuggestions>
                    </BlogContainer>
                ) : (
                    "Loading..."
                )}
            </BlogMain>
        </>
    );
}

export default Blog;

const BlogMain = styled.div`
    display: flex;
    justify-content: center;
`;
const BlogContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1530px;
    gap: 50px;
    justify-content: space-between;
    div {
        background-color: rgb(${DarkColors.themeBackgroundDark});
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding: 10px;
        border-radius: 10px;
    }
`;
const BlogAuthor = styled.div`
    flex: 1;
`;
const BlogBody = styled.div`
    flex: 3;
`;
const BlogSuggestions = styled.div`
    flex: 1;
`;
