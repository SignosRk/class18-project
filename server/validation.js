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
