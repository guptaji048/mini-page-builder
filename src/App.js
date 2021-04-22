import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import BlocksPanel from './components/BlocksPanel';
import DroppablePanel from './components/DroppablePanel';

function App() {

  return (
    <Grid container style={{ height: '100vh', width: '100%' }}>
      <Grid item md={9} style={{ backgroundColor: '#f3f3f3' }}>
        <DroppablePanel />
      </Grid>
      <Grid item md={3} style={{ backgroundColor: '#2d2d2d', padding: 10 }}>
        <BlocksPanel />
      </Grid>
    </Grid>
  );
}

export default App;
