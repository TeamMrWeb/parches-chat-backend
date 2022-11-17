const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    comparePassword: async (password, hash) => await bcrypt.compare(password, hash)
}