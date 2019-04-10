/**
 * @overview: This class is the route for the auth section of the api and takes care of all the business logic.
 * 
 * @todo: Still need to finish removing addresses
 */

// Dependencies
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Route from '../Route';
import Database from '../../config/database/Database';
import User from '../../models/User';

// Import types
import { IUser, QueryStatus } from 'mongooseTypes';
import { UserInfo } from 'os';

const router = express.Router();

export default class Auth extends Route {
    constructor(path: string, app: express.Application) {
        // Super takes:
        // - path which is received from when instantiating the class
        // - app which is received from when instantiating the class
        // - router which is received from the dependencies from above
        super(path, app, router);
        // Run all the methods to each path of the route
        this.run();
    }

    /**
     * @param boolean - true = authenticated route, false = open route
     * @note - This is also a summary of each route availale
     */
    run(): void {
        this.root(true);
        this.register(false);
        this.login(false);
        this.logout(true);
        this.retreiveUserData(true);
        this.updateUserData(true);
        this.updateUserPassword(true);
        this.getUserAddress(true);
        this.addUpdateUserAddress(true);
    }

    /**
     * All methods take:
     * @param passport - which is a boolean value to include passport auth or not
     */

    // Root for auth route, Use this format for all routes
    root(passport: boolean): void {
        this.createRoute('get', '/', (req: express.Request, res: express.Response) => {
            res.send('Hello from <b>ROOT</b> path of auth');
        }, passport);
    }

    // Register a user to the database
    register(passport: boolean): void {
        this.createRoute('post', '/register', async (req: express.Request, res: express.Response) => {
            try {
                // Generate salt and hashed password
                const saltRounds: string = await bcrypt.genSalt(10);
                const hash: string = await bcrypt.hash(req.body.password, saltRounds);
                const user: User = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }

                const newUser: IUser = await new User(user).save();
                res.status(201).json({
                    newUser
                });
            } catch (e) {
                res.sendStatus(500);
                console.log(e);
            }
        }, passport);
    }

    // Authenticate a user
    login(passport: boolean): void {
        this.createRoute('post', '/login', async (req: express.Request, res: express.Response) => {
            try {
                const username: string = req.body.username;
                const password: string = req.body.password;

                // Find the user by username from the database
                const user = await User.findOne({ username });

                if (!user) {
                    // Send wrong username error
                    res.status(401).json({ error: 'The username you have entered does not exist' });
                    return;
                }

                // Compare found user password with inputed password from client
                const isMatch: boolean = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    const db: Database = new Database();
                    // Create a token that expires in 1 week
                    const token: string = await jwt.sign({ data: user }, db.getConnectionString().secret as string, {
                        expiresIn: 604800 // 1 week
                    });

                    // Send the token when user data to the client
                    res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    // Send wrong password error
                    res.status(401).json({ error: 'The password you have entered does not match' });
                    return;
                }
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    error: e.message
                });
            }
        }, passport);
    }

    logout(passport: boolean): void {
        this.createRoute('post', '/logout', async (req: express.Request, res: express.Response) => {
            /** @todo */
            // Create a blacklist of tokens so when a user logs out, that users token can't be used
            // Make sure to auto delete this blacklist in the db after 1 day of expiration of said token
            // reference https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens

            console.log(req.user);
        }, passport);
    }

    // Retreive the users data
    retreiveUserData(passport: boolean): void {
        this.createRoute('get', '/retreiveUserData', async (req: express.Request, res: express.Response) => {
            const userID: string = req.user._id;
            const user = await User.findById(userID);

            if (user) {
                const sendUser: User = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email
                }
                res.status(200).json(sendUser);
            } else {
                console.log('Something wen\'t wrong while looking for the user in the database');
                res.sendStatus(500);
            }
        }, passport);
    }

    // Update the user data
    updateUserData(passport: boolean): void {
        this.createRoute('put', '/updateUserData', async (req: express.Request, res: express.Response) => {
            try {
                const userID: string = req.user._id;
                const user: User = req.body.user;

                // construct user update object
                const update: User = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email
                }
                // query to the database with userID
                await User.findOneAndUpdate(userID, update).exec();

                res.status(200).json({ message: 'The user has been updated' });
            } catch (e) {
                // send error results
                res.sendStatus(500);
            }
        }, passport);
    }

    // Update the user password
    updateUserPassword(passport: boolean): void {
        this.createRoute('put', '/updateUserPassword', async (req: express.Request, res: express.Response) => {
            try {
                const userID: string = req.user._id;
                const password: { currentPassword: string, newPassword: string } = req.body.password;

                // find the user by userID from the database
                const user: any = await User.findOne({ _id: userID });

                // compare found user password with inputed current password from client
                const isMatch: boolean = await bcrypt.compare(password.currentPassword, user.password);

                if (isMatch) {
                    // generate salt and hashed password
                    const saltRounds: string = await bcrypt.genSalt(10);
                    const hash: string = await bcrypt.hash(password.newPassword, saltRounds);

                    // construct user password update object
                    const update = {
                        password: hash
                    }
                    // query to the database to update the user password
                    await User.findOneAndUpdate(userID, update).exec();

                    res.status(200).json({ success: true, message: 'The users password has been updated' });
                } else {
                    res.status(200).json({ success: false, message: 'The current password you entered does not match' });
                }
            } catch (e) {
                res.sendStatus(500);
            }
        }, passport);
    }

    // Get the user addresses
    getUserAddress(passport: boolean): void {
        this.createRoute('get', '/getUserAddress', async (req: express.Request, res: express.Response) => {
            const userID: string = req.user._id;
            const addresses = await User.findById(userID).select('addresses');

            res.status(200).json({ data: addresses });
        }, passport);
    }

    // Add and updated addresses for the user
    addUpdateUserAddress(passport: boolean): void {
        this.createRoute('post', '/addUpdateUserAddress', async (req: express.Request, res: express.Response) => {
            const userID: string = req.user._id;
            const addresses: UserAddress[] = req.body.addresses;
            const addAddress: UserAddress[] = [];
            const updateAddress: UserAddress[] = [];

            // loop through and delete `changed` property and push to respective arrays
            // @note currently we do not send a changed property from the front-end for addresses
            for (const address of addresses) {
                // seperate address by update or add
                address.hasOwnProperty('_id') ? updateAddress.push(address) : addAddress.push(address);
                // delete address.changed;
            }

            // Query the database to update and add addresses
            const updateQuery: QueryStatus = await User.updateMany({ _id: userID }, { $set: { addresses: updateAddress } });
            const addQuery: QueryStatus = await User.updateMany({ _id: userID }, { $push: { addresses: { $each: addAddress } } });

            res.status(201).json({
                message: {
                    updated: `${updateAddress.length} Addresses has been updated`,
                    added: `${addAddress.length} Addresses has been added`
                }
            });
        }, passport);
    }

    // Delete addresses for the user
    deleteUserAddress(passport: boolean): void {
        this.createRoute('delete', '/deleteUserAddress', async (req: express.Request, res: express.Response) => {

        }, passport);
    }
}
