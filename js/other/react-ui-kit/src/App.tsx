import "./App.css";
import ProgressBar from "./components/ProgressBar/ProgressBar";
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
      <ProgressBar progress={70} />
    </>
  );
}

export default App;
