import React from 'react';
import { useState, useEffect } from 'react';

const Menu = () => {
    const [delay, setDelay] = useState(10);
    const [selectedAlgorithm, setAlgorithm] = useState('none');
    const [isResetting, setIsResetting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    useEffect(() => {
        var timer;
        if (isResetting) {
            timer = setTimeout(() => {
                console.log('done resetting');
                setIsResetting(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isResetting]);

    useEffect(() => {
        var timer;
        if (isRunning) {
            timer = setTimeout(() => {
                console.log('algorithm finished');
                setIsRunning(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isRunning]);

    useEffect(() => {
        var timer;
        if (isClearing) {
            timer = setTimeout(() => {
                console.log('Cleared');
                setIsClearing(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isClearing]);

    const handleReset = () => {
        if (!isResetting) {
            console.log('Resetting');
            setIsResetting(true);
        }
    };

    const handleStart = () => {
        if (!isRunning) {
            console.log('Starting...');
            setIsRunning(true);
        }
    };

    const handleClear = () => {
        if (!isClearing) {
            console.log('Clearing');
            setIsClearing(true);
        }
    };

    return (
        <div className='menu'>
            <h1 className='title'>Menu</h1>
            <div className='options'>
                <div className='description'>
                    <h3>
                        Choose an algorithm and press <b>start</b> to visualize it!
                    </h3>
                    <div className='legend'>
                        <div>Wall</div>
                        <div>Path</div>
                        <div>Start</div>
                        <div>End</div>
                    </div>
                </div>
                <div className='start'>
                    <button onClick={handleStart}>Start</button>
                </div>
                <div className='algorithms'>
                    <button>Algorithms</button>
                </div>
                <div className='delay'>
                    <form>
                        <label>
                            <h3>Delay</h3>
                            <input type='text' name='delay' />
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

export default Menu;
