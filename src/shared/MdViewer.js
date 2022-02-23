import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useTheme } from '../context/themeProvider';
import styled from 'styled-components';
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

  const ThemeMode = useTheme();
  const CurrentMode = ThemeMode[0] === 'light' ? 'null' : 'dark';

  return (
    <Body theme={ThemeMode[0]}>
      <Viewer
        ref={viewerRef}
        theme={CurrentMode}
      />
    </Body>
  );
};
const Body = styled.div`
  width: 100vw;
  padding: 0px;
`;


export default MdViewer;
