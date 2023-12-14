import { useEffect, useState } from "react";
import "./Tree.css";

function Tree({ tree }) {
  const [openFolders, setOpenFolders] = useState({});

  useEffect(() => {
    const savedState = localStorage.getItem("openFolders");
    if (savedState) {
      setOpenFolders(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openFolders", JSON.stringify(openFolders));
  }, [openFolders]);

  const toggleFolder = (path) => {
    console.log(path);

    setOpenFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (node, path = "") => {
    return Object.keys(node).map((key) => {
      const newPath = path + "/" + key;
      return (
        <div key={newPath}>
          <div onClick={() => toggleFolder(newPath)}>{key}</div>
          <div className={`content ${openFolders[newPath] ? "open" : ""}`}>
            {typeof node[key] === "object" && renderTree(node[key], newPath)}
          </div>
        </div>
      );
    });
  };

  return <div>{renderTree(tree)}</div>;
}
export default Tree;
