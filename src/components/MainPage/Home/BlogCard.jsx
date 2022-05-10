import React from "react";
import {DarkColors} from "../../../styles/sharedCss";
import styled from "styled-components";
import {Link} from "react-router-dom";

function BlogCard({title, body, likes, comments, tags, createdOn, author,summary}) {
    
    return (
        <>
            <Blog>
                <Image>image</Image>
                <BlogDetails>
                    <TitleBar>
                            <h2>
                        <Link to={"/"+author.username+"/"+title.replace(/\s+/g, '-')}>
                                {title}
                        </Link>
                                </h2>
                        <div>Views</div>

                        <div>{createdOn}</div>
                    </TitleBar>
                        
                    <Body><Link to={"/"+author.username+"/"+title.replace(/\s+/g, '-')}>{summary}</Link></Body>
                    <BlogOptions>
                        <Author>{author.name}</Author>
                        <Options>
                            <div>comments</div>
                            <div>share</div>
                            <div>bookmark</div>
                        </Options>
                    </BlogOptions>
                </BlogDetails>
            </Blog>
        </>
    );
}

export default BlogCard;
const Blog = styled.div`
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 10px;
    background-color: rgb(${DarkColors.themeBackgroundDark});
    transition: all 0.4s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    :hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
    }
`;
const Image = styled.div`
    background-color: rgba(${DarkColors.themeSemiLight}, 0.4);
    width: 200px;
    height: 200px;
    flex-basis: 200px;
`;
const BlogDetails = styled.div`
    display: flex;
    flex-basis: 80%;
    gap: 5px;
    flex-direction: column;
`;
const TitleBar = styled.div`
    flex: 1;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    div {
        flex: 1;
    }
    h2 {
        flex: 3;
        a{
            color:rgb(${DarkColors.themeFont});
            text-decoration: none;

        }
    }
`;
const Body = styled.div`
    flex: 4;
    overflow: hidden;
    a{
        text-decoration: none;
        color:rgb(${DarkColors.themeFont});

    }
`;
const BlogOptions = styled.div`
    flex: 1;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Author = styled.div``;

const Options = styled.div`
    flex-direction: row;
    display: flex;
    gap: 10px;
`;
