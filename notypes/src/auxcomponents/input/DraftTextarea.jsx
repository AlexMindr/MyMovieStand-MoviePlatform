import React, { useEffect, useState,Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw,convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import debounce from 'lodash/debounce';

const obj={
  "blocks": [
      {
          "key": "8mk6u",
          "data": {},
          "text": "Aa1b test",
          "type": "unstyled",
          "depth": 0,
          "entityRanges": [],
          "inlineStyleRanges": [
              {
                  "style": "color-rgb(26,188,156)",
                  "length": 4,
                  "offset": 5
              }
          ]
      }
  ],
  "entityMap": {}
}

export default function DraftTextArea({field,setField,placeholder}) {
  //const [editorState, setEditorState] = useState(()=>field?EditorState.createWithContent(convertFromRaw(JSON.parse(field))):EditorState.createEmpty())
  const [editorState,setEditorState]= useState(field?EditorState.createWithContent(convertFromRaw(field)):EditorState.createEmpty())  
  const [ok,setOk] =useState(false)

  useEffect(()=>{
    if(field && ok===false){
     setEditorState(EditorState.createWithContent(convertFromRaw(field)))
      setOk(true)
    }
  },[field,ok,setOk])
  
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
        placeholder={placeholder}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize',
           'fontFamily', 'list', 'colorPicker','emoji','history'],
          inline: {
            inDropdown: true,
          },
          list: {
            inDropdown: true,
          }
        }}
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