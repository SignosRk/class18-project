import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HousesList from './components/HousesList';
import HouseDetails from './components/HouseDetails';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/houses">Houses</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/houses" component={HousesList} />
                    <Route exact path="/houses/:id" component={HouseDetails} />
                    <Route render={() => <div>404</div>} />
                </Switch>
            </div>
        );
    }
}

export default App;
