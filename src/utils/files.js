const fs = require('fs');

/**
 * Clear a path (delete all files and folders)
 * @param {String} path - path to clear 
 * @returns
 */
const clearPath = async (path) => {
    const exists = await existsPath(path);
    if (!exists) return;
    const files = await fs.readdirSync(path);
    if(!files.length) return;
    for (const file of files) 
        await fs.unlinkSync(`${path}/${file}`)
}

/**
 * Check if a path exists 
 * @param {String} path - path to check
 * @returns {Boolean} - True if path exists, false otherwise
 */
const existsPath = async (path) => await fs.existsSync(path);  

/**
 * Create a folder if it doesn't exist
 * @param {String} path - path to create
 * @returns {Boolean} - True if folder was created, false otherwise
 */
const createPath = async (path) => {
    const exists = await existsPath(path);
    if (!exists) await fs.mkdirSync(path);
}

module.exports = {
    clearPath,
    existsPath,
    createPath
}