var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.once('open', () => {
    console.log(`Mongoose connected to ${process.env.DATABASE_URL}`)
});

mongoose.connection.once('error', (err) => {
    console.log(`database error:/n${err}`)
});

module.export = mongoose;