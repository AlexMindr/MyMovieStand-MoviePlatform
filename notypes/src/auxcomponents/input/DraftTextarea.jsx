import React, { useEffect, useState,Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw,convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import debounce from 'lodash/debounce';


export default function DraftTextArea({field,setField}) {
  const [editorState, setEditorState] = useState(()=>field?EditorState.createWithContent(convertFromRaw(JSON.parse(field))):EditorState.createEmpty())
  
  
  const onChange = (editorState) => {
    
    setField(convertToRaw(editorState.getCurrentContent()))
    setEditorState(
      editorState
    );
  }
  return (
      <div style={{ border: "1px solid black", padding: '2px', minHeight: '300px' }}>
      <Editor
        editorState={editorState}
        //toolbarOnFocus
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onChange}
      />
      </div>
  );
}
// class DraftTextArea extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <Editor
//         editorState={editorState}
//         toolbarOnFocus
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         onEditorStateChange={this.onEditorStateChange}
//       />
//     )
//   }
// }
// export default DraftTextArea