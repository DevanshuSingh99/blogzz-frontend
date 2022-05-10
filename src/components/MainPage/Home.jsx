import React, {useEffect, useState} from "react";
import Header from "../MainPage/Header";
import Tags from "./Home/Tags";
import BlogCard from "./Home/BlogCard";
import axios from "axios";
import {Link, Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {IoSearch} from "react-icons/io5";
import {DarkColors} from "../../styles/sharedCss";
import Cookies from "universal-cookie";

function Home() {
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    const [blogTags, setBlogTags] = useState([]);
    const [AllBlogs, setAllBlogs] = useState([]);
    const handlerCategoryChange=(e)=>{
        console.log("test");
    }
    useEffect(() => {
        (async () => {
            await axios({
                method: "get",
                url: "http://localhost:7010/tags/",
            }).then((res) => {
                if (res.status === 200) {
                    let response = res.data;
                    setBlogTags(response);
                }
            });
        })();
        try {
            axios({
                    method: "get",
                    url: "http://localhost:7010/blogs",
                })
                .then((res) => {
                    if (res.status === 200) {
                        let response = res.data;
                        setAllBlogs(response);
                        console.log(response);
                    }
                });
        } catch (error) {}
    }, []);

    return (
        <>
            <HomeWrapper>
                <LeftContainer>
                    <SearchFilterWrapper>
                        <Search>
                            <span>
                                <IoSearch color="black" />
                            </span>
                            <input placeholder="Search blog / tags / keywords" />
                        </Search>
                        <Filter>
                            <Category>
                                <select value="Category" onChange={handlerCategoryChange}>
                                    {/* <option value="Category" disabled selected>
                                        Category
                                    </option> */}
                                    <option value="Category">Sports</option>
                                    <option value="Category">Politics</option>
                                    <option value="Category">Technology</option>
                                </select>
                            </Category>
                            <button>Top</button>
                            <button>Latest</button>
                            <button>Likes</button>
                            <button>Views</button>
                        </Filter>
                    </SearchFilterWrapper>
                    <TagsBar>
                        {blogTags.length ? blogTags.map((tag)=>{return <Tags key={tag._id}tagTitle={tag.name}/>}):"dont have"}
                    </TagsBar>
                    <BlogsArea>{AllBlogs.map((Blog)=>{
                        return <BlogCard key={Blog._id} summary={Blog.summary} title={Blog.title} body={Blog.body} likes={Blog.likes} comments={Blog.comments} tags={Blog.tags} createdOn={Blog.createdOn} author={Blog.author}/>
                    })}</BlogsArea>
                </LeftContainer>
                <RightContainer>jald jaldjwjdk ajdwakdla d</RightContainer>
            </HomeWrapper>
        </>
    );
}

export default Home;

const HomeWrapper = styled.div`
    font-family: Lato, serif;

    display: flex;
    flex-direction: row;
    gap: 5vw;
    padding: 4vh 10vw;
    /* height: 10vh; */
`;
const LeftContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 3vh;
`;

const RightContainer = styled.div`
    flex: 1;
`;

const SearchFilterWrapper = styled.div`
    display: flex;
    gap: 3vw;
    width: 100%;
    position: relative;
`;

const Search = styled.div`
    flex: 4;
    span {
        width: 35px;
        height: 35px;
        position: absolute;
        * {
            font-size: 1.5em;
            margin-top: 5px;
            margin-left: 5px;
        }
    }
    input {
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        font-size: 14px;
        width: calc(100% - 50px);
        padding: 10px;
        padding-left: 40px;
        border: none;
        :focus {
            outline: none;
        }
    }
`;
const Category = styled.div`
    width: 40%;
    select {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        width: 100%;
        :focus {
            outline: none;
        }
    }
`;
const Filter = styled.div`
    flex: 2;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: space-between;
    button {
        border-radius: 5px;
        padding: 5px;
        background-color: rgb(${DarkColors.themeBackgroundDark});
        color: rgb(${DarkColors.themeFont});
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        border: none;
        flex-basis: 15%;
        :hover {
            background-color: #00000055;
        }
    }
`;
const TagsBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;

const BlogsArea = styled.div`

    display: flex;
    gap: 25px;
    flex-direction: column;
`;
