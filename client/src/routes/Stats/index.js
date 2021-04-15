import React, {useState, useEffect} from 'react';
import {incrementView, getStats} from "../../helpers/httpRequests";
import Popup from "../../components/Popup";

const Index = () => {
	const [responseData, setResponseData] = useState({});
	const [error, setError] = useState({message: "", isActive: false});
	const [_, path] = window.location.pathname.split("/stats/");

	useEffect(() => {
		const fetchData = async () => {
			return getStats(path)
				.catch(err => {
					setError({
						message: "Network error",
						isActive: true
					});
					console.log(err);
				});
		};

		fetchData()
			.then((result) => {
				if (typeof result === "undefined") {
					setError({
						message: "Network error occurred",
						isActive: true
					});
					return;
				}

				if (result.data.status === "error") {
					setError({
						message: "Short URL was not found!",
						isActive: true
					});
					return;
				}
				setResponseData({
					totalViews: result.data.count,
					longUrl: result.data.url
				});
			})
	}, []);


	const redirect = async () => {
		await incrementView(path);
		if (!responseData.longUrl.startsWith("http")) {
			window.location.replace("https://" + responseData.longUrl);
		} else {
			window.location.replace(responseData.longUrl);
		}
	};

	return (
		<main className="stats">
			<h1 className="title">See stats of your short url!</h1>
			<div className="info-container">
				{
					responseData.totalViews > 0 ?
						<h3>Your short url was clicked <span className="count">{responseData.totalViews}</span> times!</h3>
						: error.message ?
						<Popup
							error
							message={error.message}
						/>
						:
						<h3>Your custom short URL has no views!</h3>
				}
			</div>
			<div className="cta">
				<a
					onClick={redirect}
				>
					<button>Go to URL</button>
				</a>
			</div>
		</main>
	)
};

export default Index;