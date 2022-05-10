import {Editor} from "react-draft-wysiwyg";
import {WRITE_NEW_BLOG} from "../../redux/actions";

import store from "../../redux/store";
import {EditorState, convertToRaw} from "draft-js";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useState} from "react";

export default function TextEditor() {
    const [newBlogData, setNewBlogData] = useState({
        title: "",
        tags: [],
        status: "",
        draft: "",
    });
    const onChangeValue = (e) => {
        setNewBlogData({
            ...newBlogData,
            [e.target.name]: e.target.value,
        });
    };
    let editorState = EditorState.createEmpty();
    const [body, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    };
    console.log(newBlogData);

    return (
        <>
            <input
                type="text"
                name="title"
                value={newBlogData.title}
                onChange={onChangeValue}
                className="form-control"
                placeholder="Title"
                required
            />

            <Editor
                editorState={body}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                wrapperStyle={{
                    backgroundColor: "white",
                    width: 900,
                    border: "1px solid black",
                }}
            />
            <textarea
                style={{display: "none"}}
                disabled
                ref={(val) => (newBlogData.body = val)}
                value={draftToHtml(convertToRaw(body.getCurrentContent()))}
            />
        </>
    );
}
