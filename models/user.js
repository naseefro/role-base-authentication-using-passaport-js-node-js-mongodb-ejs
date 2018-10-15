const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    name: { type: String, },
    role: { type: String, default: "jobseeker" },
    location: { type: String },
}, { timestamps: true });


userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isMember = function() {
    return (this.role === "jobseeker");
};
userSchema.methods.isAuthor = function() {
    return (this.role === "company");
};

module.exports = mongoose.model('User', userSchema);