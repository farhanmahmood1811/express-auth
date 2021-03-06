'use strict';

/**
 * Singelton Registry class
 */
class ServiceRegistry {
    constructor() {
        if(!ServiceRegistry.instance) {
            this._services = [];
            this._timeout = 30;
            ServiceRegistry.instance = this;
        }
        return ServiceRegistry.instance;
    }

    add = (intent, ip, port) => {
        const key = intent+ip+port;
        if(!this._services[key]) {
            this._services[key] = {};
            this._services[key].timestamp = Math.floor(new Date()/1000);
            this._services[key].ip = ip;
            this._services[key].port = port;
            this._services[key].intent = intent;
            console.log(`Added service for intent ${intent} on ${ip}:${port}`)
            return
        }
        this._cleanup();
        this._services[key].timestamp = Math.floor(new Date()/1000);
        console.log(`Updated service for intent ${intent} on ${ip}:${port}`)
    }

    remove = (intent, ip, port) => {
        const key = intent+ip+port;
        delete this._services[key];
    }

    get(intent) {
        for(let key in this._services) {
            if(this._services[key].intent == intent) return this._services[key];
        }
        return null;
    }

    _cleanup() {
        const now =  Math.floor(new Date()/1000);
        for(let key in this._services) {
            if(this._services[key].timestamp + this._timeout < now) {
                console.log(`Removed Service for intent ${this._services[key].intent}`)
                delete this._services[key];
            }
        }
    }
}

const serviceRegistry = new ServiceRegistry();
Object.freeze(serviceRegistry);

export default serviceRegistry;