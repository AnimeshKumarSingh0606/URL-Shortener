const { model, saveURL } = require('./db/Schema');
const siteURL = "";

const shorten = async (req, res) => {
	try {
		const { body: {url, short} } = req;
		const newEntry = {url, short_url: short, views: 0};
		await saveURL(newEntry)
			.catch(err => {
				res.send(err);
				return;
			});
		res.send(newEntry);
	} catch(e) {
		console.error(e);
	}
};

const getStats = async (req, res) => {
	const { url } = req;
	const [_, short_url] = url.split('/stats/');
	const stat = await model.findOne({ short_url }).exec();

	if (stat === null) {
		res.send({"status": "error", "description": "Not found!"});
		return;
	}
	res.send({count: stat.views, url: stat.url})
};

const findUrlInDb = async (req, res) => {
		const [_, short_url] = req.url.split('/');
		const query = { short_url };
		const result = await model.findOne(query).exec();

		if (result === null) {
			res.send({"status": "err", "description": "Not found!"});
			return
		}

		await model.findOneAndUpdate(query, { $set: { views: result.views + 1 } })
			.exec()
			.catch(err => console.log(err));

		res.redirect(result.url);
};

const incrementEntry = async (req, res) => {
	try {
		const { body: { short_url } } = req;


		const entry = await model.findOne({short_url}).exec();
		await model.findOneAndUpdate({short_url}, { $set: { views: entry.views + 1 } })
			.exec()
			.catch(err => console.log(err));

		res.send({
			short_url,
			views: entry.views + 1
		});
	} catch(err) {
		console.log("An error has occured while incrementing entry", err);
		res.send({
			error: true,
			message: "Error occured while incrementing view count"
		});
	}
};

module.exports = { findUrlInDb, shorten, getStats, incrementEntry };
