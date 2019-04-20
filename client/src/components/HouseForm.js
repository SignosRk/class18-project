/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HouseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            error: null,
            loading: false,
            searchCriteria: {
                price_min: 0,
                price_max: 2000000,
                city: '',
                order: 'location_country_asc',
                page: 1,
            },
        };
    }

    componentDidMount() {
        const params = this.props.location.search
            .replace(/^\?/, '')
            .split('&')
            .filter(el => el.length)
            .map(pair => pair.split('='))
            .reduce((params, [name, value]) => {
                params[name] = value;
                return params;
            }, {});

        this.setState(
            {
                loading: true,
                error: null,
                searchCriteria: {
                    ...this.state.searchCriteria,
                    ...params,
                },
            },
            this.fetchHouses
        );
    }

    fetchHouses = (updateUrl = false) => {
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

        if (updateUrl) {
            this.props.history.replace(
                this.props.location.pathname + '?' + queryString
            );
        }

        return fetch(`/api/houses?${queryString}`)
            .then(res => res.json())
            .then(({ houses, pageSize, total, error }) => {
                if (error) {
                    this.setState({
                        loading: false,
                        error,
                        houses: [],
                    });
                } else {
                    this.setState({
                        houses,
                        total,
                        pageSize,
                        error: null,
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
            () => {
                this.fetchHouses(true);
            }
        );
    };

    render() {
        const {
            houses,
            error,
            loading,
            pageSize,
            total,
            searchCriteria: { price_min, price_max, city, order, page },
        } = this.state;

        console.log(page, pageSize, total);

        const pages = Math.ceil(total / pageSize);

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
                            <option value="2000000">2000000</option>
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
                    {loading && <div>Loading...</div>}

                    {error && <div>{error}</div>}

                    {Array.from({ length: pages || 0 }, (value, index) => {
                        const _page = index + 1;
                        return (
                            <div
                                key={_page}
                                className={`${page == _page ? 'active' : ''}`}
                                onClick={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            searchCriteria: {
                                                ...this.state.searchCriteria,
                                                page: _page,
                                            },
                                        },
                                        () => {
                                            this.fetchHouses(true);
                                        }
                                    );
                                }}
                            >
                                {_page}
                            </div>
                        );
                    })}

                    {houses.length === 0 ? (
                        <div>No houses yet</div>
                    ) : (
                        houses.map(houseObj => (
                            <div key={houseObj.id}>
                                <Link to={`/houses/${houseObj.id}`}>
                                    Price: {houseObj.price_value}{' '}
                                    {houseObj.price_currency}
                                    <br />
                                    Country: {houseObj.location_country}
                                    <br />
                                    City: {houseObj.location_city} <br />
                                </Link>
                                <br />
                                <br />
                            </div>
                        ))
                    )}
                </div>
            </form>
        );
    }
}
