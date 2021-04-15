import React, {useState} from 'react';
import Popup from "../../components/Popup";
import {shorten} from "../../helpers/httpRequests";

const Index = () => {
	const [useCustomURL, setUseCustomURL] = useState(false);
	const [urls, setUrls] = useState({short: "", long: ""});
	const [error, setError] = useState({isActive: false, message: ""});
	const [successState, setSuccessState] = useState(false);

	async function handleClick() {
		if (!urls.long.length || (useCustomURL && !urls.short.length)) {
			console.log("Input boxes were not filled correctly");
			setError({isActive: true, message: "Input boxes were not filled correctly"});

			setTimeout(() => {
				setError({isActive: false, message: ""});
			}, 3.5 * 1000);

			return;
		}

		if (urls.long && !useCustomURL) urls.short = generateRandomID();

		await shorten(urls.short, urls.long)
			.then(val => {
				if (val.data.code === 11000) { //mongoose error code for unique key duplication
					setError({isActive: true, message: `${urls.short} is already registered!`});
					setTimeout(() => setError({isActive: false, message: ""}), 2500);
					return;
				}

				if (val.data.hasOwnProperty('views')) {
					setSuccessState(true);
					setTimeout(() => {
						window.location.replace(`/stats/${urls.short}`);
					}, 3 * 1000);
				}
			})
	}

	const generateRandomID = () => {
		const randomChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let id = "";
		for (let i = 0; i < 5; i++) {
			id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
		}
		return id;
	};

	return (
		<section className="shorten">
			<h2>Enter your long-cumbersome-hefty-ugly URL below</h2>
			<label htmlFor="longUrl">
				<input
					className="longUrlInput"
					placeholder="Long URL goes here"
					type="text"
					required
					value={urls.long}
					onChange={e => setUrls({...urls, long: e.target.value})}
				/>
			</label>
			<label className={useCustomURL === true ? 'visible' : 'invisible'} htmlFor="customShort">
				<input
					className="shortUrlInput"
					name="customShortUrl"
					placeholder="Short form here"
					type="text"
					value={urls.short}
					onChange={e => setUrls({...urls, short: e.target.value})}
				/>
			</label>
			{error.isActive ?
				<Popup
					error
					message={error.message}
				/>
				: successState ?
					<Popup
						success
						message={`${urls.short} was successfully saved!`}
					/>
					: <></>
			}
			<div className="cta">
				<label htmlFor="wantsShortURL">
					<input
						id="wantsShortURL"
						name="wantsShortURL"
						type="checkbox"
						onClick={() => setUseCustomURL(!useCustomURL)}
					/>
					{useCustomURL ?
						"I'm going to be superbly satisfied with this personal short URL"
						:
						"I am an extremely cool individual who wants their custom short URL"
					}
				</label>
				<button onClick={handleClick}>
					{useCustomURL ? "Shorten!" : "Get Random Short URL!"}
				</button>
			</div>
		</section>
	);
};

export default Index;