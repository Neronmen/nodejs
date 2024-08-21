const mongoose = require('mongoose');

module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connect database successfully");
    } catch (error) {
        console.log("Connect database error");
    }
}