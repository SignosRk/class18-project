const validator = require('validator');

const requiredFields = [
    'link',
    'location_country',
    'location_city',
    'size_rooms',
    'price_value',
    'price_currency',
];

const validateHouse = houseObj => {
    let valid = true;
    let errors = [];

    if (typeof houseObj !== 'object') {
        valid = false;
        errors.push(`house should be an object`);
    } else {
        requiredFields.forEach(field => {
            if (typeof houseObj[field] === 'undefined') {
                valid = false;
                errors.push(`${field}: is required`);
            }
        });

        if (!validator.isURL(houseObj['link'])) {
            valid = false;
            errors.push(`Link must be an url`);
        } else if (!validator.isNumeric(houseObj['price_value'])) {
            valid = false;
            errors.push(`price value has to be a numeric value`);
        }
    }

    return {
        valid,
        errors,
        raw: houseObj,
    };
};

const houseAsSqlParams = houseObj => {
    return [
        'link',
        'location_country',
        'location_city',
        'size_rooms',
        'price_value',
        'price_currency',
    ].map(field => houseObj[field]);
};

module.exports = {
    validateHouse,
    houseAsSqlParams,
};
