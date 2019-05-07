import React, { Component } from 'react';
import Background from '../assets/multiple-houses.jpeg';
import './home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <section className="home-landing-page">
                    <h1>HackYourEstate</h1>
                    <h3>
                        A REST API for finding, uploading and selling houses
                    </h3>
                </section>
            </div>
        );
    }
}
