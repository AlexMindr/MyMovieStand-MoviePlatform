import React, { useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftDisplay = ({ field }) => {
  // const [editorState, setEditorState] =  useState(()=>field?EditorState.createWithContent(convertFromRaw(JSON.parse(field))):null)//EditorState.createWithContent(convertFromRaw(JSON.parse(field)));
  const [editorState] = useState(
    EditorState.createWithContent(convertFromRaw(field))
  ); 

  return (
    <div className="readonly-editor">
      <Editor defaultEditorState={editorState} readOnly={true} toolbarHidden />
    </div>
  );
};

export default DraftDisplay;
