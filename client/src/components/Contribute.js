import React, { Component } from 'react';

export default class Contribute extends Component {
    render() {
        return (
            <form>
                <textarea
                    type="text"
                    style={{
                        width: '300px',
                        height: '300px',
                        display: 'block',
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
