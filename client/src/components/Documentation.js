import React, { Component } from 'react';

export default class Documentation extends Component {
    render() {
        const jsonFileFormat = {
            link: 'string url - NOT NULL',
            location_country: 'string - NOT NULL',
            location_city: 'string - NOT NULL',
            size_rooms: 'number - NOT NULL',
            price_value: 'number - NOT NULL',
            price_currency: 'string - 3chars - NOT NULL',
        };

        return (
            <div className="addElement">
                <h1>API Documentation</h1>
                <div className="index-content">
                    <div className="index">
                        <a href="#introduction">
                            <h3>Introduction</h3>
                        </a>

                        <a href="#getting">
                            <h3>Final Products of API</h3>
                        </a>

                        <a href="#contribution">
                            <h3>How to Contribute</h3>
                        </a>

                        <a href="#about">
                            <h3>About Us</h3>
                        </a>
                    </div>

                    <div className="content">
                        <div id="introduction">
                            <h2>Introduction</h2>
                            <p>
                                The Open Source Factory's main goal is that
                                information reaches people freely. In This
                                context, we provide this REST API that finds,
                                uploads and sells houses. Everyone can interact
                                with the application and reading the
                                documentation will guide you on how to
                                contribute with us by adding more houses to sell
                                following a certain format.
                            </p>
                        </div>

                        <div id="getting">
                            <h2>Final Products of API</h2>
                            <h3>1- Showing Data</h3>
                            <p>
                                This API is able to show information/data from
                                worldwide real estate market. Users reach
                                prices, specifications and locations of houses
                                for sale in different countries or cities. Users
                                can reach the data according to filter options
                                or they can sort selected data tables according
                                to preferences.
                            </p>

                            <h3>2- Producing a JSON File</h3>
                            <p>
                                This API is able to produce a JSON file that
                                consists comprehensive data of houses for sale
                                in real estate market.
                            </p>
                            <h3>3- Presenting Statistics</h3>
                            <p>
                                This API is able to show charts of statistics
                                about daily average prices of market in terms of
                                average price per m2 or average price per house.
                                Users can analyze the average price rates with
                                according to filter options.
                            </p>
                        </div>

                        <div id="contribution">
                            <h2>How to Contribute</h2>
                            <p>
                                Of course, everyone can contribute to our
                                database. When you make a contribution, your
                                data will be processed with our validation
                                function. All of your valid elements will be
                                inserted into our database, in the case of wrong
                                data you get a report specifying where the error
                                is and how you can properly write it. To
                                contribute you must write a json text as below
                                is explained.
                            </p>

                            <h3>JSON Text:</h3>
                            <p>
                                You will be able to write your own data using
                                our "contribute" section in the navigation menu
                                as a JSON format that we are going to provide in
                                the next lines.
                            </p>

                            <div className="entryFormat">
                                <h3>
                                    To add a contribution please make sure that:
                                </h3>
                                <ul>
                                    <li>Your text must be an array.</li>
                                    <li>
                                        Every element in the array must be an
                                        object.
                                    </li>
                                    <li>
                                        Every object must be in below format:
                                    </li>
                                    <pre>
                                        {JSON.stringify(
                                            jsonFileFormat,
                                            undefined,
                                            2
                                        )}
                                    </pre>
                                </ul>
                            </div>
                        </div>

                        <div id="about">
                            <h2>About Us</h2>
                            <p>
                                This API is produced as an educational project
                                by the students of the class 18 from Hack Your
                                Future coding school
                            </p>
                            <p>
                                HackYourFuture is a coding school that provides
                                new comers with a refugee status an opportunity
                                to build and improve programming skills. Over
                                the course of seven months professional
                                developers teach HTML, CSS, GitHub, JavaScript,
                                Node, Databases and React. Problem-solving
                                skills and teamwork are additional parts of the
                                curriculum. In the last part of the course,
                                students build a final project to put into
                                practice what they have learned. This project is
                                an API that involves mainly the broad techniques
                                of front-end web developing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
