const getRandomInt = (max) => {
    const min = Math.ceil(1);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandomInt;
