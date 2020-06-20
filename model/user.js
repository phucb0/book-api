let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({

    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, required: true
    },

})

// userSchema.methods.comparePassword = (passworddd) => {
//     return bcrypt.compareSync(passworddd, this.password)
// }

module.exports = mongoose.model("userlists", userSchema, "userlists")