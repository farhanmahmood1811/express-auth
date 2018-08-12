"use strict";

import User from '../models/user';
import TokenIntent from '../intents/token';

class AuthController {
	register = async (req, res, next) => {
        try {
        	let user = new User(req.body);
        	user.isNew = true;
        	let newUser = await user.save();
        	return res.status(201).send("User Created successfully")
        } catch(err) {
          	next(err);
        }
    }
    login = async (req, res, next) => {
    	try {
    		let user = await User.findOne({username: req.body.username});
    		if(!user) {
    			return res.status(401).send('Authentication failed. Invalid Username.');
    		}
    		if (!user.comparePassword(req.body.password)) {
        		return res.status(401).send('Authentication failed. Wrong password.');
      		} else {
				const data = { username: user.username, _id: user._id}
				const token = await TokenIntent.generate(data);
				return res.status(200).json({name: user.name, token: token});
      		}
    	} catch(err) {
    		next(err);
    	}
    }
}

export default new AuthController()