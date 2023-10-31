import "./App.css";
import Tree from "./components/Tree/Tree";

function buildTree(paths) {
  const tree = {};
  paths.forEach((path) => {
    const parts = path.split("/");
    let current = tree;
    parts.forEach((part) => {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    });
  });
  return tree;
}

const paths = [
  "folder1/file1.txt",
  "folder1/folder2/file2.txt",
  "folder3/file3.txt",
];

const tree = buildTree(paths);
function App() {
  return (
    <>
      <Tree tree={tree} />
    </>
  );
}

export default App;
