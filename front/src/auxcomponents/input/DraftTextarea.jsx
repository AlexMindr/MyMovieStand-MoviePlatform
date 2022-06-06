import React, { useEffect, useState, Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DraftTextArea({
  field,
  setField,
  placeholder,
  textMaxLength,
}) {
  //const [editorState, setEditorState] = useState(()=>field?EditorState.createWithContent(convertFromRaw(JSON.parse(field))):EditorState.createEmpty())
  const [editorState, setEditorState] = useState(
    field
      ? EditorState.createWithContent(convertFromRaw(field))
      : EditorState.createEmpty()
  );
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (field && ok === false) {
      setEditorState(EditorState.createWithContent(convertFromRaw(field)));
      setOk(true);
    }
  }, [field, ok, setOk]);

  const onChange = (editorState) => {
    setField(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
  };

  const _getLengthOfSelectedText = () => {
    const currentSelection = editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);

      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  const _handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = _getLengthOfSelectedText();

    if (currentContentLength - selectedTextLength > textMaxLength - 1) {
      //console.log('you can type max ten characters');

      return "handled";
    }
  };

  const _handlePastedText = (pastedText) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = _getLengthOfSelectedText();

    if (
      currentContentLength + pastedText.length - selectedTextLength >
      textMaxLength
    ) {
      //console.log('you can type max ten characters');

      return "handled";
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          padding: "2px",
          minHeight: "300px",
        }}
      >
        <Editor
          editorState={editorState}
          //toolbarOnFocus
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onChange}
          placeholder={placeholder}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "colorPicker",
              "emoji",
              "history",
            ],
            inline: {
              inDropdown: true,
            },
            list: {
              inDropdown: true,
            },
          }}
          handleBeforeInput={_handleBeforeInput}
          handlePastedText={_handlePastedText}
        />
      </div>
      <div
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: "400",
          fontSize: "0.75rem",
          lineHeight: "1.66",
          letterSpacing: "0.03333em",
          textAlign: "left",
          marginTop: "3px",
          marginRight: "14px",
          marginBottom: "0",
          marginLeft: "14px",
        }}
      >
        {editorState.getCurrentContent().getPlainText("").length}/
        {textMaxLength} characters
      </div>
    </div>
  );
}


