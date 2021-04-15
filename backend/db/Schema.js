const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: String,
		short_url: {type: String, unique: true},
    views: Number,
});

const model = mongoose.model('URL', urlSchema);

const saveURL = options => new model(options).save(err => {
    if (err) {
				console.log("Error occured while saving!", err);
    }
    console.log("Successfully saved!");
});

module.exports = {model, saveURL};
