import React from 'react';
import { useState, useEffect } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';

const ValidCell = new RegExp('^[0-9]+,[0-9]+$');
const cellStates = []; // {id, state}. state: blocked || open

const Grid = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [sizeX, setSizeX] = useState(0);
    const [sizeY, setSizeY] = useState(0);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        setSizeX(width / 2 / 20);
        setSizeY((height * 256) / 324 / 20);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseHover = (e) => {
        if (isDragging) {
            handleMouseClick(e);
        }
    };

    const findElementById = (arr, id) => {
        return arr.find((elem) => {
            return elem.id === id;
        });
    };

    const handleMouseClick = (e) => {
        // checking if the target was a valid cell
        if (ValidCell.test(e.currentTarget.id)) {
            const elem = findElementById(cellStates, e.currentTarget.id);
            console.log(elem);
            // checking the state of the cell, then disabling or enabling the
            // cell appropriately
            if (elem.state === 'open') {
                console.log('blocking');
                e.currentTarget.style.backgroundColor = 'rgb(89, 89, 89)';
                e.currentTarget.style.borderColor = 'rgba(89, 89, 89, 1)';

                elem.state = 'blocked';
            } else {
                console.log('opening');
                e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)';
                e.currentTarget.style.borderColor = 'rgba(200, 200, 200, 0.9)';

                elem.state = 'open';
            }
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

    const CreateGrid = () => {
        // storing the cells
        var rows = [];
        var rowCells = [];

        // creating the grid of cells
        for (var row = 0; row < sizeY; row++) {
            for (var col = 0; col < sizeX; col++) {
                const currCell = (
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

                // storing a cell in a row
                rowCells.push(currCell);

                // storing the cell's state
                cellStates.push({ id: row + ',' + col, state: 'open' });
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

    return <div className='grid'>{CreateGrid()}</div>;
};

export default Grid;
