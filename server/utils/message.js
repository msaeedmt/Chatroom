const moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment(new Date().getTime()).format('h:mm a')
    }
};

module.exports = {generateMessage};