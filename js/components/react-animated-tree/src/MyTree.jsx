import "./MyTree.css";
import React, { useRef, useEffect, useState } from "react";
const MyTree = ({ tree, nestingLevel = 0, updateTree, open }) => {
  const treeRef = useRef(null);
  const [height, setHeight] = useState("0px");

  // useEffect(() => {
  //   if (open) {
  //     // setHeight(treeRef.current.scrollHeight);
  //     treeRef.current.style.height = `auto`;
  //   } else {
  //     treeRef.current.style.height = `0px`;
  //     // treeRef.current.style.height = `${treeRef.current.scrollHeight}px`;
  //     // setHeight(0);
  //   }
  // }, []);
console.log(tree);
  useEffect(() => {
    if (treeRef.current) {
      if (open) {
        setHeight(treeRef.current.scrollHeight);
      } else {
        treeRef.current.style.height = `${treeRef.current.scrollHeight}px`;
        setHeight(0);
      }
    }
  }, [open, treeRef]);

  useEffect(() => {
    setTimeout(() => {
      if (treeRef.current) {
        treeRef.current.style.transition = "all 500ms ease";
      }
    }, 1);
  }, [treeRef]);

  return (
    <div
      className={`tree`}
      ref={treeRef}
      style={{ height }}
      onTransitionEnd={() => {
        if (treeRef.current.style.height !== "0px") {
          setHeight("auto");
        }
      }}
    >
      {tree?.map((branch) => (
        <React.Fragment key={branch.name}>
          <div
            onClick={() => updateTree(branch.name)}
            className={"branch"}
            style={{
              paddingLeft: 15 * nestingLevel,
            }}
          >
            {branch.name}
          </div>

          <MyTree
            tree={branch.children}
            nestingLevel={branch.nestingLevel}
            updateTree={updateTree}
            open={branch.open}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MyTree;
