import React from "react";
import styled from "styled-components";
import { useTheme } from '../context/themeProvider';
const Text = (props) => {
  const { margin, color, size, children, bold, lineHeight } = props;
  const ThemeMode = useTheme();
  const styles = {
    margin: margin,
    color: color,
    size: size,
    children: children,
    bold: bold,
    lineHeight: lineHeight,
  };

  return (
    <React.Fragment>
      <P theme={ThemeMode[0]}{...styles}>{children}</P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  margin: false,
  color: "black",
  size: "14px",
  children: false,
  bold: false,
  lineHeight: "",
};

const P = styled.p`
  background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  color: ${props => props.theme === 'light' ? 'black' : 'white'};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  text-align: start;
`;

export default Text;
