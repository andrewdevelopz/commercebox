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
    new woocommerce({
        url: url,
        consumerKey: key,
        consumerSecret: secret,
        wpAPI: true,
        version: version
    });
}
