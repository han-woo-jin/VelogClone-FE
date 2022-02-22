import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";

export const setContent = async (viewerRef, data) => {
  try {
    const res = await axios.get(data);
    viewerRef.current.getInstance().setMarkdown(res.data);
  } catch (e) {
    console.log(e);
    viewerRef.current.getInstance().setMarkdown();
  }
};

const MdViewer = ({ viewerRef, ...props }) => {
  return (
    <Viewer
      ref={viewerRef}
    />
  );
};

export default MdViewer;
