'use strict';

import { Router } from 'express';

import errorHandler from '../middleware/errorHandler';
import serviceRegistry from '../core/serviceRegistry';

const routes = new Router();

routes.put('/:intent/:port', (req, res) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;
    const serviceIp = req.connection.remoteAddress.includes('::')
        ? `[${req.connection.remoteAddress}]`: req.connection.remoteAddress;
    serviceRegistry.add(serviceIntent, serviceIp, servicePort)
    res.status(200).send(`${serviceIntent} at ${serviceIp}:${servicePort}`)
});

routes.use(errorHandler);

export default routes;
