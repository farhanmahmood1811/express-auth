'use strict';

import axios from 'axios';
import serviceRegistry from '../core/serviceRegistry';

class TokenIntent {
    verify = async (token="") => {
        if(!serviceRegistry.get("token")) {
            throw new Error("Token Intent service not registered")
        }
        try {
            const response = await axios.get(`http://localhost:3010/verify/${token}`);
            const data = await response.data;
            return data;
        } catch(error) {
            throw new Error(error)
        }
    }
    generate = async (body={}) => {
        if(!serviceRegistry.get("token")) {
            throw new Error("Token Intent service not registered")
        }
        try {
            const response = await axios.post('http://localhost:3010/generate', body)
            const token = await response.data;
            return token;
        } catch(error) {
            throw new Error(error)
        }
    }
}

export default new TokenIntent();