const segitigaKiri = (a, b, x) => {
    return (x - a) / (b - a);
}

const segitigaKanan = (b, c, x) => {
    return -1 * ((x - c) / (c - b));
}

const trapesiumKiri = (a, b, x) => {
    return (x - a) / (b - a);
}

const trapesiumKanan = (d, c, x) => {
    return (d - x) / (d - c);
}

module.exports = {
    segitigaKanan,
    segitigaKiri,
    trapesiumKanan,
    trapesiumKiri
};