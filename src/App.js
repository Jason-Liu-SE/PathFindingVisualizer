import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar.js';
import Visualizer from './Pages/Visualizer.js';

function App() {
    return (
        <div className='App'>
            <Router>
                <div className='fixedContent'>
                    <NavBar />
                </div>
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<Visualizer />} />
                        {/* <Route path='/visualizer' element={<Visualizer />} /> */}
                        {/* <Route path='/2' element={<p>You are on page 2</p>} />
                        <Route path='/3' element={<p>You are on page 3</p>} /> */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
