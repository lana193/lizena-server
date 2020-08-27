import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const getUserService = (query) => {
    try {
        return User.findOne(query);
    } catch(e) {
        throw new Error();
    }
};

export const getAllUsersService = () => {
   try { return User.find(); } 
   catch(e) {
       throw new Error();
   }
};

export const createUserService = async (user) => {
    const newUser = new User(user);
    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    return (await newUser.save());
};

export const updateUserService = (id, updatedUser, file) => {
    if(file) {
        updatedUser.profile_image = file.path;
    }
    return User.findByIdAndUpdate(id, {$set: updatedUser}, {new: true});
};

export const deleteUserService = (id) => {
    return User.findById(id).remove();
};