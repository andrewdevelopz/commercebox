/**
 * @overview This file is custom types that needs to be added to the application for all mongoose types
 */

import mongoose from 'mongoose';

// Interface for User document.
export interface IUser extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

// Interface for Product document.
export interface IProduct extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    image: string;
    sku: string;
    title: string;
    quantity: {
        quantity: number,
        available: number,
        alert: number,
        pendingOrders: number,
        needed: number
    }
    description: string;
    price: {
        sell: number,
        purchase: number,
        stockValue: number
    }
    category: string;
    variationGroup: string;
    upc: string;
    condition: string;
    location: {
        fullAddress: string,
        company: string,
        name: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        email: string,
        phone: string
    }
    detail: {
        weight: number,
        height: number,
        width: number,
        depth: number
    }
    bin: string;
    monitor: boolean;
    orders: [];
    linked: {
        ebay: [],
        amazon: [],
        woocommerce: [],
        shopify: []
    }
    created: Date;
    modified: Date;
    userID: string;
}
