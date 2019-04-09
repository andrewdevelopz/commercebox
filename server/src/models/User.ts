// Dependencies
import mongoose, { Schema } from 'mongoose';

// Import types
import { IUser } from 'mongooseTypes';

const AddressSchema: mongoose.Schema = new Schema({
    company: String,
    firstName: String,
    lastName: String,
    address1: {
        type: String,
        required: true
    },
    address2: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: String,
    primary: Boolean
});

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
    },
    addresses: [AddressSchema],
    tokens: {
        ebay: {
            authToken: String,
            refToken: String
        },
        pitneyBowesAuthToken: String,
        woocommerce: {
            key: String,
            secret: String
        }
    }
});

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('Users', UserSchema);

export default UserModel;
