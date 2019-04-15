import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HousesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            houses: [],
            error: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
            error: null,
        });

        fetch(`http://localhost:8080/api/houses`)
            .then(res => res.json())
            .then(housesList => {
                this.setState({
                    houses: housesList,
                    error: null,
                    loading: false,
                });
            })

            .catch(() => {
                this.setState({
                    error: 'Something is wrong',
                    loading: false,
                });
            });
    }

    render() {
        const { houses, error, loading } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        if (!houses.length) {
            return <div>No houses yet</div>;
        }

        return (
            <div>
                {houses.map(houseObj => (
                    <div key={houseObj.id}>
                        <Link to={`/houses/${houseObj.id}`}>
                            {houseObj.location_country}{' '}
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}
