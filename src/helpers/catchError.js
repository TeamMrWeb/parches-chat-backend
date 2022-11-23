module.exports = (err, source) => {
    if (err.secure)
        throw new Error(`An error occurred while ${source}`);
    throw new Error(err.message);
}