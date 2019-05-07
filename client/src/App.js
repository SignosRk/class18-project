import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Contribute from './components/Contribute';
import HouseForm from './components/HouseForm';
import HouseDetails from './components/HouseDetails';
import Documentation from './components/Documentation';

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav>
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
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contribute" component={Contribute} />
                    <Route exact path="/houses" component={HouseForm} />
                    <Route exact path="/houses/:id" component={HouseDetails} />
                    <Route
                        exact
                        path="/documentation"
                        component={Documentation}
                    />
                    <Route render={() => <div>404</div>} />
                </Switch>
            </div>
        );
    }
}

export default App;
