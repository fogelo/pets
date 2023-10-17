import { useState } from "react";
import { places } from "../../store/places";

const PlacesTree = () => {
  const [nodes, setNodes] = useState(places);
  const rootNodeId = nodes[0].id;
  return (
    <>
      <Tree parentNodeId={rootNodeId} nodes={nodes} />
    </>
  );
};

const Tree = ({ parentNodeId, nodes }) => {
  const parentNode = nodes[parentNodeId];
  return (
    <>
      {parentNode.title}
      <ol>
        {parentNode.childIds.map((id) => (
          <li key={id}>
            <Tree parentNodeId={id} nodes={nodes} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default PlacesTree;
