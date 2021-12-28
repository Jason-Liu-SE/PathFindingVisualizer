import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar.js';
import Visualizer from './Pages/Visualizer.js';

function App() {
    return (
        <Router>
            <div className='App'>
                <NavBar />
                <Routes>
                    <Route path='/' element={<p>You are on the home page!</p>} />
                    <Route path='/visualizer' element={<Visualizer />} />
                    <Route path='/2' element={<p>You are on page 2</p>} />
                    <Route path='/3' element={<p>You are on page 3</p>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
