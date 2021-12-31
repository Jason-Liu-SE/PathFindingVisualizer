import React from 'react';
import { useState, useEffect } from 'react';
import { Menu, MenuItem, Slider } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs';

const OptionMenu = (props) => {
    const updateAlgorithm = props.updateAlgorithm;
    const updateDelay = props.updateDelay;
    const numbers = new RegExp('^[0-9]*$');

    const [delay, setDelay] = useState(props.delay);
    const [selectedAlgorithm, setAlgorithm] = useState(props.selectedAlgorithm);

    const [isResetting, setIsResetting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    // const [isClearing, setIsClearing] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const isAlgoMenuOpen = Boolean(anchor);
    const [width, setWidth] = useState('0px');

    useEffect(() => {
        updateDelay(delay);
    }, [updateDelay, delay]);

    useEffect(() => {
        updateAlgorithm(selectedAlgorithm);
    }, [selectedAlgorithm, updateAlgorithm]);

    useEffect(() => {
        if (isResetting) {
            setIsResetting(false);
        }

        return;
    }, [isResetting]);

    useEffect(() => {
        // var timer;
        // if (isRunning) {
        //     timer = setTimeout(() => {
        //         console.log('algorithm finished');
        //         setIsRunning(false);
        //     }, 500);
        // }
        // return () => clearTimeout(timer);
        if (isRunning) {
            props.visualize(selectedAlgorithm);
            setIsRunning(false);
        }
    }, [isRunning]);

    // useEffect(() => {
    //     var timer;
    //     if (isClearing) {
    //         timer = setTimeout(() => {
    //             console.log('Cleared');
    //             setIsClearing(false);
    //         }, 500);
    //     }
    //     return () => clearTimeout(timer);
    // }, [isClearing]);

    const handleReset = () => {
        // if (!isResetting) {
        //     console.log('Resetting');
        // }
        props.resetGrid();
    };

    const handleStart = () => {
        if (!isRunning) {
            console.log('Starting...');
            setIsRunning(true);
        }
    };

    const handleClear = () => {
        // if (!isClearing) {
        //     console.log('Clearing');
        //     setIsClearing(true);
        // }
        props.clearGrid();
    };

    const handleDelayChange = (e) => {
        if (e.target.value === '') e.target.value = 0;
        if (numbers.test(e.target.value)) {
            if (e.target.value > 1000) e.target.value = 1000;
            setDelay(parseInt(e.target.value));
        }
    };

    const handleSliderChange = (e, data) => {
        setDelay(data);
    };

    const handleAlgorithmClose = () => {
        setAnchor(null);
    };

    const handleAlgorithmOpen = (e) => {
        setWidth(e.currentTarget.clientWidth + 'px');
        setAnchor(e.currentTarget);
    };

    return (
        <div className='menu'>
            <h1 className='title'>Menu</h1>
            <div className='options'>
                <div className='description'>
                    <h3>
                        Press <strong>start</strong> to visualize the <b>{selectedAlgorithm}</b> algorithm!
                    </h3>
                    <div className='legend'>
                        <div>
                            Wall<div className='wall'></div>
                        </div>
                        <div>
                            Path<div className='path'></div>
                        </div>
                        <div>
                            Start<div className='start'>X</div>
                        </div>
                        <div>
                            End<div className='end'>O</div>
                        </div>
                        <div>
                            Visited<div className='visited'></div>
                        </div>
                        <div>
                            Next Cell<div className='next'></div>
                        </div>
                    </div>
                </div>
                <div className='start'>
                    <button onClick={handleStart}>Start</button>
                </div>
                <div className='algorithms'>
                    <button onClick={handleAlgorithmOpen}>
                        Algorithms
                        <BsChevronDown style={{ marginLeft: '4px' }} />
                    </button>
                    <Menu
                        anchorEl={anchor}
                        open={isAlgoMenuOpen}
                        onClose={handleAlgorithmClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        PaperProps={{
                            style: {
                                width: width,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setAlgorithm('A Star');
                                handleAlgorithmClose();
                            }}
                        >
                            A Star
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAlgorithm('Greedy Best First Search');
                                handleAlgorithmClose();
                            }}
                        >
                            Greedy Best First Search
                        </MenuItem>
                    </Menu>
                </div>
                <div className='delay'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <label>
                            <h3>Delay</h3>
                            <Slider
                                className='slider'
                                step={1}
                                min={0}
                                max={1000}
                                defaultValue={100}
                                value={delay}
                                onChange={handleSliderChange}
                                size={'medium'}
                            />
                            <input type='text' name='delay' maxLength='4' value={delay} onChange={handleDelayChange} />
                            ms
                        </label>
                    </form>
                </div>
                <div className='clear'>
                    <button onClick={handleClear}>Clear</button>
                </div>
                <div className='reset'>
                    <button onClick={handleReset}>Reset</button>
                </div>
                <div className='explanations'>{<h3>Some text to explain how the chosen algorithm works</h3>}</div>
            </div>
        </div>
    );
};

export default OptionMenu;
