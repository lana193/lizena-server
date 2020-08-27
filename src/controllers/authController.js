import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import keys from "./../../config/keys";
import { validateLoginInput, validateRegisterInput } from './../utils/auth_validation';
import { getUserService, createUserService } from "./../services/userService";

export const registerController = async (req, res) => {
    // response from validation
    validateRegisterInput(req.body, res); 
    const user = await getUserService({email: req.body.email});
    if(user) {
    return res.status(400).json('Email already exists');
    }
    else {
        console.log(req.file);
        return res.send(await createUserService(req.body, req.file));
    }
};

export const loginController = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const password = req.body.password;
    // Find user by email
    const user = await getUserService({ email: req.body.email });
    
    // Check if user exists
    if (!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('isMatch', isMatch);
    if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {id: user.id, nickname: user.nickname, email: user.email, role: user.role};
        
        // Sign token user
        jwt.sign(payload,
            keys.secretOrKey,
            { 
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                    success: true,
                    token: token,
                    role: user.role
                });
            });  

    } else {
        return res.status(400).json({ passwordincorrect: 'Password incorrect' });
    }
};
