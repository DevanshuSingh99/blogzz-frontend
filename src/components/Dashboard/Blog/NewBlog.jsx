import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import styled from "styled-components";
import axios from "axios";
import {DarkColors} from "../../../styles/sharedCss";

import {GET_TAGS, WRITE_NEW_BLOG} from "../../../redux/actions";
import store from "../../../redux/store";
import Cookies from "universal-cookie";

import {Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewBlog(props) {
    const [blogTags, setBlogTags] = useState([]);
    const [blogErrorTitle, setBlogTitleError] = useState("");
    const [blogErrorSummary, setBlogSummaryError] = useState("");
    const [blogTagError, setBlogTagError] = useState("");

    const [blogBodyError, setBlogBodyError] = useState("");
    const [blogBody, setBlogBody] = useState({name: "TextArea"});
    const cookie = new Cookies();
    const authToken = cookie.get("auth");
    const [newBlogData, setNewBlogData] = useState({
        title: "",
        summary: "",
        tags: [],
        newTags: [],
        // body:"",
    });

    // BLOG DRAFT HANDLER
    let editorState = EditorState.createEmpty("");
    const [body, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
        setNewBlogData({...newBlogData, body: blogBody.value.innerText});
    };
    const handelBlogTitle = (e) => {
        setNewBlogData({...newBlogData, title: e.target.value});
    };
    const handelBlogSummary = (e) => {
        setNewBlogData({...newBlogData, summary: e.target.value});
    };
    const addNewTag = (e) => {
        let currentTag = document.getElementById("tag").value.trim();
        if (currentTag === "" || currentTag.length ===1) {
            setBlogTagError("Please enter a tag with atleast 2 letters");
            return;
        }
        if (blogTags.find((item) => item.name === currentTag)) {
            if (!newBlogData.tags.find((item) => item === currentTag)) {
                let allTags = newBlogData.tags;
                allTags.push(currentTag);
                setNewBlogData({...newBlogData, tags: allTags});
                setBlogTagError("");
                document.getElementById("tag").value = "";
            } else {
                setBlogTagError("Tag already added.");
            }
        } else {
            if (!newBlogData.newTags.find((item) => item === currentTag)) {
                let allTags = newBlogData.newTags;
                allTags.push({name:currentTag});
                setNewBlogData({...newBlogData, newTags: allTags});
                setBlogTagError("");
                document.getElementById("tag").value = "";
            } else {
                setBlogTagError("Tag already added.");
            }
        }
console.log(newBlogData);
    };

    // const handelBlogBody = (e) => {
    //     setNewBlogData({...newBlogData, body: e.target.value});
    // };

    // console.log(blogBody);
    const validate = () => {
        console.log(newBlogData);
        let error = 0;
        if (newBlogData.title.trim() === "") {
            setBlogTitleError("Please enter a title.");
            error++;
        } else {
            setBlogTitleError("");
        }
        if (newBlogData.summary.trim() === "") {
            setBlogSummaryError("Please enter a short description.");
            error++;
        } else {
            setBlogSummaryError("");
        }
        if (error) {
            return false;
        } else {
            return true;
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(newBlogData);
        if (validate()) {
            await axios({
                method: "post",
                headers: {
                    accesstoken: authToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                url: "http://localhost:7010/blogs/",
                data: newBlogData,
            }).then((res) => {
                let response = res.data;

                if (response.message === "Blog created") {
                    // console.log(response.responseBlog);
                    store.dispatch({
                        type: WRITE_NEW_BLOG,
                        payload: response.responseBlog,
                    });
                    return;
                }
            });
        }
    };

    useEffect(() => {
        (async () => {
            await axios({
                method: "get",
                url: "http://localhost:7010/tags/",
            }).then((res) => {
                if (res.status === 200) {
                    let response = res.data;
                    setBlogTags(response);
                    // store.dispatch({
                    //     type: GET_TAGS,
                    //     payload: response,
                    // });
                }
            });
        })();
    }, []);

    return (
        <>
            <BlogContainer>
                <BlogRecentTab>Drafts</BlogRecentTab>
                <BlogTitleBodyContainer>
                    <form className="title-body-form">
                        <div className="form__group field">
                            <input
                                onChange={handelBlogTitle}
                                type="input"
                                className="form__field"
                                placeholder="title"
                                name="title"
                                id="title"
                                value={newBlogData.title}
                                // required
                            />
                            <label htmlFor="title" className="form__label">
                                Title
                            </label>
                            <span className="error">{blogErrorTitle}</span>
                        </div>
                        <div className="form__group field">
                            <input
                                onChange={handelBlogSummary}
                                type="input"
                                className="form__field"
                                placeholder="summary"
                                name="summary"
                                id="summary"
                                value={newBlogData.summary}
                                // required
                            />
                            <label htmlFor="title" className="form__label">
                                Summary
                            </label>
                            <span className="error">{blogErrorSummary}</span>
                        </div>
                        {/* BLOG DRAFT JS  */}
                        <Editor
                            editorState={body}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                            wrapperStyle={{
                                all: "revert !important",
                                backgroundColor: "white",
                                color: "black",
                                width: "100%",
                                minHeight: 400,
                                border: "1px solid black",
                            }}
                            toolbar={{
                                options: [
                                    "inline",
                                    // "blockType",
                                    // "fontFamily",
                                    // "list",
                                    // "textAlign",
                                    "link",
                                    // "embedded",
                                    "emoji",
                                    "image",
                                    // "remove",
                                    "history",
                                ],
                            }}
                        />
                        <textarea
                            style={{display: "none"}}
                            disabled
                            ref={(val) => (blogBody.value = val)}
                            value={draftToHtml(
                                convertToRaw(body.getCurrentContent())
                            )}
                        />
                        {/* <textarea onChange={handelBlogBody}  placeholder="Enter blog data here" /> */}
                    </form>
                    <BlogTagsContainer>
                        <FormSubmitContainer>
                            <form onSubmit={onSubmit}>
                                <button type="submit">Publish</button>
                            </form>
                        </FormSubmitContainer>
                        <TagsContainer>
                            <span className="error">{blogTagError}</span>

                            <input list="tags" name="tags" id="tag" />
                            <button onClick={addNewTag}>Add</button>
                            <datalist id="tags">
                                {blogTags.map((singleTag) => {
                                    return (
                                        <option
                                            key={singleTag._id}
                                            value={singleTag.name}
                                        />
                                    );
                                })}
                            </datalist>
                        </TagsContainer>
                    </BlogTagsContainer>
                </BlogTitleBodyContainer>
            </BlogContainer>
        </>
    );
}
const mapStateToProps = (state) => ({
    userResponse: state.userResponse,
    blogResponse: state.blogResponse,
    tagResponse: state.tagResponse,
});

export default connect(mapStateToProps)(NewBlog);
const BlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    padding: 40px;
`;
const BlogRecentTab = styled.div`
    background-color: rgb(${DarkColors.themeBackgroundDark});
    color: rgb(${DarkColors.themeFont});
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
    height: 150px;
`;
const BlogTitleBodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    min-height: 50vh;
    /* padding: 20px; */
    /* color: black; */
    /* position: relative; */
    .title-body-form {
        padding: 20px;

        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
        border-radius: 10px;
        background-color: rgb(${DarkColors.themeBackgroundDark});
        flex: 4;
        .error {
            color: red;
        }
        .form__group {
            font-family: Lato, serif;
            position: relative;
            padding: 15px 0 0;
            /* margin-top: 10px; */
            width: 50%;
        }
        .form__field {
            font-family: inherit;
            width: 100%;
            border: 0;
            border-bottom: 2px solid rgb(${DarkColors.themeFont});
            outline: 0;
            font-size: 1.3rem;
            color: rgb(${DarkColors.themeFont});
            padding: 7px 0;
            background: transparent;
            transition: border-color 0.2s;

            &::placeholder {
                color: transparent;
            }

            &:placeholder-shown ~ .form__label {
                font-size: 1.3rem;
                cursor: text;
                top: 20px;
            }
        }
        .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 1rem;
            font-weight: 700;

            color: rgb(${DarkColors.themeFont});
        }

        .form__field:focus {
            ~ .form__label {
                position: absolute;
                top: 0;
                display: block;
                transition: 0.2s;
                font-size: 1rem;
                color: rgb(${DarkColors.themeSemiLight});
                font-weight: 700;
            }
            padding-bottom: 6px;
            font-weight: 700;
            border-width: 3px;
            border-image: linear-gradient(
                to right,
                rgb(${DarkColors.themeSemiLight}),
                #eeaf01
            );
            border-image-slice: 1;
        }
        /* reset input */
        .form__field {
            &:required,
            &:invalid {
                box-shadow: none;
            }
        }
        label {
            display: block;
        }
        .titleInput {
            border: 0;
            width: 20vw;
            padding: 0.5rem;
        }
        textarea {
            height: 50vh;
            margin-top: 20px;
            width: 100%;
        }
        .toolbarClassName {
            div {
                div {
                    background-color: #eeeeee;
                }
            }
            z-index: 2;
            position: sticky;
            top: 0;
            border-radius: 10px;
        }
        .editorClassName {
            all: revert !important;
            color: black;

            padding: 20px;
        }
        .wrapperClassName {
            margin-top: 20px;
            border-radius: 10px;
        }
    }
`;
const BlogTagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 1;

    div {
        color: rgb(${DarkColors.themeFont});
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
        background-color: rgb(${DarkColors.themeBackgroundDark});
        padding: 20px;
        flex-basis: 50%;
        max-height: 250px;
    }
`;
const FormSubmitContainer = styled.div``;
const TagsContainer = styled.div``;
const SubmitTasks = styled.div`
    position: relative;
    button {
        position: absolute;
        right: 0;
        display: block;
    }
`;
