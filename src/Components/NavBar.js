import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className='navBar'>
                <h1>
                    <Link to=''>Path Finding Visualizer</Link>
                </h1>
                <div className='links'>
                    {/* <Link to='visualizer'>Path Finding Visualizer</Link>
                    <Link to='2'>Link 2</Link>
                    <Link to='3'>Link 3</Link> */}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
