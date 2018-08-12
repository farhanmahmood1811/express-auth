"use strict";

class IndexController {
    get = (req, res, next) => {
        res.status(200).send('Welcome to Express Server');
    }
}

export default new IndexController();
