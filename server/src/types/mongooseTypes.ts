/**
 * @overview This file is custom types that needs to be added to the application for all mongoose types
 */

import mongoose from 'mongoose';

// Interface for User document.
export interface IOrder extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    marketplaceID: string;
    marketplace: string;
    address: {
        billing: Object,
        shipping: Object
    }
    orderItems: Array<Object>;
    currency: string;
    total: number;
    totalTax: number;
    shippingTotal: number;
    refunds: any; // not sure what refunds is yet
    paymentMethod: string;
    paidDate: Date;
    createdDate: Date;
    modifiedDate: Date;
    completedDate: Date;
    status: string;
    userID: string;

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

// Interface for User document.
export interface IUser extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    addresses: Array<UserAddress>;
}

// The query response when deleting or updating document(s)
export type QueryStatus = {
    n?: number; // number of docs deleted
    ok?: number; // status of 0 or 1
}
