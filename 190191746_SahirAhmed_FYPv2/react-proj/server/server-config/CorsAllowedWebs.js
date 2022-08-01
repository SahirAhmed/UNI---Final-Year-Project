
const cors = require('cors');

const whitelist = [

    'http://localhost:3000',
    

];

const corsOptions = {

    origin: (origin, callback) => {

         if (whitelist.indexOf(origin) !== -1 || !origin)
        //  if (whitelist.indexOf(origin) !== -1)
            callback(null, true);
        else
            callback('UnAuthorized!');

    }, credentials: true

}

module.exports = cors(corsOptions);
