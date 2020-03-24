let isRealString = str => {
    return typeof (str) === 'string' && str.length > 0;
};

module.exports = {isRealString};