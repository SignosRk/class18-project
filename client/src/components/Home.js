import React, { Component } from 'react';
import './home.sass';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-landpage-hye">
                    <h1>HackYourEstate</h1>
                    <h3>
                        A REST API for finding, uploading and selling houses
                    </h3>
                    <div className="down-arrow">
                        <a href="#features">
                            <i className="fa fa-chevron-down" />
                        </a>
                    </div>
                    <div id="features" className="home-landpage-features">
                        <h3>Features</h3>
                        <div className="container">
                            <article>
                                <img
                                    src={require('../assets/seach-house-icon.png')}
                                    alt="search-houses-icon"
                                />
                                <h4>Search for houses</h4>
                            </article>
                            <article>
                                <img
                                    src={require('../assets/upload-data-icon.svg')}
                                    alt="upload-houses-icon"
                                />
                                <h4>Upload house data</h4>
                            </article>
                            <article>
                                <img
                                    src={require('../assets/contribute.png')}
                                    alt="upload-houses-icon"
                                />
                                <h4>Contribute to API</h4>
                            </article>
                        </div>
                    </div>
                    <div className="home-landpage-benefits">
                        <h3>Benefits</h3>
                        <div className="container">
                            <div className="row">
                                <img
                                    src={require('../assets/easy-to-use.png')}
                                    alt="easyToUse-icon"
                                />
                                <p>
                                    <strong>Easy to use</strong>
                                    <br />
                                    Find or upload in a matter of clicks
                                </p>
                            </div>
                            <div className="row">
                                <img
                                    src={require('../assets/open-source.png')}
                                    alt="openSource-icon"
                                />
                                <p>
                                    <strong>Open-source</strong>
                                    <br />
                                    Feel like the API is incomplete? <br /> Feel
                                    free to contribute!
                                </p>
                            </div>
                            <div className="row">
                                <img
                                    src={require('../assets/catalog.png')}
                                    alt="catalog-icon"
                                />
                                <p>
                                    <strong>Extensive catalog</strong>
                                    <br />
                                    Find your dream house in no time
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="home-landpage-writtenIn">
                        <h3>Written in</h3>
                        <div className="container">
                            <article>
                                <img
                                    src={require('../assets/mysql-icon.svg')}
                                    alt="mysql-icon"
                                />
                            </article>
                            <article className="nodejs-icon">
                                <img
                                    src={require('../assets/nodejs-icon.png')}
                                    alt="nodejs-icon"
                                />
                            </article>
                            <article>
                                <img
                                    src={require('../assets/reactjs-icon.png')}
                                    alt="upload-houses-icon"
                                />
                            </article>
                        </div>
                    </div>
                    <div className="home-landpage-waitingFor">
                        <h3>What are you waiting for?</h3>
                        <p>
                            Find your <span>next house,</span> or go{' '}
                            <span>contribute!</span>
                        </p>
                    </div>
                    <div className="footer">
                        <h4>© Copyright by HackYourFuture 2019</h4>
                    </div>
                </div>
            </div>
        );
    }
}
