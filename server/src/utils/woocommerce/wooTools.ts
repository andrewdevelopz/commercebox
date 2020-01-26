import {
    WoocommerceTokens
} from 'definitions';

const woocommerce = require('woocommerce-api');

/**
 * Function to make an oAuth call before any requests to woocommerce api
 * 
 * @param url - the root url of the api 
 * @param version - the version of the woocommerce api
 * @param key - the consumer key from the woocommerce store
 * @param secret - the consumer secret from the woocommerce store
 */
export const wooAuth = (url: string, version: string = 'wc/v3', key: string, secret: string) => {
    return new woocommerce({
        url: url,
        consumerKey: key,
        consumerSecret: secret,
        wpAPI: true,
        version: version
    });
}

/**
 * Assembles the url for getting a new api users consumer key and consumer secret.
 * 
 * @param url - the root url of the woocommerce store
 * @param endpoint - the url path to the version of the woocommerce api
 */
export const getAuthKeyURL = (url: string, endpoint: string) => { }

/**
 * Get all the orders associated with the woocommerce store
 * 
 * @param tokens - The woocommerce tokens object { consumer, secret }
 */
export const getAllOrders = (tokens: WoocommerceTokens) => { }

/**
 * Get all products that are associated with the woocommerce store
 * 
 * @param tokens - The users account woocommerce tokens
 */
export const getAllProducts = async (tokens: WoocommerceTokens) => {
    // make api call to the woocommerce api and return the product body
    const woo = await wooAuth(
        'https://monsteraccessory.com/api',
        'wc/v3',
        tokens.consumer as string,
        tokens.secret as string
    );
    const products = await woo.getAsync('products/?per_page=75');
    return products.body;
}
