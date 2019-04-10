import React, { Component } from 'react';

export default class Contribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    onSubmit = event => {
        event.preventDefault();

        fetch(`/api/houses`, {
            method: 'POST',
            body: this.dataInput.value,
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({ error: null });
                    console.log(data);
                }
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <textarea
                    ref={input => (this.dataInput = input)}
                    style={{
                        width: '300px',
                        height: '200px',
                        display: 'block',
                    }}
                />
                {error && <div>{error}</div>}
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
