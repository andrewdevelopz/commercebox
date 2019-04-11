import App from './app';

// Set ENV - production || development
process.env.NODE_ENV = 'development';

export const main = new App();
