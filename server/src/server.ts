import { App } from './app';

const env: string = process.env.NODE_ENV || 'development';
const port: string | number = process.env.PORT || 2995;

export const server: App = new App(env, port);