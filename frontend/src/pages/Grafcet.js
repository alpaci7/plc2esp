import React, { useState } from 'react';
import '../styles/Grafcet.css';

function Grafcet() {
  const [workspaceBoxes, setWorkspaceBoxes] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });

  // When a box is dragged from the left sidebar
  const handleDragStart = (event, boxType) => {
    event.dataTransfer.setData('boxType', boxType);
  };

  // Handles the drop of a new box inside the workspace
  const handleDrop = (event) => {
    event.preventDefault();

    // Check if the box being dragged is from the sidebar (new box)
    const boxType = event.dataTransfer.getData('boxType');
    if (boxType) {
      const x = event.clientX - event.currentTarget.offsetLeft;
      const y = event.clientY - event.currentTarget.offsetTop;
      
      // Add a new box to the workspace
      setWorkspaceBoxes([...workspaceBoxes, { id: workspaceBoxes.length + 1, type: boxType, x, y }]);
    }
  };

  // Handles the start of dragging an existing box in the workspace
  const handleWorkspaceBoxDragStart = (event, index) => {
    setDraggingIndex(index);
    setDraggingOffset({
      x: event.clientX - workspaceBoxes[index].x,
      y: event.clientY - workspaceBoxes[index].y,
    });
  };

  // Updates the position of a box while it is being dragged
  const handleWorkspaceBoxDrag = (event) => {
    if (draggingIndex === null) return;

    const newWorkspaceBoxes = [...workspaceBoxes];
    newWorkspaceBoxes[draggingIndex] = {
      ...newWorkspaceBoxes[draggingIndex],
      x: event.clientX - draggingOffset.x,
      y: event.clientY - draggingOffset.y,
    };
    setWorkspaceBoxes(newWorkspaceBoxes);
  };

  // Stops the dragging action
  const handleWorkspaceBoxDragEnd = () => {
    setDraggingIndex(null); // Stop dragging when drag ends
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="container">
      <div className="box-container">
        {/* Draggable boxes */}
        <div
          className="box"
          draggable
          onDragStart={(event) => handleDragStart(event, 'Box 1')}
        >
          Box 1
        </div>
        <div
          className="box"
          draggable
          onDragStart={(event) => handleDragStart(event, 'Box 2')}
        >
          Box 2
        </div>
        <div
          className="box"
          draggable
          onDragStart={(event) => handleDragStart(event, 'Box 3')}
        >
          Box 3
        </div>
      </div>

      {/* Workspace area */}
      <div
        className="workspace"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleWorkspaceBoxDrag} // Update position during dragging
        onMouseUp={handleWorkspaceBoxDragEnd} // Stop dragging on mouse up
      >
        <h3>Workspace</h3>
        {workspaceBoxes.map((box, index) => (
          <div
            key={box.id}
            className="workspace-box"
            style={{ left: box.x, top: box.y, position: 'absolute' }}
            draggable
            onClick={(event) => handleWorkspaceBoxDragStart(event, index)}
            onDoubleClick={handleWorkspaceBoxDragEnd}
          >
            {box.type} #{box.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grafcet;
