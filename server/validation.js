const validator = require('validator');

const requiredFields = [
    'link',
    'market_date',
    'location_country',
    'location_city',
    'location_address',
    'location_coordinates_lat',
    'location_coordinates_lng',
    'size_living_area',
    'size_rooms',
    'price_value',
    'price_currency',
    'description',
    'title',
    'images',
    'sold',
];

const validateHouse = houseObject => {
    let valid = true;
    const errors = [];

    if (typeof houseObject !== 'object' || Array.isArray(houseObject)) {
        valid = false;
        errors.push("a house should be an object 'not an array'");
    }

    requiredFields.forEach(field => {
        if (typeof houseObject[field] === 'undefined') {
            valid = false;
            errors.push(`${field}: is required`);
        }
    });

    if (valid === false) {
        return {
            valid,
            errors,
            raw: houseObject,
        };
    }

    if (houseObject.link) {
        if (!validator.isURL(houseObject.link)) {
            valid = false;
            errors.push('link must be a valid URL');
        }
    }
    if (!validator.isISO8601(houseObject.market_date)) {
        valid = false;
        errors.push('Date must be a valid ISO 8601 date');
    }
    if (
        houseObject.location_coordinates_lat &&
        houseObject.location_coordinates_lng
    ) {
        const latLongStr = `${houseObject.location_coordinates_lat}, ${
            houseObject.location_coordinates_lng
        }`;

        if (!validator.isLatLong(latLongStr)) {
            valid = false;
            errors.push('Location coordinates are not valid values');
        }
    }

    if (!validator.isInt(`${houseObject.size_living_area}`, { gt: 0 })) {
        valid = false;
        errors.push(
            'size_living_area must be a positive integer and greater than 0'
        );
    }
    if (!validator.isInt(`${houseObject.size_rooms}`, { gt: 0 })) {
        valid = false;
        errors.push('size_rooms must be a positive integer and greater than 0');
    }
    if (
        !validator.isNumeric(`${houseObject.price_value}`, {
            no_symbols: true,
        })
    ) {
        valid = false;
        errors.push('price_value must be a positive number');
    }
    if (houseObject.images) {
        houseObject.images.split(',').forEach(image => {
            if (!validator.isURL(image)) {
                valid = false;
                errors.push(`"${image}" is not a valid image URL`);
            }
        });
    }
    if (houseObject.sold) {
        if (!validator.isBoolean(`${houseObject.sold}`)) {
            valid = false;
            errors.push('sold must be true or false');
        }
    }

    return {
        valid,
        errors,
        raw: houseObject,
    };
};

const houseAsSqlParams = houseObject => {
    return requiredFields.map(field => houseObject[field]);
};
module.exports = {
    validateHouse,
    houseAsSqlParams,
};
