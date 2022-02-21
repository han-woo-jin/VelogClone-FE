import React from "react";
import styled from "styled-components";
import { useTheme } from '../context/themeProvider';

const Grid = (props) => {
  const ThemeMode = useTheme();
  const {
    children,
    is_flex,
    width,
    padding,
    margin,
    bg,
    height,
    borderRadius,
    color,
  } = props;
  const styles = {
    is_flex: is_flex,
    width: width,
    padding: padding,
    margin: margin,
    bg: bg,
    height,
    borderRadius,
    color,
  };

  return (
    <React.Fragment>
      <Gridbox theme={ThemeMode[0]} {...styles}>{children}</Gridbox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: "auto",
  bg: false,
  height: "100%",
  borderRadius: "",
  color: "",
};

const Gridbox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
`;

export default Grid;
