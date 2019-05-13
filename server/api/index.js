/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const apiRouter = require('express').Router();

const db = require('../db');

const { validateHouse, houseAsSqlParams } = require('../validation');

const HOUSES_PER_PAGE = 2;

const addHousesSql = `
replace into houses(
  link ,
  market_date,
  location_country,
  location_city ,
  location_address,
  location_coordinates_lat,
  location_coordinates_lng,
  size_living_area,
  size_rooms,
  price_value,
  price_currency,
  description,
  title,
  images,
  sold
) values ?;
`;

apiRouter.get('/', (req, res) => {
    res.send('triggered by GET /api/ path');
});

apiRouter
    .route('/houses')
    .get(async (req, res) => {
        let {
            size_rooms = 'all',
            price_min = 0,
            price_max = 2000000,
            order = 'location_country_asc',
            page = 1,
            location_city = '',
        } = req.query;
        // backend validations
        if (['all', '1', '2', '3', '4_or_more'].indexOf(size_rooms) === -1) {
            return res
                .status(400)
                .json({ error: `'size_rooms' param is wrong` });
        }
        price_min = parseInt(price_min, 10);
        if (Number.isNaN(price_min) || price_min < 0) {
            return res.status(400).json({
                error: `'price_min' should be positive number`,
            });
        }

        price_max = parseInt(price_max, 10);
        if (Number.isNaN(price_max) || price_max < 0) {
            return res.status(400).json({
                error: `'price_max' should be positive number`,
            });
        }

        if (price_max < price_min) {
            return res.status(400).json({
                error: `'price_max' should be greater than 'price_min'`,
            });
        }
        page = parseInt(page, 10);
        if (Number.isNaN(page) || page <= 0) {
            return res.status(400).json({
                error: `'page' should be a number more than 0`,
            });
        }

        let order_field, order_direction;

        const index = order.lastIndexOf('_');
        if (index > 0) {
            order_field = order.slice(0, index);
            order_direction = order.slice(index + 1);

            if (['asc', 'desc'].indexOf(order_direction) === -1) {
                order_direction = 'asc';
                return res.status(400).json({
                    error: `'order' para is wrong`,
                });
            }
        } else {
            return res.status(400).json({
                error: `'order' param is wrong`,
            });
        }

        const offset = (page - 1) * HOUSES_PER_PAGE;

        const conditions = [`(price_value between ? and ?)`];

        const params = [price_min, price_max];

        if (location_city.length) {
            conditions.push(`location_city = ?`);
            params.push(location_city);
        }
        if (size_rooms === '4_or_more') {
            conditions.push('size_rooms >= ?');
            params.push(4);
        } else if (size_rooms !== 'all') {
            conditions.push('size_rooms = ?');
            params.push(size_rooms);
        }

        const queryBody = `
            from houses
            where ${conditions.join(' and ')}
          `;

        const queryTotal = `
            select count(id) as total
            ${queryBody}
        `;
        const queryItems = `
            select *
            ${queryBody}
            order by ${db.escapeId(order_field, true)} ${order_direction}
            limit ${HOUSES_PER_PAGE}
            offset ${offset};
            `;

        try {
            const total = await db.queryPromise(queryTotal, params);
            const houses = await db.queryPromise(queryItems, params);
            res.json({
                total: total[0].total,
                houses,
                pageSize: HOUSES_PER_PAGE,
            });
        } catch (err) {
            console.log(err.sql);
            console.log(Object.keys(err));
            res.status(400).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Data should be an array' });
        }

        const processedData = req.body.map(houseObject => {
            return validateHouse(houseObject);
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

apiRouter.route('/houses/:id').get(async (req, res) => {
    const { id } = req.params;
    const houses = await db.queryPromise('select * from houses where id=id');
    console.log(id);
    const foundHouse = houses.find(house => {
        return house.id === id;
    });
    if (!foundHouse) {
        res.status(404).json({ error: `House with ID: ${id} not found` });
        return;
    }
    res.json(foundHouse);
});
// .delete((req, res) => {
//     const { id } = req.params;
//     const index = fakeDb.findIndex(house => {
//         return house.id === parseInt(id, 10);
//     });

//     if (index > -1) {
//         fakeDb.splice(index, 1);
//         res.send(`house ${id} is deleted`);
//     }
//     res.status(404).send(`there was no house with id ${id}`);
// });

apiRouter.use((req, res) => {
    res.status(404).end();
});

module.exports = apiRouter;
