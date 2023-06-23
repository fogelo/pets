// import "./App.css";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import MyTree from "./MyTree";
// const treeStyles = {
//   position: "absolute",
//   top: 40,
//   left: 40,
//   color: "white",
//   fill: "white",
//   width: "100%",
// };

// const typeStyles = {
//   fontSize: "2em",
//   verticalAlign: "middle",
// };

const data = [
  {
    name: "js",
    open: false,
    nestingLevel: 1,
    children: [
      {
        name: "react",
        open: false,
        nestingLevel: 2,
        children: [
          {
            name: "react-transition-group",
            open: false,
            nestingLevel: 3,
          },
          {
            name: "react-spring",
            open: false,
            nestingLevel: 3,
          },
        ],
      },
      {
        name: "vue",
        open: false,
        nestingLevel: 2,
      },
    ],
  },
  {
    name: "html",
    open: false,
    nestingLevel: 1,
    children: [
      {
        name: "pug",
        open: false,
        nestingLevel: 2,
      },
    ],
  },
  {
    name: "css",
    open: false,
    nestingLevel: 1,
    children: [
      {
        name: "less",
        open: false,
        nestingLevel: 2,
      },
      {
        name: "scss",
        open: false,
        nestingLevel: 2,
      },
      {
        name: "saas",
        open: false,
        nestingLevel: 2,
      },
    ],
  },
];

const App = () => {
  const [tree, setTree] = useState(data);

  const updateTree = (branchName) => {
    findBranch(tree, branchName);
    setTree([...tree]);
  };

  const findBranch = (branches, branchName) => {
    if (branches) {
      branches?.forEach((b) => {
        if (b.name === branchName) {
          b.open = !b.open;
          return;
        } else {
          findBranch(b.children, branchName);
        }
      });
    }
  };

  return <MyTree tree={tree} updateTree={updateTree} />;
};

export default App;
