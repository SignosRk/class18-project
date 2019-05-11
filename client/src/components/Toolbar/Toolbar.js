import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Contribute from '../Contribute';
import HouseForm from '../HouseForm';
import HouseDetails from '../HouseDetails';
import Documentation from '../Documentation';
import './Toolbar.sass';
import ToggleButton from '../SideBar/ToggleButton';

const toolbar = props => (
    <div>
        <header className="toolbar">
            <nav className="toolbar-nav">
                <div />
                <div className="spacer" />
                <div className="toolbar-toggle-button">
                    <ToggleButton click={props.buttonClickHandler} />
                </div>
                <div className="toolbar-nav-items">
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
                </div>
            </nav>
        </header>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contribute" component={Contribute} />
            <Route exact path="/houses" component={HouseForm} />
            <Route exact path="/houses/:id" component={HouseDetails} />
            <Route exact path="/documentation" component={Documentation} />
            <Route render={() => <div>404</div>} />
        </Switch>
    </div>
);

export default toolbar;
