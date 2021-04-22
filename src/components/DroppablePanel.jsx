import React, { useState } from 'react';
import DropModal from './DropModal';

function DroppablePanel() {
  const [draggedId, setDraggedId] = useState(null);

  const handleOnDrop = (e) => {
    const id = e.dataTransfer.getData('id');
    setDraggedId(id);
  };

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => handleOnDrop(e)}
    >
      Hello
      {draggedId && (<DropModal setDraggedId={setDraggedId} />)}
    </div>
  )
}

export default DroppablePanel
