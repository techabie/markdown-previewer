import Previewer from "./Previewer";
import { useState } from "react";
import React from "react";
import DOMPurify from "dompurify";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/lib/marked.esm.js";
import "bootstrap/dist/css/bootstrap.css";

//notice I use literal string below for multiline string.
//Escape backtick ` by having \ before it
const initialState = `
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`\`<div></div>\`\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
`;

function App() {
  const [content, setContent] = useState(initialState);
  /*
   */
  //set options for marked
  marked.use({
    gfm: true,
    breaks: true,
  });

  //santitize user input to prevent XSS attack
  //marked.parse() return a string ".....". so we need to parse it in <Previewer>
  const htmlAsString = DOMPurify.sanitize(marked.parse(content));
  return (
    <section className="display">
      <h1 className="title text-center">Markdown Editor App</h1>
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-lg-6 vh-100">
            <div className="header text-center">Editor</div>
            <textarea
              id="editor"
              onChange={(e) => setContent(e.target.value)}
              defaultValue={content}
            ></textarea>
          </div>
          <div className="col-lg-6 vh-100 previewer-wrapper">
            <div className="header text-center">Previewer</div>
            <Previewer htmlString={htmlAsString} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
