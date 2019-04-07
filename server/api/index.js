const apiRouter = require('express').Router();

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

function getNewId() {
    let highestId = fakeDb[0].id;
    fakeDb.forEach(house => {
        if (house.id > highestId) {
            highestId = house.id;
        }
    });
    return highestId + 1;
}

apiRouter.get('/', (req, res) => {
    res.send('triggered by GET /api/ path');
});

apiRouter
    .route('/houses')
    .get((req, res) => {
        res.send(fakeDb);
    })
    .post((req, res) => {
        let { price } = req.body;
        price = Number(price);
        const newHouse = {
            id: getNewId(),
            price,
            description: req.body.description,
        };

        if (Number.isNaN(price) || price <= 0) {
            res.status(400).end('price should a positive number');
        } else {
            fakeDb.push(newHouse);
            res.json(newHouse);
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
        } else {
            res.status(404).send(`there was no house with id ${id}`);
        }
    });

apiRouter.use((req, res) => {
    res.status(404).end();
});

module.exports = apiRouter;
