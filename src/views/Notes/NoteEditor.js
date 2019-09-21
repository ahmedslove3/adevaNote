import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';







const handleTitleChange = (e, container) => {
    container.editTitle(e.target.value)
}

const handleBodyChange = (state, container) => {
    const textState = JSON.stringify(state.getCurrentContent()) || "";
    container.editNote(state, textState);
}
const createEditorState = (state) => {
    return state;
}
const NoteEditor = (props) => {

    const editorrState = props.noteContainer.selectedNote.body ? createEditorState(props.noteContainer.selectedNote.body) : EditorState.createEmpty();

    console.log(editorrState);

    return (

        <div style={style.editorContainer}>
            <input style={style.noteTitle} placeholder="Title" value={props.noteContainer.selectedNote.title} onChange={(e) => handleTitleChange(e, props.noteContainer)} className="title"></input>
            <Editor
                editorState={editorrState}
                toolbarClassName="toolbarWrapper"
                wrapperClassName="editorWrapper"
                editorClassName="textWrapper"
                onEditorStateChange={
                    (state) => {
                        handleBodyChange(state, props.noteContainer);

                    }
                }
            />
        </div>




    );
}


const style = {
    gridContainer: {
        height: "100%",
    },
    editorContainer: {
        height: "100%",
        padding: "20px",
        backgroundColor: "white"
    },
    noteTitle: {
        width: "100%",
        height: "50px",
        marginBottom: "20px",
        border: "1px solid gainsboro",
        borderRadius: "5px",
        fontSize: "large",
        paddingLeft: "10px"
    }






}





export default NoteEditor;