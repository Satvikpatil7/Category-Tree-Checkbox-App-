import React, { useState, useMemo } from "react";

// Tree data
const checkBoxesData = [
  {
    id: 1,
    name: "fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          { id: 3, name: "orange", children: [] },
          { id: 4, name: "lemon", children: [] },
        ],
      },
      {
        id: 5,
        name: "Berries",
        children: [
          { id: 6, name: "strawberry", children: [] },
          { id: 7, name: "blueberry", children: [] },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "tropical",
    children: [
      { id: 9, name: "Mango", children: [] },
      { id: 10, name: "banana", children: [] },
    ],
  },
  { id: 11, name: "vegetables", children: [] },
];

// Utility to build a map of childId -> parentId
const buildParentMap = (data) => {
  const map = {};

  const traverse = (node, parent ) => {
    if (parent) {
      map[node.id] = parent.id;
    }
    node.children?.forEach((child) => traverse(child, node));
  };

  data.forEach((node) => traverse(node));
  return map;
};

// Utility to build a node map for fast lookup
const buildNodeMap = (data) => {
  const map = {};

  const traverse = (node) => {
    map[node.id] = node;
    node.children?.forEach(traverse);
  };

  data.forEach(traverse);
  return map;
};

const Checkboxes = ({ data, checked, setChecked, parentMap, nodeMap }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };
    
      
      // Update all children recursively
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          updateChildren(child);
        });
      };
      updateChildren(node);

      // Update all parents recursively
      const updateParents = (node) => {
        const parentId = parentMap[node.id];
        // console.log(parentId);
        
        if (!parentId) return;

        const parentNode = nodeMap[parentId];
        // console.log(parentNode);
        const allChildrenChecked = parentNode.children.every(
          (child) => newState[child.id]
        );
        console.log(allChildrenChecked);
        newState[parentId] = allChildrenChecked;

        updateParents(parentNode);
      };
      updateParents(node);

      return newState;
    });
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      {data.map((node) => (
        <div key={node.id}>
          <input
            type="checkbox"
            id={`checkbox-${node.id}`}
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <label htmlFor={`checkbox-${node.id}`}>{node.name}</label>
          {node.children?.length > 0 && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
              parentMap={parentMap}
              nodeMap={nodeMap}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [checked, setChecked] = useState({});

  const parentMap = useMemo(() => buildParentMap(checkBoxesData), []);
  const nodeMap = useMemo(() => buildNodeMap(checkBoxesData), []);
  // console.log("Parent Map:", parentMap);
  // console.log("Node Map:", nodeMap);
  

  return (
    <div>
      <h1>Category Tree</h1>
      <Checkboxes
        data={checkBoxesData}
        checked={checked}
        setChecked={setChecked}
        parentMap={parentMap}
        nodeMap={nodeMap}
      />
    </div>
  );
};

export default App;
