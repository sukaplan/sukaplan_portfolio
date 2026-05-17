import './App.css';
import React from 'react';
import Main from './Main';
import CatMascot from './components/CatMascot';

function App() {
  return (
    <div className="App">
      <div id="content">
        <Main />
      </div>
      <CatMascot />
    </div>
  );
}

export default App;
