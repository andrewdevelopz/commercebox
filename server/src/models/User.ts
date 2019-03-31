// Dependencies
import mongoose, { Schema } from 'mongoose';

// Import types
import { IUser } from 'mongooseTypes';

const UserSchema: mongoose.Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('Users', UserSchema);

export default UserModel;
