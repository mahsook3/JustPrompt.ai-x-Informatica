import React from 'react';
import Flowchart from './Flowchart';
import Tabs from '../sdlc/Tabs';

function DashBoard() {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto">
          <Flowchart />
        </div>
        <div className="flex-1 overflow-y-auto bg-white opacity-80" style={{ backgroundImage: 'radial-gradient(#9898a0 0.5px, #ffffff 0.5px)', backgroundSize: '10px 10px' }}>
          <Tabs />
        </div>
      </div>
    </>
  );
}

export default DashBoard;