"use strict";

let Config = {};

Config.dbHost = process.env.dbHost || 'localhost';
Config.dbPort = process.env.dbPort || '27017';
Config.dbName = process.env.dbName || 'es6auth';
Config.port = process.env.port || 3000;

export default Config;