import React, { useState } from 'react';
import Grid from '../Components/Grid.js';
import Menu from '../Components/OptionMenu.js';
import AStar from '../Algorithms/AStar';
import Greedy from '../Algorithms/Greedy';

const Visualizer = () => {
    var delay = 50;
    var selectedAlgorithm = 'A Star';

    const [cells, setCells] = useState([]); // {id, state}. state: blocked || open || start || end

    const gridRef = React.useRef(null);

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

    const visualize = (algorithm) => {
        if (algorithm === 'A Star') {
        } else if (algorithm === 'Greedy Best First Search') {
        }
    };

    return (
        <div className='visualizer'>
            <Grid cells={cells} setCells={setCells} ref={gridRef} />
            <Menu
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
