/**
 * This file is to define all types, interfaces and any other declarations needed for the application.
 */

import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

/*** Router ***/

// This interface extends Router specifically for commercebox
export interface IRouterExtended extends Router {
    // Allow router to have an index call
    [index: string]: any;
}

/*** Request && Response ***/

// Extends Request object
export interface IRequestExtended extends Request {
    user: TUser
}

// Extends Response object
export interface IResponseExtended extends Response {}

// req.user interface
export type TUser = {
    _id?: any;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    addresses?: Array<UserAddress>;
    tokens?: UserTokens;
}

// Address format for the user
export type UserAddress = {
    _id?: string;
    company: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    primary: boolean;
    changed?: boolean;
}

// Token storage format for user
export type UserTokens = {
    ebay?: {
        auth: string,
        ref: string
    }
    pitneyBowesAuthToken?: string;
    woocommerce?: {
        consumer: string,
        secret: string
    }
}

export type TProduct = {
    _id?: string;
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
    userID?: string; // not included when creating product
    changed?: boolean;
}

// For JWT Strategy options
export type JwtStrategyOptions = {
    jwtFromRequest: any;
    secretOrKey: string;
}

// What the Database class should return
export type DatabaseConfig = {
    database: string;
    secret: string;
}

// The object structure of woocommerce tokens
export type WoocommerceTokens = {
    consumer?: string;
    secret?: string;
}

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
    n?: number;
    nModified?: number // number of docs modified
    ok?: number; // status of 0 or 1
}
