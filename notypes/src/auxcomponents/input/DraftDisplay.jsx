import React,{useState} from 'react';
 import { convertFromRaw,EditorState} from 'draft-js';
 import { Editor } from "react-draft-wysiwyg";
 import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


 //const variable=`{"blocks":[{"key":"e884l","text":"abcdddddfbac","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":3,"length":9,"style":"color-rgb(204,204,204)"}],"entityRanges":[],"data":{}}],"entityMap":{}}`
 const DraftDisplay = ({field}) => {
    const [editorState, setEditorState] =  useState(()=>field?EditorState.createWithContent(convertFromRaw(JSON.parse(field))):null)//EditorState.createWithContent(convertFromRaw(JSON.parse(field)));

   return (
      <div className="readonly-editor">
        <Editor defaultEditorState={editorState} readOnly={true} toolbarHidden /> 
      </div>
   );
 }

 export default DraftDisplay