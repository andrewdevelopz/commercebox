/**
 * @overview This file is custom types that needs to be added to the application for all express types
 */

import { Router, Request, Response } from 'express';

/*** Router ***/

// This interface extends Router specifically for commercebox
export interface IRouterExtended extends Router {
    // Allow router to have an index call
    [index: string]: any;
}

/*** Request && Response ***/

// Extends Request object
export interface IRequestExtended extends Request {}

// Extends Response object
export interface IResponseExtended extends Response {}
