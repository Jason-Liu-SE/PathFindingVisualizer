import React from 'react';
import { useState } from 'react';
import Grid from '../Components/Grid.js';
import Menu from '../Components/OptionMenu.js';
import AStar from '../Algorithms/AStar';
import Greedy from '../Algorithms/Greedy';

const Visualizer = () => {
    let delay = 20;
    let size = { x: 0, y: 0 };
    let selectedAlgorithm = 'A Star';

    const [cells, setCells] = useState([]);
    const gridRef = React.useRef(null);
    const menuRef = React.useRef(null);
    const updateDelay = (newDelay) => {
        delay = newDelay;
    };

    const updateAlgorithm = (newAlgorithm) => {
        selectedAlgorithm = newAlgorithm;
    };

    const clearGrid = () => {
        gridRef.current.clear();
    };

    const resetGrid = () => {
        gridRef.current.reset();
    };

    const setSize = (x, y) => {
        size.x = x;
        size.y = y;
    };

    const setFinished = () => {
        gridRef.current.setAlgoRunning(false);
        menuRef.current.setFinished();
    };

    const visualize = (algorithm) => {
        if (algorithm === 'A Star') {
            gridRef.current.setAlgoRunning(true);
            AStar(JSON.parse(JSON.stringify(cells)), size, gridRef.current.render, setFinished, delay);
        } else if (algorithm === 'Greedy Best First Search') {
            Greedy();
        }
    };

    return (
        <div className='visualizer'>
            <Grid cells={cells} setCells={setCells} setSize={setSize} ref={gridRef} />
            <Menu
                ref={menuRef}
                delay={delay}
                updateDelay={updateDelay}
                selectedAlgorithm={selectedAlgorithm}
                updateAlgorithm={updateAlgorithm}
                clearGrid={clearGrid}
                resetGrid={resetGrid}
                visualize={visualize}
            />
        </div>
    );
};

export default Visualizer;
