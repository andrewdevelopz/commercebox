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
