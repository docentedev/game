import React from 'react';
import start from './core/Game';

start();

function App() {
  return (
    <div className="App">
      <div id="game"></div>
      <pre id="info" style={{fontSize: '8px', color: '#ffffff'}}></pre>
    </div>
  );
}

export default App;
