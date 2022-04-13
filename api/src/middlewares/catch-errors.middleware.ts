import { Router } from "express";

function treatValidationError(error) {
    const errors: any[] = [];

    Object.keys(error.errors).forEach(key => {
        errors.push(error.errors[key].properties);
    })

    return errors;
}

function treatDuplicateKeyError(error) {
    const path = Object.keys(error.keyValue)[0];
    const value = error.keyValue[path];
    const message = error.message;

    return [{ path, value, message }]
}

export default (router: Router) => {
    router.use((error, req, res, next) => {
        if (error.name === "ValidationError")
            return res.status(400).send(treatValidationError(error));

        if (error.name === "CastError")
            return res.status(404).send('Resource not found.');

        // Duplicate key error
        if (error.code = 11000)
            return res.status(409).send(treatDuplicateKeyError(error));

        console.error(error.stack);
        res.status(500).send(error.message);
    });
}