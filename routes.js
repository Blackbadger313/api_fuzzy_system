const {
    proseFuzzy,
    masuk,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/fuzzy',
        handler: proseFuzzy,
    },
    {
        method: 'GET',
        path: '/masuk',
        handler: masuk,
    }
];

module.exports = routes;