import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import DropModal from './DropModal';

const useStyles = makeStyles((theme) => ({
  label: {
    color: 'black',
    outline: 'none',
    cursor: 'grab',
    '&:focus-within': {
      border: '2px solid #d95409',
    },
  },
  textField: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
      cursor: 'grab',
    },
    '&:focus-within': {
      border: '2px solid #d95409',
    },
  },
  button: {
    backgroundColor: '#0044c1',
    color: 'white',
    padding: 5,
    textTransform: 'none',
    borderRadius: 3,
    '&:focus-within': {
      border: '2px solid #d95409',
      cursor: 'grab',
    },
    '&:hover': {
      backgroundColor: '#0044c1',
    }
  }
}));

function DroppablePanel() {
  const classes = useStyles();
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [storedBlocksData, setStoredBlocksData] = useState([]);

  const handleDrag = (e, id) => {
    e.dataTransfer.setData('existingBlockId', id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleOnDrop = (e) => {
    e.stopPropagation();
    const newBlockId = e.dataTransfer.getData('newBlockId');
    const existingBlockId = e.dataTransfer.getData('existingBlockId');
    if (newBlockId.length !== 0) {
      const droppedObject = {
        type: newBlockId,
        xCoord: e.clientX,
        yCoord: e.clientY,
      };
      return setSelectedItemData(droppedObject);
    }

    if (existingBlockId.length !== 0) {
      const updatedBlocksData = storedBlocksData.map(el => el.id.toString() === existingBlockId ? { ...el, xCoord: e.clientX, yCoord: e.clientY, } : el);
      setStoredBlocksData(updatedBlocksData);
      localStorage.setItem("DataBlocks", JSON.stringify(updatedBlocksData));
    }

  };

  const handleKeyEvent = (e, data) => {
    if (e.key === 'Enter') {
      return setSelectedItemData(data);
    }
    if (e.key === 'Delete') {
      console.log(data);
      const updatedBlocksData = storedBlocksData.filter(el => el.id !== data.id);
      localStorage.setItem("DataBlocks", JSON.stringify(updatedBlocksData));
      return setStoredBlocksData(updatedBlocksData);
    }
  }

  const BlockLoader = ({ blockData, key }) => {
    switch (blockData.type) {
      case 'Label':
        return (
          <div
            key={key}
            className={classes.label}
            draggable
            onDragStart={(e) => handleDrag(e, blockData.id)}
            onKeyDown={(e) => handleKeyEvent(e, blockData)}
            tabIndex={-1}
            style={{
              position: 'absolute',
              left: `${blockData.xCoord}px`,
              top: `${blockData.yCoord}px`,
              fontSize: `${blockData.fontSize}px`,
              fontWeight: `${blockData.fontWeight}`,
            }}
          >
            {blockData.text}
          </div>
        );
      case 'Input':
        return (
          <TextField
            key={key}
            className={classes.textField}
            type={blockData.inputType}
            placeholder={blockData.placeHolder}
            variant="outlined"
            margin="dense"
            style={{
              position: 'absolute',
              left: `${blockData.xCoord}px`,
              top: `${blockData.yCoord}px`,
            }}
            draggable
            onDragStart={(e) => handleDrag(e, blockData.id)}
            onKeyDown={(e) => handleKeyEvent(e, blockData)}
          />
        );
      case 'Button':
        return (
          <Button
            key={key}
            className={classes.button}
            variant="outlined"
            style={{ position: 'absolute', left: `${blockData.xCoord}px`, top: `${blockData.yCoord}px` }}
            draggable
            onDragStart={(e) => handleDrag(e, blockData.id)}
            onKeyDown={(e) => handleKeyEvent(e, blockData)}
          >
            {blockData.buttonLabel}
          </Button>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("DataBlocks"));
    if (storedData !== null) {
      setStoredBlocksData(storedData);
    }
    console.log(storedData);
  }, [selectedItemData]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.effectAllowed = "move";
      }}
      onDrop={(e) => handleOnDrop(e)}
    >
      {storedBlocksData.length !== 0 && storedBlocksData.map((block) => <BlockLoader blockData={block} key={block.id} />)}
      {selectedItemData && (<DropModal setSelectedItemData={setSelectedItemData} selectedItemData={selectedItemData} />)}
    </div>
  )
}

export default DroppablePanel
