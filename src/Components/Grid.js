import React from 'react';

const ValidCell = new RegExp('[0-9]+ [0-9]+');

const handleClick = (e) => {
    //console.log(e.currentTarget.id);
    // checking if the target was a valid cell
    if (ValidCell.test(e.target.id)) {
        // changing the background colour of the cell, and the outline colour
        e.target.style.backgroundColor = 'rgb(3, 202, 252)';
        e.target.style.borderColor = 'rgba(3, 202, 252, 1)';
    }
};

const CreateGrid = (size) => {
    if (typeof size !== 'number') {
        return;
    } else if (size <= 0) {
        return;
    }

    var rows = [];
    var rowCells = [];

    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            rowCells.push(
                <button id={row + ' ' + col} key={row + ' ' + col} onClick={handleClick}>
                    {/* {col} */}
                </button>
            );
        }

        rows.push(
            <div className='cellRow' key={row}>
                {rowCells}
            </div>
        );
        rowCells = [];
    }

    return <div className='cells'>{rows}</div>;
};

const Grid = () => {
    return <div className='grid'>{CreateGrid(25)}</div>;
};

export default Grid;
