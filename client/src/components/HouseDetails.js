import React, { Component } from 'react';

export default class HousesDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            houseDetails: {},
            error: null,
            loading: false,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params.id;
        console.log(id);
        this.setState({
            loading: true,
            error: null,
        });

        fetch(`/api/houses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error,
                        loading: false,
                    });
                } else {
                    this.setState({
                        houseDetails: data,
                        error: data.error,
                        loading: false,
                    });
                }
            })

            .catch(() => {
                this.setState({
                    error: 'Something is wrong',
                    loading: false,
                });
            });
    }

    render() {
        const { houseDetails, error, loading } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    city: {houseDetails.location_city}
                    <br />
                    price: {houseDetails.price}
                    <br />
                    price_currency: {houseDetails.price_currency}
                </div>
            );
        }
    }
}
