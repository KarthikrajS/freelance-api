import express  from 'express';
import User from '../models/User.js';

import parseErrors from '../utils/parseErrors.js';
import {sendConfirmationEmail} from '../mailler.js';

const router = express.Router();

router.post('/',(req,res)=>{
    const {email,password,userType} = req.body.user;
    const user = new User({email,userType});
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
        .then(userRecord=>
        {
            sendConfirmationEmail(userRecord);
            res.json({user: userRecord.toAuthJSON()})
        })
        .catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
});

export default router;
