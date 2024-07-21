import './App.css';
//import React, { useState } from 'react';
import MainIsland from './components/MainIsland';
import Modal from './components/Modal';
import Footer from './components/footer';


function App() {
  //let [selectedMenu, setSelectedItem] = useState('home');
  return (
    <div className="App">
      <header className="App-header">
        {
        
        }
      </header>
        <MainIsland />
        <Footer />
        <Modal />
    </div>
    
  );
}

export default App;
