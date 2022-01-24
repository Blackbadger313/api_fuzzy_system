const {
    proseFuzzy,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/fuzzy',
        handler: proseFuzzy,
    }
];

module.exports = routes;