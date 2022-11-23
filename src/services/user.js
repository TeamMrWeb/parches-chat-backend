const { User } = require('../database').models;

module.exports = {
    createUser: async (args, save=false) => {
        const user = new User(args);
        if (save) await user.save();
        return user;
    },
    find: async (filter, safe=true) => User.find(filter).select(safe ? '' : '+password'),
    findOne: async (filter, safe=true) => User.findOne(filter).select(safe ? '' : '+password'),
    findById: async (id, safe=true) => User.findById(id).select(safe ? '' : '+password'),
    updateOne: async (filter, update) => await User.updateOne(filter, update),
}