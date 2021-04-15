import React, {useState} from 'react';
import {incrementView, getStats} from "../../helpers/httpRequests";
import Popup from "../../components/Popup";

const Index = () => {
	const [requestURL, setRequestURL] = useState("");
	const [result, setResult] = useState({});
	const [error, setError] = useState({message: "", isActive: false});


	const handleRequest = async () => {
		if (error.length) setError({message: "", isActive: false});

		await getStats(requestURL)
			.then(({data}) => {
				if (!data.hasOwnProperty('count') && !data.hasOwnProperty('url')) {
					setError({isActive: true, message: "Custom URL Not found!"});
					setResult({count: "", url: ""});
					setTimeout(() => {
						setError({message: "", isActive: false});
					}, 5 * 1000);
					return;
				}
				setResult({count: data.count, url: data.url});
			})
			.catch(err => {
				console.error(err);
				setError({isActive: true, message: "Network error occurred while handling your request"});
				setTimeout(() => {
					setError({message: "", isActive: false});
				}, 5 * 1000);
			});
	};

	const redirect = async () => {
		await incrementView(requestURL);
		if (!result.url.startsWith("http")) {
			window.location.replace("https://" + result.url);
		} else {
			window.location.replace(result.url);
		}
	};

	return (
		<main className="statFinder">
			<h1>Enter your short-URL below to see it's stats</h1>
			<div className="cta">
				<input
					type="text"
					value={requestURL}
					placeholder="Your shortened URL"
					onChange={e => setRequestURL(e.target.value)}
				/>
				<button onClick={handleRequest}>Send!</button>
			</div>

			<div className="info">
				<h2>Total view count: {result.count}</h2>
				<h2>Long URL:
					<span className="link" onClick={redirect}>{result.url}</span>
				</h2>
				<h2>Short URL: {requestURL || ""}</h2>
			</div>
			{error.message.length ?
				<Popup
					className="error_message"
					error
					message={error.message}
				/>
				: <></>
			}

		</main>
	)
};

export default Index;
