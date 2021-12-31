import { border } from '@mui/system';
import React from 'react';
import { useState, useEffect } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';

const ValidCell = new RegExp('^cell[0-9]+_[0-9]+$');
const cellSize = 20;
const backgroundColor = 'rgba(255, 255, 255, 0.5)';
const borderColor = 'rgba(0, 0, 0, 0.3)';
const blockedColor = 'rgb(50, 50, 50)';

const Grid = React.forwardRef((props, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [sizeX, setSizeX] = useState(0);
    const [sizeY, setSizeY] = useState(0);
    const { height, width } = useWindowDimensions();
    const [startCell, setStartCell] = useState({ x: 0, y: 0 });
    const [endCell, setEndCell] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(true);
    const [isGridResetting, setIsGridResetting] = useState(false);

    var cells = props.cells ? props.cells : []; // {id, state}. state: blocked || open || start || end
    const setCells = props.setCells;

    useEffect(() => {
        setSizeX(Math.floor(width / 2 / cellSize));
        setSizeY(Math.floor((height * 256) / 324 / cellSize));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (sizeX > 0 && sizeY > 0) {
            setEndPoints();
            setLoading(false);
        }
    }, [sizeX, sizeY]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isGridResetting) {
            resetGrid();
            setIsGridResetting(false);
        }
    }, [isGridResetting]);

    // setting the starting and ending cells
    const setEndPoints = () => {
        setStartCell({ x: getRandInt(sizeX), y: getRandInt(sizeY) });

        let randX = startCell.x;
        let randY = startCell.y;

        while (randX === startCell.x && randY === startCell.y) {
            randX = getRandInt(sizeX);
            randY = getRandInt(sizeY);
        }

        setEndCell({ x: randX, y: randY });
    };

    const getRandInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const handleMouseHover = (e) => {
        if (isDragging) {
            handleMouseClick(e);
        }
    };

    const findStateElementById = (arr, id) => {
        if (!ValidCell.test(id)) {
            console.log('Invalid id <' + id + '> in findStateElementById');
            return;
        }

        return arr.find((elem) => {
            return elem.id === id;
        });
    };

    const handleMouseClick = (e) => {
        // checking if the target was a valid cell
        if (ValidCell.test(e.currentTarget.id)) {
            const elem = findStateElementById(cells, e.currentTarget.id);
            // checking the state of the cell, then disabling or enabling the
            // cell appropriately
            if (elem.state === 'open') {
                e.currentTarget.style.backgroundColor = blockedColor;
                e.currentTarget.style.borderColor = blockedColor;

                elem.state = 'blocked';
            } else if (elem.state === 'blocked') {
                e.currentTarget.style.backgroundColor = backgroundColor;
                e.currentTarget.style.borderColor = borderColor;

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

    const resetGrid = () => {
        // iterating through each of the cells in the grid
        // and changing their properties to their original state before
        // user input, with updated values for the endpoints
        const startid = 'cell' + startCell.y + '_' + startCell.x;
        const endid = 'cell' + endCell.y + '_' + endCell.x;

        cells.map((child) => {
            let tBackgroundColor = backgroundColor;
            let tBorderColor = borderColor;
            let value = '';
            let state = 'open';

            const cell = document.getElementById(child.id);

            // checking if the current cell is a special cell
            if (cell.id === startid) {
                state = 'start';
                tBackgroundColor = 'rgb(0, 150, 255)';
                tBorderColor = 'rgb(0, 150, 255)';
                value = 'X';
            } else if (cell.id === endid) {
                state = 'end';
                tBackgroundColor = 'rgb(252, 128, 3)';
                tBorderColor = 'rgb(252, 128, 3)';
                value = 'O';
            }

            cell.style.backgroundColor = tBackgroundColor;
            cell.style.borderColor = tBorderColor;
            cell.innerHTML = value;

            child.state = state;
        });
    };

    React.useImperativeHandle(ref, () => ({
        reset() {
            // determining the location of the new endpoints
            setEndPoints();

            // the resetting of the grid is handled through the useEffect, depending
            // on the isGridResetting useState.
            setIsGridResetting(true);
        },
        clear() {
            resetGrid();
        },
    }));

    const CreateGrid = () => {
        if (!loading) {
            const startid = 'cell' + startCell.y + '_' + startCell.x;
            const endid = 'cell' + endCell.y + '_' + endCell.x;

            var rows = [];
            var rowCells = [];

            // creating the grid of cells
            for (var row = 0; row < sizeY; row++) {
                for (var col = 0; col < sizeX; col++) {
                    var tBackgroundColor = backgroundColor;
                    var tBorderColor = borderColor;
                    var value = '';

                    // storing the cell's state
                    const id = 'cell' + row + '_' + col;
                    const cell = { id: id, state: 'open' };

                    // checking if the current cell is a special cell
                    if (id === startid) {
                        cell.state = 'start';
                        tBackgroundColor = 'rgb(0, 150, 255)';
                        tBorderColor = 'rgb(0, 150, 255)';
                        value = 'X';
                    } else if (id === endid) {
                        cell.state = 'end';
                        tBackgroundColor = 'rgb(252, 128, 3)';
                        tBorderColor = 'rgb(252, 128, 3)';
                        value = 'O';
                    }

                    // creating the new cell
                    var currCell = (
                        <div
                            id={id}
                            key={id}
                            onMouseDown={(e) => {
                                handleMouseDown(e);
                                handleMouseClick(e);
                            }}
                            onMouseUp={handleMouseUp}
                            onMouseEnter={handleMouseHover}
                            style={{ backgroundColor: tBackgroundColor, borderColor: tBorderColor }}
                        >
                            {value}
                        </div>
                    );

                    // storing a cell in a row
                    rowCells.push(currCell);

                    cells.push(cell);
                }

                // creating a new row
                rows.push(
                    <div className='cellRow' key={row}>
                        {rowCells}
                    </div>
                );
                rowCells = [];
            }

            setCells(cells);

            return <div className='cells'>{rows}</div>;
        }
    };

    return <div className='grid'>{CreateGrid()};</div>;
});

export default Grid;
