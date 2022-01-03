import React from 'react';
import { useState, useEffect } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';

const Node = require('../Algorithms/Node');
const ValidCell = new RegExp('^cell[0-9]+_[0-9]+$');
const cellSize = 20;
const backgroundColor = 'rgba(255, 255, 255, 0.5)';
const borderColor = 'rgba(0, 0, 0, 0.3)';

const blockedColor = 'rgb(50, 50, 50)';
const pathColor = 'rgba(255, 166, 48, 0.8)';
const endColor = 'rgb(241, 119, 32)';
const startColor = 'rgb(0, 167, 225)';
const visitedColor = 'rgba(235, 235, 235, 0.35)';
const nextCellColor = 'rgba(4, 116, 186, 0.5)';
const currentCellColor = 'rgb(255, 0, 94)';

const Grid = React.forwardRef((props, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [sizeX, setSizeX] = useState(0);
    const [sizeY, setSizeY] = useState(0);
    const { height, width } = useWindowDimensions();
    const [startCell, setStartCell] = useState({ x: 0, y: 0 });
    const [endCell, setEndCell] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(true);
    const [isGridResetting, setIsGridResetting] = useState(false);

    let cells = props.cells ? props.cells : []; // {id, state}. state: blocked || open || start || end
    const setCells = props.setCells;
    const setSize = props.setSize;

    let isAlgoRunning = false;

    useEffect(() => {
        setSizeX(Math.floor(width / 2 / cellSize));
        setSizeY(Math.floor((height * 256) / 324 / cellSize));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (sizeX > 0 && sizeY > 0) {
            setSize(sizeX, sizeY);
            setEndPoints();
            setLoading(false);
        }
    }, [sizeX, sizeY]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isGridResetting) {
            resetGrid();
            setIsGridResetting(false);
        }
    }, [isGridResetting]); // eslint-disable-line react-hooks/exhaustive-deps

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
        if (!isAlgoRunning && ValidCell.test(e.currentTarget.id)) {
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

        if (!isAlgoRunning && !isDragging) {
            setIsDragging(true);
        }
    };

    const handleMouseUp = () => {
        if (!isAlgoRunning && isDragging) {
            setIsDragging(false);
        }
    };

    const handleMouseHover = (e) => {
        if (!isAlgoRunning && isDragging) {
            handleMouseClick(e);
        }
    };

    const resetGrid = () => {
        // iterating through each of the cells in the grid
        // and changing their properties to their original state before
        // user input, with updated values for the endpoints
        const startid = 'cell' + startCell.y + '_' + startCell.x;
        const endid = 'cell' + endCell.y + '_' + endCell.x;

        for (let child of cells) {
            let tBackgroundColor = backgroundColor;
            let tBorderColor = borderColor;
            let value = '';
            let state = 'open';

            const cell = document.getElementById(child.id);

            // checking if the current cell is a special cell
            if (cell.id === startid) {
                state = 'start';
                tBackgroundColor = startColor;
                tBorderColor = startColor;
                value = 'X';
            } else if (cell.id === endid) {
                state = 'end';
                tBackgroundColor = endColor;
                tBorderColor = endColor;
                value = 'O';
            }

            cell.style.backgroundColor = tBackgroundColor;
            cell.style.borderColor = tBorderColor;
            cell.innerHTML = value;

            child.state = state;
        }
    };

    const updateCells = (nodes) => {
        for (let child of nodes) {
            const node = document.getElementById(child.id);

            if (!node) continue;

            // changing the corresponding cell background
            if (child.state === 'start') {
                node.style.backgroundColor = startColor;
                node.style.borderColor = startColor;
            } else if (child.state === 'end') {
                node.style.backgroundColor = endColor;
                node.style.borderColor = endColor;
            } else if (child.state === 'blocked') {
                node.style.backgroundColor = blockedColor;
                node.style.borderColor = blockedColor;
            } else if (child.state === 'next') {
                node.style.backgroundColor = nextCellColor;
                node.style.borderColor = nextCellColor;
            } else if (child.state === 'current') {
                node.style.backgroundColor = currentCellColor;
                node.style.borderColor = currentCellColor;
            } else if (child.state === 'visited') {
                node.style.backgroundColor = visitedColor;
                node.style.borderColor = visitedColor;
            } else if (child.state === 'path') {
                node.style.backgroundColor = pathColor;
                node.style.borderColor = pathColor;
            } else if (child.state === 'open') {
                node.style.backgroundColor = backgroundColor;
                node.style.borderColor = borderColor;
            }
        }
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
        render(nodes) {
            updateCells(nodes);
        },
        setAlgoRunning(running) {
            isAlgoRunning = running;
        },
    }));

    const CreateGrid = () => {
        const startid = 'cell' + startCell.y + '_' + startCell.x;
        const endid = 'cell' + endCell.y + '_' + endCell.x;

        let rows = [];
        let rowCells = [];

        // creating the grid of cells
        for (let row = 0; row < sizeY; row++) {
            for (let col = 0; col < sizeX; col++) {
                let tBackgroundColor = backgroundColor;
                let tBorderColor = borderColor;
                let value = '';

                // storing the cell's state
                const id = 'cell' + row + '_' + col;
                const cell = new Node(id, col, row, 'open');

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
                let currCell = (
                    <div
                        className='cell'
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

                if (cells.length < sizeX * sizeY) cells.push(cell);
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
    };

    return <div className='grid'>{!loading && CreateGrid()}</div>;
});

export default Grid;
