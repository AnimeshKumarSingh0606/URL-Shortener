const mongoose = require('mongoose');

module.exports = () => {
    const db = mongoose.connection;
	try {
	db.once('open', () => console.log('database successfully connected'));
	db.on('error', err => console.log('there was an error while connecting to the database', err));
		return mongoose.connect(process.env.DB_USER);
	} catch(e) {
		console.log('error', e);
	}
};
