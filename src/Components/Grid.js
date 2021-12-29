import React from 'react';
import { useState } from 'react';

const ValidCell = new RegExp('^[0-9]+,[0-9]+$');

const Grid = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseHover = (e) => {
        if (isDragging) {
            handleMouseClick(e);
        }
    };

    const handleMouseClick = (e) => {
        // checking if the target was a valid cell
        if (ValidCell.test(e.currentTarget.id)) {
            // changing the background colour of the cell, and the outline colour
            e.currentTarget.style.backgroundColor = 'rgb(89, 89, 89)';
            e.currentTarget.style.borderColor = 'rgba(89, 89, 89, 1)';
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();

        if (!isDragging) {
            setIsDragging(true);
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
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

        // creating the grid of cells
        for (var row = 0; row < size; row++) {
            for (var col = 0; col < size; col++) {
                rowCells.push(
                    <div
                        id={row + ',' + col}
                        key={row + ',' + col}
                        onMouseDown={(e) => {
                            handleMouseDown(e);
                            handleMouseClick(e);
                        }}
                        onMouseUp={handleMouseUp}
                        onMouseEnter={handleMouseHover}
                    ></div>
                );
            }

            // creating a new row
            rows.push(
                <div className='cellRow' key={row}>
                    {rowCells}
                </div>
            );
            rowCells = [];
        }

        return <div className='cells'>{rows}</div>;
    };

    return <div className='grid'>{CreateGrid(25)}</div>;
};

export default Grid;
