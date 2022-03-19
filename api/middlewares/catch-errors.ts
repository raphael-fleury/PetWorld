function treatValidationError(error) {
    const errors: any[] = [];

    Object.keys(error.errors).forEach(key => {
        errors.push(error.errors[key].properties);
    })

    return errors;
}

export default (router) => {
    router.use((error, req, res, next) => {
        if (error.name === "ValidationError")
            return res.status(400).send(treatValidationError(error));

        if (error.name === "CastError")
            return res.status(404).send('Resource not found.');

        // console.error(error.stack);
        res.status(500).send(error.message);
    });
}