import React from "react";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.css";

function Previewer({ htmlString }) {
  //import parse to parse the string value in htmlString props.
  //If don't use parse, the result would have a bunch of html tag rendered on page.
  return <div id="preview">{parse(htmlString)}</div>;
}

export default Previewer;
