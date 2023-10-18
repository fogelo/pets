import { useEffect, useState } from "react";
import { projects } from "../../store/projects";

const initialFolderPaths = [
  ...new Set(
    projects
      .map((p) => p.linkPath)
      .filter((path) => !path.includes("СПА/Шаблоны"))
      .map((path) =>
        path
          .replace("СПА/", "")
          .split("/")
          .slice(0, -1)
          .filter((pathPart) => pathPart !== "")
          .join("/")
      )
      .filter((path) => path.length > 0)
  ),
].map((path) => path.split("/"));

const getFolders = (folderPaths) => {
  const folders = [];
  folderPaths.forEach((folderPath) => {
    for (let i = 0; i < folderPath.length; i++) {
      const currentFolder = folders.find(
        (folder) => folder.path === folderPath.slice(0, i + 1).join("/")
      );

      if (currentFolder) {
        const nextFolderPath = folderPath.slice(0, i + 2);

        const hasSubFolder = currentFolder?.childPaths.some(
          (path) => path === nextFolderPath.join("/")
        );

        !hasSubFolder &&
          nextFolderPath.length === i + 2 &&
          currentFolder.childPaths.push(nextFolderPath.join("/"));
      } else {
        const folder = {
          name: folderPath[i],
          path: folderPath.slice(0, i + 1).join("/"),
          childPaths: [],
        };
        folders.push(folder);
      }
    }
  });
  return folders;
};

const ProjectsTree = () => {
  const [folderPaths, setFolderPaths] = useState(initialFolderPaths);
  const folders = getFolders(folderPaths);
  const rootPath = "Проекты";
  const rootFolder = folders.find((folder) => folder.path === rootPath);

  return (
    <>
      <ol>
        {rootFolder.childPaths.map((childPath) => (
          <li key={childPath}>
            <Tree parentPath={childPath} folders={folders} />
          </li>
        ))}
      </ol>
    </>
  );
};

const Tree = ({ parentPath, folders }) => {
  const parent = folders.find((folder) => folder.path === parentPath);
  //   console.log("СПА/Проекты/Medvedev/p1".split("/")[0]);

  return (
    <>
      {parent.name}
      <ol>
        {parent.childPaths.map((childPath) => (
          <li key={childPath}>
            <Tree parentPath={childPath} folders={folders} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default ProjectsTree;
