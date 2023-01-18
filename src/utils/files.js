const fs = require('fs')

module.exports = {
    existsPath: async (path) => await fs.existsSync(path),
    clearPath: async (path) => {
        const exists = await module.exports.existsPath(path)
        if (!exists) return
        const files = await fs.readdirSync(path)
        if (!files.length) return
        for (const file of files) await fs.unlinkSync(`${path}/${file}`)
    },
    createPath: async (path) => {
        const exists = await module.exports.existsPath(path)
        if (!exists) await fs.mkdirSync(path)
    },
}
