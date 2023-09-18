import { convertFromRaw, EditorState } from "draft-js";
import { useMemo } from "react";
import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type Props = { content: RawDraftContentState };

const EditorDisplay = ({ content }: Props) => {
  const editorState = useMemo(
    () => EditorState.createWithContent(convertFromRaw(content)),
    [content]
  );
  return (
    <Editor defaultEditorState={editorState} readOnly={true} toolbarHidden />
  );
};

export default EditorDisplay;
