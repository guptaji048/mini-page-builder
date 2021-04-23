import React, { useState, useEffect } from 'react';
import DropModal from './DropModal';

function DroppablePanel() {
  const [droppedItemData, setDroppedItemData] = useState(null);
  const [storedBlocksData, setStoredBlocksData] = useState([]);

  const handleOnDrop = (e) => {
    const id = e.dataTransfer.getData('id');
    const droppedObject = {
      type: id,
      xCoord: e.clientX,
      yCoord: e.clientY,
    };
    setDroppedItemData(droppedObject);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("DataBlocks"));
    if (storedData !== null) {
      setStoredBlocksData(storedData);
    }
  }, [droppedItemData]);

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
