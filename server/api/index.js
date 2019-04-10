/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const apiRouter = require('express').Router();

const db = require('../db');

const { validateHouse, houseAsSqlParams } = require('../validation');

let lastId = 3;

const fakeDb = [
    {
        id: 1,
        price: 150000,
        description: 'House in London',
    },
    {
        id: 2,
        price: 120000,
        description: 'House in Las Vegas',
    },
    {
        id: 3,
        price: 140000,
        description: 'House in Amsterdam',
    },
    {
        id: 4,
        price: 15000000,
        description: 'House in Venezuela',
    },
];

const addHousesSql = `
replace into houses(
  link, 
  location_country,
  location_city,
  size_rooms,
  price_value,
  price_currency
) values ?;
`;

apiRouter.get('/', (req, res) => {
    res.send('triggered by GET /api/ path');
});

apiRouter
    .route('/houses')
    .get((req, res) => {
        res.send(fakeDb);
    })
    .post(async (req, res) => {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Data should be an array' });
        }

        const processedData = req.body.map(houseObj => {
            return validateHouse(houseObj);
        });

        const validData = [];
        const invalidData = [];

        processedData.forEach(el => {
            if (el.valid) {
                validData.push(el);
            } else {
                invalidData.push(el);
            }
        });

        const report = {
            valid: validData.length,
            invalid: invalidData,
        };

        if (validData.length) {
            try {
                const housesData = validData.map(el =>
                    houseAsSqlParams(el.raw)
                );
                await db.queryPromise(addHousesSql, [housesData]);
                return res.json(report);
            } catch (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }
        } else {
            res.json(report);
        }
    });

apiRouter
    .route('/houses/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const foundHouse = fakeDb.find(house => {
            return house.id === id;
        });
        if (!foundHouse) {
            res.status(404).json({ error: `House with ID: ${id} not found` });
            return;
        }
        res.json(foundHouse);
    })
    .delete((req, res) => {
        const { id } = req.params;
        const index = fakeDb.findIndex(house => {
            return house.id === parseInt(id, 10);
        });

        if (index > -1) {
            fakeDb.splice(index, 1);
            res.send(`house ${id} is deleted`);
        }
        res.status(404).send(`there was no house with id ${id}`);
    });

apiRouter.use((req, res) => {
    res.status(404).end();
});

module.exports = apiRouter;
