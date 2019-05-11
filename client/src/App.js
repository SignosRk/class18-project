import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideBar from './components/SideBar/SideBar';
import Backdrop from './components/SideBar/BackDrop/Backdrop';

class App extends Component {
    state = {
        sideBarOpen: false,
    };
    toggleClickHandler = () => {
        this.setState(prevState => {
            return { sideBarOpen: !prevState.sideBarOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideBarOpen: false });
    };
    render() {
        let backdrop;
        if (this.state.sideBarOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }
        return (
            <div style={{ height: '100%' }}>
                <Toolbar buttonClickHandler={this.toggleClickHandler} />
                <SideBar show={this.state.sideBarOpen} />
                {backdrop}
            </div>
        );
    }
}

export default App;
