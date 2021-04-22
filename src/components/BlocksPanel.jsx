import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles((theme) => ({
  blocksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    color: '#9c9c9c',
    borderRadius: 3,
    '&:active': {
      cursor: 'grabbing'
    }
  },
  icon: {
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
  }
}));

function BlocksPanel() {
  const classes = useStyles();
  const blocks = ['Label', 'Input', 'Button'];

  const handleDrag = (e, id) => {
    console.log('Dragged', id);
    e.dataTransfer.setData('id', id);
  };

  return (
    <div>
      <Typography variant="h5" style={{ color: 'white', fontWeight: 600, marginLeft: 15 }}>BLOCKS</Typography>
      <div className={classes.blocksContainer}>
        {blocks.map((type, idx) => (
          <div key={idx} className={classes.card} draggable onDragStart={(e) => handleDrag(e, type)}>
            <DragIndicatorIcon className={classes.icon} />
            <Typography variant="body1" style={{ marginLeft: 8 }}>{type}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlocksPanel;
