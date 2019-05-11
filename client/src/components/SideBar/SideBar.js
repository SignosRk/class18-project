import React from 'react';
import { Link } from 'react-router-dom';

import './sideBar.sass';

const SideBar = props => {
    let sideBarClasses = 'side-bar';
    if (props.show) {
        sideBarClasses = 'side-bar open';
    }
    return (
        <div>
            <nav className={sideBarClasses}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/houses">Houses</Link>
                    </li>
                    <li>
                        <Link to="/contribute">Contribute</Link>
                    </li>
                    <li>
                        <Link to="/documentation">Documentation</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
