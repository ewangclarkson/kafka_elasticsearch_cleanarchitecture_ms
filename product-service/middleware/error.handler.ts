import {Request, Response, NextFunction} from "express";
import HttpStatus from "http-status";

export  function errorHandler(error: Error,request: Request, response: Response, next: NextFunction) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
};
