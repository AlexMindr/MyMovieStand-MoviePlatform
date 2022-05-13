import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DraftTextArea() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
  }, [editorState]);
  return (
    <div>
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ border: "1px solid black", padding: '2px', minHeight: '300px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}