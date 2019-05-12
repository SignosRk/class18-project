import React, { Component } from 'react';
import './contribute.sass';

export default class Contribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            report: null,
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
                    this.setState({ error: null, report: data });
                }
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };
    render() {
        const { error, report } = this.state;
        return (
            <form className="contribute-container" onSubmit={this.onSubmit}>
                <br /> <br /> <br />
                <div className="contribute-title">Add a new house to sell</div>
                <br />
                <textarea ref={input => (this.dataInput = input)} />
                {error && <div>{error}</div>}
                <br />
                <button className="btn-submit" type="submit">
                    Submit
                </button>
                <br />
                {!!report && <Report report={report} />}
            </form>
        );
    }
}

const Report = ({ report }) => (
    <div>
        valid houses: {report.valid} <br />
        invalid houses ({report.invalid.length}):{' '}
        {report.invalid.map(data => (
            <div>
                messages: <pre>{JSON.stringify(data.errors, null, 2)}</pre>
                raw: <pre>{JSON.stringify(data.raw, null, 2)}</pre>
            </div>
        ))}
    </div>
);
