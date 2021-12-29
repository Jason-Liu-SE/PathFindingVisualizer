import React from 'react';
import { useState, useEffect } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';

const ValidCell = new RegExp('^[0-9]+,[0-9]+$');
const cells = []; // {id, state}. state: blocked || open || start || end
const cellSize = 20;

const Grid = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [sizeX, setSizeX] = useState(0);
    const [sizeY, setSizeY] = useState(0);
    const { height, width } = useWindowDimensions();
    const [startCell, setStartCell] = useState({ x: 0, y: 0 });
    const [endCell, setEndCell] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(true);

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
                e.currentTarget.style.backgroundColor = 'rgb(89, 89, 89)';
                e.currentTarget.style.borderColor = 'rgba(89, 89, 89, 1)';

                elem.state = 'blocked';
            } else if (elem.state === 'blocked') {
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
        if (!loading) {
            const startid = startCell.y + ',' + startCell.x;
            const endid = endCell.y + ',' + endCell.x;
            console.log(startid);
            console.log(endid);
            console.log('');

            // storing the cells
            var rows = [];
            var rowCells = [];

            // creating the grid of cells
            for (var row = 0; row < sizeY; row++) {
                for (var col = 0; col < sizeX; col++) {
                    var backgroundColor = 'white';
                    var borderColor = 'rgba(200, 200, 200, 0.9)';
                    // var isSpecial = false;

                    // storing the cell's state
                    const id = row + ',' + col;
                    const cell = { id: id, state: 'open' };

                    // checking if the current cell is a special cell
                    if (id === startid) {
                        cell.state = 'start';
                        backgroundColor = 'rgb(3, 152, 252)';
                        borderColor = 'rgb(3, 152, 252)';
                        // isSpecial = true;
                    } else if (id === endid) {
                        cell.state = 'end';
                        backgroundColor = 'rgb(252, 128, 3)';
                        borderColor = 'rgb(252, 128, 3)';
                        // isSpecial = true;
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
                            style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
                        ></div>
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

            return <div className='cells'>{rows}</div>;
        }
    };

    return <div className='grid'>{CreateGrid()}</div>;
};

export default Grid;
