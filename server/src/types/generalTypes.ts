/**
 * @overview This file is used to declare types for custom areas not relating to express, mongo or any other packages that are installed. Everything
 * is put in one file but this file will eventually need to be split into multiple files for organization purpose.
 * 
 * @todo: split everything into it's respected file
 */

type User = {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
}

type Product = {
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
type JwtStrategyOptions = {
    jwtFromRequest: any; 
    secretOrKey: string;
}

// What the Database class should return
type DatabaseConfig = {
    database: string;
    secret: string;
}