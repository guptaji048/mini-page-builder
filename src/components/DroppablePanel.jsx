import React, { useState, useEffect } from 'react';
import DropModal from './DropModal';

function DroppablePanel() {
  const [droppedItemData, setDroppedItemData] = useState(null);

  const handleOnDrop = (e) => {
    const id = e.dataTransfer.getData('id');
    const droppedObject = {
      type: id,
      xCoord: e.clientX,
      yCoord: e.clientY,
    };
    setDroppedItemData(droppedObject);
  };

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => handleOnDrop(e)}
    >
      {droppedItemData && (<DropModal setDroppedItemData={setDroppedItemData} droppedItemData={droppedItemData} />)}
    </div>
  )
}

export default DroppablePanel
