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
                errors.push(`${field}: is required, please provide it`);
            }
        });

        if (!validator.isURL(`${houseObj['link']}`)) {
            valid = false;
            errors.push(`Link must be an url`);
        } else if (!validator.isAlpha(`${houseObj[`location_country`]}`)) {
            valid = false;
            errors.push(`location_country must be an alphabetic value`);
        } else if (!validator.isAlpha(`${houseObj[`location_city`]}`)) {
            valid = false;
            errors.push(`location_city must be an alphabetic value`);
        } else if (!validator.isNumeric(`${houseObj['size_rooms']}`)) {
            valid = false;
            errors.push(`size_rooms must be a numeric value`);
        } else if (!validator.isNumeric(`${houseObj['price_value']}`)) {
            valid = false;
            errors.push(`price_value must be a numeric value`);
        } else if (!validator.isAlpha(`${houseObj['price_currency']}`)) {
            valid = false;
            errors.push(`price_currency must be an alphabetic value`);
        } else if (houseObj['price_currency'] !== 'EUR') {
            valid = false;
            errors.push(`price_currency must be in only EUR`);
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
