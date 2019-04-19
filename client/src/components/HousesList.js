import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HousesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            houses: [],
            error: null,
            loading: false,
            searchCriteria: {
                price_min: 0,
                price_max: 1000000,
                city: '',
                order: 'location_country_asc',
                page: 1,
            },
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
            error: null,
        });

        this.fetchHouses();
    }

    fetchHouses = () => {
        const { searchCriteria } = this.state;

        const queryString = Object.keys(searchCriteria)
            .reduce((query, field) => {
                const val = searchCriteria[field];
                if (val !== null && val !== '') {
                    query.push(`${field}=${encodeURI(val)}`);
                }
                return query;
            }, [])
            .join('&');

        // const queryString = Object.keys(searchCriteria)
        //     .map(field => `${field}=${encodeURI(searchCriteria[field])}`)
        //     .join('&');

        return fetch(`/api/houses?${queryString}`)
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
    };

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState(
            {
                ...this.state,
                searchCriteria: {
                    ...this.state.searchCriteria,
                    [name]: value,
                },
            },
            this.fetchHouses
        );
    };

    render() {
        const {
            houses,
            error,
            loading,
            searchCriteria: { price_min, price_max, city, order, page },
        } = this.state;

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
            <form>
                <div>
                    <label>
                        Price min:
                        <br />
                        <select
                            name="price_min"
                            value={price_min}
                            onChange={this.handleInputChange}
                        >
                            <option value="0">0</option>
                            <option value="50000">50000</option>
                            <option value="100000">100000</option>
                            <option value="200000">200000</option>
                            <option value="500000">500000</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Price max:
                        <br />
                        <select
                            name="price_max"
                            value={price_max}
                            onChange={this.handleInputChange}
                        >
                            <option value="50000">50000</option>
                            <option value="100000">100000</option>
                            <option value="200000">200000</option>
                            <option value="500000">500000</option>
                            <option value="1000000">1000000</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        City:
                        <br />
                        <select
                            name="city"
                            value={city}
                            onChange={this.handleInputChange}
                        >
                            <option value="">Select city</option>
                            <option value="Kiev">Kiev</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Order:
                        <br />
                        <select
                            name="order"
                            value={order}
                            onChange={this.handleInputChange}
                        >
                            <option value="location_country_asc">
                                Country ASC
                            </option>
                            <option value="location_country_desc">
                                Country DESC
                            </option>
                            <option value="price_value_asc">Price ASC</option>
                            <option value="price_value_desc">Price DESC</option>
                        </select>
                    </label>
                </div>

                <div>
                    {houses.map(houseObj => (
                        <div key={houseObj.id}>
                            <Link to={`/houses/${houseObj.id}`}>
                                {houseObj.price_value} <br />
                                {houseObj.location_country} <br />{' '}
                                {houseObj.location_city} <br /> <br />
                            </Link>
                        </div>
                    ))}
                </div>
            </form>
        );
    }
}
