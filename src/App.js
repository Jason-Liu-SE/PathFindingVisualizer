import React, { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar.js';
import Visualizer from './Pages/Visualizer.js';

function App() {
    useEffect(() => {
        document.title = 'Path Visualizer';
    }, []);

    return (
        <div className='App'>
            <div className='fixedContent'>
                <NavBar />
            </div>
            <div className='content'>
                {/* <Visualizer /> */}
                {/* <Routes> */}
                {/* <Route path='/' element={<Visualizer />} /> */}
                {/* <Route path='/visualizer' element={<Visualizer />} /> */}
                {/* <Route path='/2' element={<p>You are on page 2</p>} />
                        <Route path='/3' element={<p>You are on page 3</p>} /> */}
                {/* </Routes> */}
            </div>
        </div>
    );
}

export default App;
