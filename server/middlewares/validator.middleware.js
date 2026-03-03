const validator = (schema) => (req, res, next) => {
    const validateData = schema.safeParse(req.body);
    if(!validateData.success) {
        return res.status(400).json({
            errors: validateData.error.flatten()
        });
    }
    req.body = validateData.data;
    next();
}

export default validator;